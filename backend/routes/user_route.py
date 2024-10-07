import os 
from flask import Blueprint, request, jsonify, session, send_from_directory
from models.user_model import UserTable
from flask_cors import CORS, cross_origin


users_bp = Blueprint('users', __name__)


@users_bp.route('/users/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out successfully!'}), 200

@users_bp.route('/users/my_profile', methods=['GET'])
def my_profile():
   user_id = session['user_id']
   if user_id is None:
        return jsonify({'message': 'Not logged in'}), 403

   user = UserTable().get_user_by_id(user_id)
   if user:
        return jsonify(user)
   return jsonify({'message': 'User not found!'})

@users_bp.route('/users/load-picture/<string:filename>', methods=['GET'])
def get_picture(filename):
    static_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static', 'profile-pictures'))
    return send_from_directory(static_folder, filename)


@users_bp.route('/users/my_profile_pic', methods=['POST'])
def upload_file():
    if session['user_id'] is None:
        return jsonify({'message': 'forbidden'}), 403
    if 'file' not in request.files:
        return jsonify({'message': 'no file found in your request'}), 422
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'message': 'no file found in your request'}), 422
    
    if file:
        filename = file.filename
        file.save(os.path.join('static/profile-pictures', filename))
        userTable = UserTable()
        user = userTable.get_user_by_id(session["user_id"])
        userTable.update_user_by_id(user["user_id"], user["username"], user["password"], user["email"], user["first_name"], user["last_name"], filename, user["IsTeacher"] )
        return jsonify({'message': 'updated successfully'})

@users_bp.route('/users/get_user_by_id', methods=['GET'])
def get_user_by_id():
   user_id = request.args.get('user_id')
   if user_id is None:
        return jsonify({'message': 'User ID not provided!'}), 400

   user = UserTable().get_user_by_id(user_id = 1)
   if user:
        return jsonify({'message': 'User found successfully!'})
   return jsonify({'message': 'User not found!'})


@users_bp.route('/users/update_profile', methods=['PUT'])
def update_user_by_id():
    data = request.json
   
    user_id = session['user_id']
    if user_id is None:
        return jsonify({'message': 'forbidden'}), 403
    userTable = UserTable()
    user = userTable.get_user_by_id(user_id)
    if user is None:
       return jsonify({'message': 'forbidden'}), 403
    username = data.get('username')
    password = user["password"]
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    profile_picture = user["profile_picture"]
    IsTeacher = data.get('IsTeacher')

    userTable.update_user_by_id(user_id, username, password, email, first_name, last_name, profile_picture, IsTeacher)

    return jsonify({'message': 'User updated successfully!'})



@users_bp.route('/users/get_all_users', methods=['GET'])
def get_all_users():
    users = UserTable().get_all_users()
    return jsonify(users)