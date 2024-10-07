import os
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from models.user_model import UserTable
from models.domain_model import DomainTable
import schedule
import time
import threading
from routes.user_route import users_bp
from routes.domain_route import domains_bp
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import generate_password_hash, check_password_hash
from routes.validation import sanitize_input, is_valid_email

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'fallback_secret_key')  # Use environment variable
# app.config['SESSION_COOKIE_SECURE'] = True // https
# app.config['SESSION_COOKIE_HTTPONLY'] = True // http // https ssh
# app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["10 per minute"],
    storage_uri="memory://"
)
allowed_origins = ["http://localhost:3000", "http://192.168.178.17:3000", "http://192.168.2.8:3000", "http://192.168.56.1:3000", "http://145.137.104.145:3000"]
socketio = SocketIO(app, cors_allowed_origins=allowed_origins)
CORS(app, origins=allowed_origins, supports_credentials=True)

# talisman = Talisman(
#     app,
#     content_security_policy={
#         'default-src': "'self'",
#         'script-src': "'self' 'unsafe-inline'",
#         'style-src': "'self' 'unsafe-inline'",
#         'img-src': "'self' data:",
#         'connect-src': "'self' ws: wss:",
#     },
#     force_https=True,
#     session_cookie_secure=True,
#     strict_transport_security=True,
#     referrer_policy='strict-origin-when-cross-origin'
# )

app.register_blueprint(users_bp)
app.register_blueprint(domains_bp)

@app.route('/')
def main():
    return 'Welcome to your Flask-SocketIO application!'

@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

@socketio.on('join_user_room')
def handle_join_user_room(data):
    room = str(sanitize_input(data.get("room", "")))
    if room:
        join_room(room)
        print(f'User {room} joined their room')

@socketio.on('leave_room')
def handle_leave_room(data):
    room = str(sanitize_input(data.get('room', "")))
    if room:
        leave_room(room)
        print(f'User left room: {room}')

@app.route('/notify', methods=['POST'])
@limiter.limit("10/minute")
def notify():
    message = sanitize_input(request.json.get('message', 'Hello, World!'))
    user_id = session.get('user_id')
    if user_id:
        socketio.emit('notification', {'message': message}, room=str(user_id))
        return jsonify({'status': 'notification sent'})
    else:
        return jsonify({'status': 'user not authenticated'}), 401

@app.route('/send_message', methods=['POST'])
@limiter.limit("20/minute")
def send_message():
    data = request.json
    user_id = sanitize_input(data.get('user_id', ''))
    message = sanitize_input(data.get('message', ''))

    if user_id:
        socketio.emit('new_message', {'message': message}, room=str(user_id))
        return jsonify({'status': 'message sent'})
    else:
        return jsonify({'status': 'user_id not provided'}), 400

@app.route('/users/login', methods=['POST'])
@limiter.limit("5/minute")
def login():
    data = request.json
    username = data.get('user_name', '')
    password = data.get('password', '')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    userTable = UserTable()
    user = userTable.get_teacher_by_username(username)

    if user and check_password_hash(user['password'], password):
        session['user_id'] = user['user_id']
        socketio.emit('join_user_room', room=str(user['user_id']))
        return jsonify({'message': 'User logged in successfully!', 'user': user}), 200
    
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/users/signup', methods=['POST'])
@limiter.limit("3/hour")
def signup():
    data = request.json
    username = sanitize_input(data.get('user_name', ''))
    password = data.get('password', '')
    email = sanitize_input(data.get('email', ''))
    first_name = sanitize_input(data.get('first_name', ''))
    last_name = sanitize_input(data.get('last_name', ''))

    if not all([username, password, email, first_name, last_name]):
        return jsonify({'message': 'All fields are required'}), 400

    if not is_valid_email(email):
        return jsonify({'message': 'Invalid email format'}), 400

    userTable = UserTable()
    if userTable.get_teacher_by_username(username):
        return jsonify({'message': 'Username already exists'}), 409

    hashed_password = generate_password_hash(password)
    user = userTable.create_user(
        username=username,
        password=hashed_password,
        email=email,
        first_name=first_name,
        last_name=last_name,
        profile_picture=None,
        IsTeacher=False
    )

    if user:
        session['user_id'] = user['user_id']
        join_room(str(user['user_id']))
        return jsonify({'message': 'User signed up successfully!', 'user': user}), 201
    
    return jsonify({'message': 'Something went wrong, please try again later'}), 500

@app.route('/users/check-auth', methods=['GET'])
def isAuth():
    return jsonify({'auth': 'user_id' in session}), 200

def check_messages():
    messages = DomainTable().get_unfinished_progress_modules()
    for message in messages:
        socketio.emit('notification', {
            'message': f'⚠️ Hurry Up! You have only {message["difference_in_days"]} days to finish 📚 {message["course_name"]} 🎓'
        }, room=str(message['user_id']))

def schedule_checker():
    print(generate_password_hash('password1'))
    print(generate_password_hash('password2'))
    print(generate_password_hash('password3'))
    print(generate_password_hash('teacherpass'))
    while True:
        schedule.run_pending()
        time.sleep(1)
    
if __name__ == '__main__':
    socketio_thread = threading.Thread(target=socketio.run, args=(app,), kwargs={
        'host': '0.0.0.0',
        'port': int(os.environ.get('PORT', 5000)),
        # 'ssl_context': 'adhoc'  # Use this for development. For production, use proper SSL certificates.
    })
    socketio_thread.start()

    schedule.every(10).seconds.do(check_messages)

    schedule_thread = threading.Thread(target=schedule_checker)
    schedule_thread.start()

    socketio_thread.join()
    schedule_thread.join()