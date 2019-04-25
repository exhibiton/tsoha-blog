from flask import make_response, jsonify, request
from application.controllers import api
from application.models.user import User
from application import db
from application import bcrypt
from flask_jwt_extended import (
    create_access_token
)


@api.route('/users/sign_in', methods=['POST'])
def sign_in():
    data = request.args
    email = data['email']
    password = data['password']

    try:
        user = User.find_user_by_email(email)

        if user and bcrypt.check_password_hash(user.password, password):
            identity = {
                'email': user.email,
                'name': user.username,
                'id': user.id,
                'isAdmin': False
            }
            access_token = create_access_token(identity=identity)

            if access_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in',
                    'auth_token': access_token
                }
                return make_response(jsonify(response_object)), 200
        elif user and not bcrypt.check_password_hash(user.password, password):
            response_object = {
                'status': 'fail',
                'message': 'Invalid password.'
            }
            return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'User does not exist.'
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not sign in',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 401


@api.route('/users/sign_up', methods=['POST'])
def sign_up():
    data = request.args
    email = data['email']
    password = data['password']
    user = User.find_user_by_email(email)

    if not user:
        try:
            user = User(
                email=email,
                password=password,
                username=email
            )

            db.session.add(user)
            db.session.commit()

            identity = {
                'email': user.email,
                'name': user.username
            }

            access_token = create_access_token(identity=identity)
            response_object = {
                'status': 'success',
                'message': 'Successfully signed up',
                'auth_token': access_token
            }
            return make_response(jsonify(response_object)), 201
        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': 'Could not create account',
                'error': ','.join(e.args)
            }

            return make_response(jsonify(response_object)), 401
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists'
        }
        return make_response(jsonify(response_object)), 202
