from flask import make_response, jsonify, request
from application.controllers import api
from application.models.user import User
from application import db
from application import bcrypt

@api.route('/users/sign_in', methods=['POST'])
def sign_in():
    data = request.args
    email = data['email']
    password = data['password']

    try:
        user = User.find_user_by_email(email)

        if user and bcrypt.check_password_hash(user.password, password):
            auth_token = user.encode_auth_token()

            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in',
                    'auth_token': auth_token.decode("utf-8")
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
            'message': 'Could not create account',
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

            auth_token = user.encode_auth_token()
            response_object = {
                'status': 'success',
                'message': 'Successfully signed up',
                'auth_token': auth_token.decode("utf-8")
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

