import os
from flask import Blueprint, request, jsonify, session, send_from_directory, abort, current_app
from models.user_model import UserTable
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from routes.auth import login_required
from routes.validation import is_valid_email, sanitize_input
users_bp = Blueprint('users', __name__)

@users_bp.route('/users/logout', methods=['POST'])
@cross_origin(supports_credentials=True)

@login_required
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out successfully!'}), 200

@users_bp.route('/users/my_profile', methods=['GET'])
@login_required
def my_profile():
    user_id = session.get('user_id')
    user = UserTable().get_user_by_id(user_id)
    if user:
        user.pop('password', None)
        return jsonify(user)
    return jsonify({'message': 'User not found!'}), 404

@users_bp.route('/users/load-picture/<string:filename>', methods=['GET'])
@login_required
def get_picture(filename):
    static_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static', 'profile-pictures'))
    safe_filename = secure_filename(filename)
    if not safe_filename or '..' in safe_filename:
        abort(404)
    return send_from_directory(static_folder, safe_filename)

@users_bp.route('/users/my_profile_pic', methods=['POST'])
@login_required
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'no file found in your request'}), 422
   
    file = request.files['file']
   
    if file.filename == '':
        return jsonify({'message': 'no file found in your request'}), 422
   
    if file:
        filename = secure_filename(file.filename)
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
        if '.' not in filename or filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            return jsonify({'message': 'Invalid file type'}), 422

        file_path = os.path.join('static/profile-pictures', filename)
        file.save(file_path)
        userTable = UserTable()
        user = userTable.get_user_by_id(session["user_id"])
        userTable.update_user_by_id(user["user_id"], user["username"], user["password"], user["email"], user["first_name"], user["last_name"], filename, user["IsTeacher"])
        return jsonify({'message': 'updated successfully'})

@users_bp.route('/users/get_user_by_id', methods=['GET'])
@login_required
def get_user_by_id():
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({'message': 'Invalid user ID!'}), 400
    user = UserTable().get_user_by_id(user_id)
    if user:
        user.pop('password', None)
        return jsonify(user)
    return jsonify({'message': 'User not found!'}), 404

@users_bp.route('/users/update_profile', methods=['PUT'])
@login_required
def update_user_by_id():
    data = request.json
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    user_id = session['user_id']
    userTable = UserTable()
    user = userTable.get_user_by_id(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    username = sanitize_input(data.get('username', user['username']))
    email = sanitize_input(data.get('email', user['email']))
    if not is_valid_email(email):
        return jsonify({'message': 'Invalid email format'}), 400
    first_name = sanitize_input(data.get('first_name', user['first_name']))
    last_name = sanitize_input(data.get('last_name', user['last_name']))
    IsTeacher = user.get('IsTeacher')

    userTable.update_user_by_id(user_id, username, user["password"], email, first_name, last_name, user["profile_picture"], IsTeacher)
    return jsonify({'message': 'User updated successfully!'})
 
@users_bp.route('/users/get_all_users', methods=['GET'])
@login_required
def get_all_users():
    users = UserTable().get_all_users()
    for user in users:
        user.pop('password', None)
    return jsonify(users)

@users_bp.route('/users/sql_injection', methods=['POST'])
def sql_injection():
    print(request.json.get("username"))
    users = UserTable().get_user_by_username_sql_injection(request.json.get("username"))
    print(users)
    return jsonify(users)
