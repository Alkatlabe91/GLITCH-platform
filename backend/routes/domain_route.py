from flask import Blueprint, request, jsonify, session
from models.domain_model import DomainTable
from flask_cors import CORS, cross_origin


domains_bp = Blueprint('domains', __name__)



@domains_bp.route('/domains/register_user_course', methods=['POST'])
@cross_origin(supports_credentials=True)
def register_user_course():
     data = request.json
     print(data)
     print(session['user_id'], data["module_id"])
     domainTable = DomainTable()
     domainTable.register_usermodules(session['user_id'], data["module_id"])
     return jsonify({"message": "added succesfuly"}),200


@domains_bp.route('/domains/module_progress/<int:module_id>', methods=['GET'])
def get_module_progress(module_id):
     domainTable = DomainTable()
     progress = domainTable.get_userprogressmodules_by_module_id(module_id=module_id)
     return jsonify(progress),200

@domains_bp.route('/domains/submit_user_progress_module/<int:user_progress_module_id>', methods=['GET'])
def submit_user_progress_module(user_progress_module_id):
     domainTable = DomainTable()
     print(user_progress_module_id)
     domainTable.submit_user_progress_module_id(user_progress_module_id)
     return jsonify({"message": "updated succesfuly"}),200


@domains_bp.route('/domains/get_all', methods=['GET'])
def get_all_domains_joined_with_courses():
    print(session['user_id'])
    all_domains = DomainTable().get_all_domains_joined_with_courses()
    return jsonify(all_domains)


@domains_bp.route('/domains/domin_new', methods=['POST'])
def create_domain():
     data = request.json
     print(data)
     domainTable = DomainTable()
     domainTable.create_domain(data["domain_name"])
     return jsonify({"message": "added succesfuly"}),200

@domains_bp.route('/domains/activity_new', methods=['POST'])
def create_activity():
     data = request.json
     print(data)
     domainTable = DomainTable()
     domainTable.create_activities(data["module_id"],data["activity_name"],data["description"],data["level"],data["type"],data["point"])
     return jsonify({"message": "added succesfuly"}),200

@domains_bp.route('/domains/modules_new', methods=['POST'])
def modules_new():
     data = request.json
     print(data)
     domainTable = DomainTable()
     domainTable.create_modules(data["instance_id"],data["module_name"],data["description"],data["required_point"])
     return jsonify({"message": "added succesfuly"}),200

@domains_bp.route('/domains/domin_course_new', methods=['POST'])
def create_domin_course():
     data = request.json
     print(data)

     domainTable = DomainTable()
     domainTable.create_course(data["domain_id"],data["course_name"],data["description"])
     return jsonify({"message": "added succesfuly"}),200

@domains_bp.route('/domains/instance_course_new', methods=['POST'])
def create_instance_course():
     data = request.json
     print(data)
     domainTable = DomainTable()
     domainTable.create_instance(data["course_id"],data["instance_name"],data["start_date"],data["end_date"])
     return jsonify({"message": "added succesfuly"}),200


@domains_bp.route('/domains/get_registered_domain_by_usermodules', methods=['GET'])
def get_registered_domain_by_usermodules():
    user_id = request.args.get('user_id')
    if user_id is None:
        return jsonify({'message': 'User ID not provided!'}), 400

    result = DomainTable().get_registered_domain_by_usermodules(user_id)
    if result:
        return jsonify(result)
    return jsonify({'message': 'User not found!'}), 404


@domains_bp.route('/domains/get_all_courses', methods=['GET'])
def get_all_courses():
    all_courses = DomainTable().get_all_courses()
    return jsonify(all_courses)

@domains_bp.route('/domains/register_user_in_module', methods=['POST'])
def register_user_in_module():
    data = request.json
    user_id = data.get('user_id')
    module_id = data.get('module_id')
    if user_id is None or module_id is None:
        return jsonify({'message': 'User ID or Module ID not provided!'}), 400

    DomainTable().register_user_in_module(user_id, module_id)
    return jsonify({'message': 'User registered in module successfully!'}), 201

@domains_bp.route('/domains/get_requested_tasks', methods=['GET'])
def get_requested_tasks():
    data =  DomainTable().get_requested_tasks()
    return jsonify(data), 200


@domains_bp.route('/domains/mark_user_progress_module_as_failed/<int:user_progress_module_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def mark_user_progress_module_as_failed(user_progress_module_id):
    print(session['user_id'])
    DomainTable().mark_user_progress_module_as_failed(session['user_id'], user_progress_module_id)
    return jsonify({"message":"updated succesfuly"}), 200

@domains_bp.route('/domains/get_modules_by_instance_id/<int:instance_id>', methods=['GET'])
def get_modules_by_instance_id(instance_id):
    res = DomainTable().get_modules_by_instance_id(instance_id)
    return jsonify(res), 200

@domains_bp.route('/domains/get_instances_by_course_id/<int:course_id>', methods=['GET'])
def get_instances_by_course_id(course_id):
    res = DomainTable().get_instances_by_course_id(course_id)
    return jsonify(res), 200


@domains_bp.route('/domains/mark_user_progress_module_as_passed/<int:user_progress_module_id>', methods=['GET'])
def mark_user_progress_module_as_passed(user_progress_module_id):
    DomainTable().mark_user_progress_module_as_passed(session['user_id'], user_progress_module_id)
    return jsonify({"message":"updated succesfuly"}), 200

@domains_bp.route('/domains/get_registered_modules', methods=['GET'])
def get_registered_modules():
    results = DomainTable().get_registered_modules(session['user_id'])
    return jsonify(results), 200




@domains_bp.route('/domains/create_user_progress_post', methods=['POST'])
def create_user_progress_post():
    data = request.json
    user_progress_module_id = data.get('user_progress_module_id')
    content = data.get('content')
    DomainTable().create_user_progress_post(user_progress_module_id, content)
    return jsonify({'message': 'created!'}), 200


@domains_bp.route('/domains/create_userpostcomments', methods=['POST'])
def create_userpostcomments():
    data = request.json
    user_id = session['user_id']
    user_post_id = data.get('user_post_id')
    comment = data.get('comment')
    DomainTable().create_userpostcomments(user_id, user_post_id,comment )
    return jsonify({'message': 'created!'}), 200



@domains_bp.route('/domains/community', methods=['GET'])
def community():
    results = DomainTable().get_userpost_with_comments()
    return jsonify(results), 200