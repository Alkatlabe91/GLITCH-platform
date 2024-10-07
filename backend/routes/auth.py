from flask import jsonify, session
from functools import wraps
from models.user_model import UserTable
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'message': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function


def isTeacher(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'message': 'Unauthorized'}), 401
        else: 
         user = UserTable().get_user_by_id(session['user_id'])
         teacher = user["isTeacher"]
         if teacher is True:
          return f(*args, **kwargs)
         else: 
          return jsonify({'message': 'Unauthorized'}), 401
    return decorated_function