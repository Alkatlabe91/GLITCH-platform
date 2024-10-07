from flask import Blueprint, request, jsonify, session, current_app
from models.domain_model import DomainTable
from flask_cors import CORS, cross_origin
from routes.auth import login_required, isTeacher
from routes.validation import sanitize_input, is_valid_email
domains_bp = Blueprint('domains', __name__)


@domains_bp.route('/domains/register_user_course', methods=['POST'])
@cross_origin(supports_credentials=True)
@login_required
def register_user_course():
    data = request.json
    if not data or 'module_id' not in data:
        return jsonify({"message": "Invalid request"}), 400
    
    domainTable = DomainTable()
    domainTable.register_usermodules(session['user_id'], data["module_id"])
    return jsonify({"message": "Added successfully"}), 200

@domains_bp.route('/domains/get_all_domaines', methods=['GET'])
@login_required
def get_all_domaines_with_realted_data():
    domainTable = DomainTable()
    progress = domainTable.get_all_domaines_with_realted_data()
    return jsonify(progress), 200

@domains_bp.route('/domains/module_progress/<int:module_id>', methods=['GET'])
@login_required
def get_module_progress(module_id):
    domainTable = DomainTable()
    progress = domainTable.get_userprogressmodules_by_module_id(module_id=module_id)
    return jsonify(progress), 200

@domains_bp.route('/domains/submit_user_progress_module/<int:user_progress_module_id>', methods=['GET'])
@login_required
def submit_user_progress_module(user_progress_module_id):
    domainTable = DomainTable()
    domainTable.submit_user_progress_module_id(user_progress_module_id)
    return jsonify({"message": "Updated successfully"}), 200

@domains_bp.route('/domains/get_all', methods=['GET'])
@login_required
def get_all_domains_joined_with_courses():
    all_domains = DomainTable().get_all_domains_joined_with_courses()
    return jsonify(all_domains)

@domains_bp.route('/domains/domin_new', methods=['POST'])
@login_required
@isTeacher
def create_domain():
    data = request.json
    if not data or 'domain_name' not in data:
        return jsonify({"message": "Invalid request"}), 400
    
    domain_name = sanitize_input(data["domain_name"])
    domainTable = DomainTable()
    domaine = domainTable.create_domain(domain_name)
    return jsonify({"message": "Added successfully", "data": domaine}), 200

@domains_bp.route('/domains/activity_new', methods=['POST'])
@login_required
@isTeacher
def create_activity():
    data = request.json
    if not data or not all(key in data for key in ["module_id", "activity_name", "description", "level", "type", "point"]):
        return jsonify({"message": "Invalid request"}), 400
    
    sanitized_data = {key: sanitize_input(str(value)) for key, value in data.items()}
    domainTable = DomainTable()
    activity = domainTable.create_activities(**sanitized_data)
    return jsonify({"message": "Added successfully", "data": activity}), 200

@domains_bp.route('/domains/modules_new', methods=['POST'])
@login_required
@isTeacher
def modules_new():
    data = request.json
    if not data or not all(key in data for key in ["instance_id", "module_name", "description", "required_point"]):
        return jsonify({"message": "Invalid request"}), 400
    
    sanitized_data = {key: sanitize_input(str(value)) for key, value in data.items()}
    domainTable = DomainTable()
    module = domainTable.create_modules(**sanitized_data)
    return jsonify({"message": "Added successfully", "data": module}), 200

@domains_bp.route('/domains/domin_course_new', methods=['POST'])
@login_required
@isTeacher
def create_domin_course():
    data = request.json
    if not data or not all(key in data for key in ["domain_id", "course_name", "description"]):
        return jsonify({"message": "Invalid request"}), 400
    
    sanitized_data = {key: sanitize_input(str(value)) for key, value in data.items()}
    domainTable = DomainTable()
    course = domainTable.create_course(**sanitized_data)
    return jsonify({"message": "Added successfully", "data": course}), 200

@domains_bp.route('/domains/instance_course_new', methods=['POST'])
@login_required
@isTeacher
def create_instance_course():
    data = request.json
    if not data or not all(key in data for key in ["course_id", "instance_name", "start_date", "end_date"]):
        return jsonify({"message": "Invalid request"}), 400
    
    sanitized_data = {key: sanitize_input(str(value)) for key, value in data.items()}
    domainTable = DomainTable()
    instance = domainTable.create_instance(**sanitized_data)
    return jsonify({"message": "Added successfully", "data": instance}), 200

@domains_bp.route('/domains/get_registered_domain_by_usermodules', methods=['GET'])
@login_required
def get_registered_domain_by_usermodules():
    user_id = request.args.get('user_id')
    if user_id is None:
        return jsonify({'message': 'User ID not provided!'}), 400

    result = DomainTable().get_registered_domain_by_usermodules(user_id)
    if result:
        return jsonify(result)
    return jsonify({'message': 'User not found!'}), 404

@domains_bp.route('/domains/get_all_courses', methods=['GET'])
@login_required
def get_all_courses():
    all_courses = DomainTable().get_all_courses()
    return jsonify(all_courses)

@domains_bp.route('/domains/register_user_in_module', methods=['POST'])
@login_required
def register_user_in_module():
    data = request.json
    user_id = data.get('user_id')
    module_id = data.get('module_id')
    if user_id is None or module_id is None:
        return jsonify({'message': 'User ID or Module ID not provided!'}), 400

    DomainTable().register_user_in_module(user_id, module_id)
    return jsonify({'message': 'User registered in module successfully!'}), 201

@domains_bp.route('/domains/get_requested_tasks', methods=['GET'])
@login_required
def get_requested_tasks():
    data = DomainTable().get_requested_tasks()
    return jsonify(data), 200

@domains_bp.route('/domains/mark_user_progress_module_as_failed/<int:user_progress_module_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
@isTeacher
def mark_user_progress_module_as_failed(user_progress_module_id):
    DomainTable().mark_user_progress_module_as_failed(session['user_id'], user_progress_module_id)
    return jsonify({"message": "Updated successfully"}), 200

@domains_bp.route('/domains/get_modules_by_instance_id/<int:instance_id>', methods=['GET'])
@login_required
def get_modules_by_instance_id(instance_id):
    res = DomainTable().get_modules_by_instance_id(instance_id)
    return jsonify(res), 200

@domains_bp.route('/domains/get_instances_by_course_id/<int:course_id>', methods=['GET'])
@login_required
def get_instances_by_course_id(course_id):
    res = DomainTable().get_instances_by_course_id(course_id)
    return jsonify(res), 200

@domains_bp.route('/domains/mark_user_progress_module_as_passed/<int:user_progress_module_id>', methods=['GET'])
@login_required
@isTeacher
def mark_user_progress_module_as_passed(user_progress_module_id):
    DomainTable().mark_user_progress_module_as_passed(session['user_id'], user_progress_module_id)
    return jsonify({"message": "Updated successfully"}), 200

@domains_bp.route('/domains/get_registered_modules', methods=['GET'])
@login_required
def get_registered_modules():
    results = DomainTable().get_registered_modules(session['user_id'])
    return jsonify(results), 200

@domains_bp.route('/domains/create_user_progress_post', methods=['POST'])
@login_required
def create_user_progress_post():
    data = request.json
    if not data or 'user_progress_module_id' not in data or 'content' not in data:
        return jsonify({'message': 'Invalid request'}), 400
    
    user_progress_module_id = data.get('user_progress_module_id')
    content = sanitize_input(data.get('content'))
    DomainTable().create_user_progress_post(user_progress_module_id, content)
    return jsonify({'message': 'Created!'}), 200

@domains_bp.route('/domains/create_userpostcomments', methods=['POST'])
@login_required
def create_userpostcomments():
    data = request.json
    if not data or 'user_post_id' not in data or 'comment' not in data:
        return jsonify({'message': 'Invalid request'}), 400
    
    user_id = session['user_id']
    user_post_id = data.get('user_post_id')
    comment = sanitize_input(data.get('comment'))
    DomainTable().create_userpostcomments(user_id, user_post_id, comment)
    return jsonify({'message': 'Created!'}), 200

@domains_bp.route('/domains/community', methods=['GET'])
@login_required
def community():
    results = DomainTable().get_userpost_with_comments()
    return jsonify(results), 200

@domains_bp.route('/domains/analytics', methods=['GET'])
@login_required
@isTeacher
def analytics():
    results = DomainTable().get_analytics_data()
    return jsonify(results), 200