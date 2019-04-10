from flask import make_response, jsonify, request
from application.controllers import api
from application.models.admin import Admin
from application import bcrypt


@api.route('/admins/authenticate', methods=['POST'])
def authenticate():
    data = request.args
    email = data['email']
    password = data['password']

    try:
        admin = Admin.find_admin_by_email(email)

        if admin and bcrypt.check_password_hash(admin.password, password):
            auth_token = admin.encode_auth_token()

            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in',
                    'auth_token': auth_token.decode("utf-8")
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
