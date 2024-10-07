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

app = Flask(__name__)
app.secret_key = 'thisshouldbesecretfromenvironmentvariable'

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app, origins=["http://localhost:3000", "http://192.168.178.17:3000"], supports_credentials=True)
# talisman = Talisman(
#     app,
#     content_security_policy=None,  
#     force_https=True,
#     session_cookie_secure=False,
#     strict_transport_security=False,
#     referrer_policy=None
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
    print('Joined user:', data["room"])
    print(data)
    if data:
        join_room(str(data["room"]))  
        print(f'User {data["room"]} joined their room')

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data.get('room')
    leave_room(room)
    print(f'User left room: {room}')

@app.route('/notify', methods=['POST'])
def notify():
    message = request.json.get('message', 'Hello, World!')
    user_id = session.get('user_id')
    if user_id:
        socketio.emit('notification', {'message': message}, room=user_id)
        return jsonify({'status': 'notification sent'})
    else:
        return jsonify({'status': 'user not authenticated'}), 401

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    user_id = data.get('user_id')
    message = data.get('message')

    if user_id:
        # Emit message to the user's room
        socketio.emit('new_message', {'message': message}, room=str(user_id))
        return jsonify({'status': 'message sent'})
    else:
        return jsonify({'status': 'user_id not provided'}), 400

@app.route('/users/login', methods=['POST'])
def login():
    data = request.json
    userTable = UserTable()
    user = userTable.get_teacher_by_username_password(
        username=data['user_name'],
        password=data['password']
    )

    if user:
        session['user_id'] = user['user_id']
        socketio.emit('join_user_room', room=user['user_id'])  # Emit event
        return jsonify({'message': 'User logged in successfully!', 'user': user}), 200
    
    return jsonify({'message': 'User not found!'}), 422

@app.route('/users/signup', methods=['POST'])
def signup():
    data = request.json
    userTable = UserTable()
    user = userTable.create_user(
        username=data['user_name'],
        password=data['password'],
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        profile_picture=None,
        IsTeacher=False
    )

    if user:
        session['user_id'] = user['user_id']
        join_room(str(user['user_id']))  # Join room based on user_id
        return jsonify({'message': 'User signed up successfully!', 'user': user}), 200
    
    return jsonify({'message': 'Something went wrong please try again later'}), 500


@app.route('/users/check-auth', methods=['GET','POST'])
def isAuth():
    return jsonify({'auth': 'user_id' in session }), 200

def check_messages():
    messages = DomainTable().get_unfinished_progress_modules()
    for message in messages:
        socketio.emit('notification', {'message': f'⚠️ Hurry Up! You have only {message["difference_in_days"]} days to finish 📚 {message["course_name"]} 🎓'}, room=str(message['user_id']))

def schedule_checker():
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    socketio_thread = threading.Thread(target=socketio.run, args=(app,), kwargs={'host': '0.0.0.0', 'allow_unsafe_werkzeug' : True})
    socketio_thread.start()

    schedule.every().second.do(check_messages)

    schedule_thread = threading.Thread(target=schedule_checker)
    schedule_thread.start()

    socketio_thread.join()
    schedule_thread.join()