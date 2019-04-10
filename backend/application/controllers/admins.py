from flask import make_response, jsonify, request
from application.controllers import api
from application.models.admin import Admin
from application import db


@api.route('/admin_auth', methods=['POST'])
def admin_auth():
    data = request.args
    email = data['email']
    password = data['password']
    admin = Admin.find_admin_by_email(email).first()

    if not admin:
        try:
            admin = Admin(
                email=email,
                password=password
            )

            db.session.add(admin)
            db.session.commit()

            auth_token = admin.encode_auth_token(admin.id)
            response_object = {
                'status': 'success',
                'message': 'Successfully signed up',
                'auth_token': auth_token.decode()
            }
            return make_response(jsonify(response_object)), 201
        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Could not create account'
            }

            return make_response(jsonify(response_object)), 401
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists'
        }
        return make_response(jsonify(response_object)), 202

