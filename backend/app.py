from flask import Flask, jsonify, request, session
from models.user_model import UserTable
from routes.user_route import users_bp
from routes.domain_route import domains_bp
from flask_cors import CORS

app = Flask(__name__)
app.debug = True

# Configure CORS
CORS(app, origins=["http://localhost:3000", "http://192.168.178.17:3000"], supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = 'your_strong_secret_key'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=False)

app.register_blueprint(users_bp)
app.register_blueprint(domains_bp)

@app.route('/')
def main():
    return 'Welcome AAAAasdasdasdasdAA'

if __name__ == '__main__':
    app.run(host='0.0.0.0')
