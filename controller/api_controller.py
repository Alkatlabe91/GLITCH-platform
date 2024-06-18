from flask import Blueprint, jsonify
from model.api_model import *


api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/tjores', methods=['GET'])
def courses_json():
    tjores = 'hallo ik ben tjores'
    return jsonify(tjores)


@api_blueprint.route('/courses/json', methods=['GET'])
def courses_json():
    courses = get_course()
    return jsonify(courses)


