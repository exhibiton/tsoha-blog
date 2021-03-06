from flask import make_response, jsonify, request
from application.controllers import api
from application.models.admin import Admin
from application.models.comment import Comment
from application import bcrypt
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)


@api.route('/admins/sign_in', methods=['POST'])
def authenticate():
    data = request.args
    email = data['email']
    password = data['password']

    try:
        admin = Admin.find_admin_by_email(email)

        if admin and bcrypt.check_password_hash(admin.password, password):

            identity = {
                'email': admin.email,
                'name': admin.username,
                'id': admin.id,
                'isAdmin': True
            }
            access_token = create_access_token(identity=identity)

            if access_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in',
                    'auth_token': access_token
                }
                return make_response(jsonify(response_object)), 200
        elif admin and not bcrypt.check_password_hash(admin.password, password):
            response_object = {
                'status': 'fail',
                'message': 'Invalid password.'
            }
            return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Admin does not exist.'
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not sign in',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 401


@api.route('/admins/comment_stats', methods=['GET'])
@jwt_required
def comment_stats():
    try:
        stats = Comment.find_most_commenting_users()
        response_object = {
            'status': 'success',
            'message': 'Successfully got your stats',
            'stats': stats
        }
        return make_response(jsonify(response_object)), 200
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not get your stats',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500
