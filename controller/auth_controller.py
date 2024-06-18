from flask import Blueprint, flash, redirect, render_template, request, session, url_for
from model.auth_model import *
import re


auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['GET', 'POST'])
def register():
    return render_template('register.html')

def login(email, password):
    login_data = login_users(email, password)
    if login_data:
        session['user_id'] = login_data['user_id']
        return {'success': True, 'message': 'Login successful'}
    else:
        return {'success': False, 'message': 'Invalid email or password'}

@auth_blueprint.route("/insert-user", methods=['POST', 'GET'])
def insert_user():
    users = get_users_from_db()
    email_error = False
    password_error = False
    email_exists_error = False
    email_not_valid = False
    email_valid = re.compile(r'^[\w\.-]+@hr\.nl$')

    if request.method == 'POST':
        email = request.form.get('user-email')
        password = request.form.get('user-password')

        admin = 0

        if len(email) < 3:
            email_error = True
        if len(password) < 3:
            password_error = True

        if not email_valid.match(email):
            email_not_valid = True

        for user in users:
            if user['email'] == email:
                email_exists_error = True
                break

        if not email_error and not password_error and not email_exists_error and not email_not_valid:
            msg = insert_user_into_database(email=email, password=password, admin=admin)
            return render_template('login.html', msg=msg)

    return render_template('register.html', email_error=email_error,
                           password_error=password_error,
                           email_exists_error=email_exists_error, email_not_valid=email_not_valid)
