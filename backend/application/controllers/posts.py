import json
from flask import jsonify, make_response, request
from application.controllers import api
from application.models.post import Post
from application.models.admin import Admin
from application.schemas.post import PostSchema
from sqlalchemy.exc import IntegrityError
from application import db
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)


@api.route('/posts', methods=['GET'])
def post_index():
    posts = Post.query.all()
    sorted_posts = sorted(posts, key=lambda post:post.id, reverse=True)
    post_schema = PostSchema(many=True)
    result = post_schema.dump(sorted_posts)
    # I have no idea why Marshmallow is adding an empty dict into the dump.
    return jsonify(result[0])


@api.route('/posts', methods=['POST'])
@jwt_required
def post_create():
    current_admin = get_jwt_identity()

    data = json.loads(request.data)
    title = data['title']
    content = data['content']
    admin = Admin.find_admin_by_email(current_admin['email'])

    try:
        post = Post(
            title=title,
            content=content,
            admin_id=admin.id
        )

        db.session.add(post)
        db.session.commit()

        post_schema = PostSchema()
        post_result = post_schema.dump(post)

        response_object = {
            'status': 'success',
            'message': 'Successfully created a Post',
            'post': post_result[0]
        }
        return make_response(jsonify(response_object)), 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not create a Post',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 403


@api.route('/posts/<pk>', methods=['GET'])
def post_get(pk):
    try:
        post = Post.find_post_by_id(pk)
        if post:
            post_schema = PostSchema(many=True)
            post_result = post_schema.dump(post)
            return make_response(jsonify(post_result[0][0])), 200
        else:
            return make_response({'message': 'Post could not be found.'}), 400
    except IntegrityError:
        return make_response({'message': 'Post could not be found.'}), 400


@api.route('/posts/<pk>', methods=['PUT'])
@jwt_required
def post_update(pk):
    current_admin = get_jwt_identity()

    try:
        post = Post.find_post_by_id(pk)
        if post:
            if post.admin_id == current_admin['id']:
                data = json.loads(request.data)
                if data['title']:
                    title = data['title']
                    post.title = title
                if data['content']:
                    content = data['content']
                    post.content = content
                db.session.commit()

                post_schema = PostSchema()
                post_result = post_schema.dump(post)

                response_object = {
                    'status': 'success',
                    'message': 'Successfully updated post',
                    'post': post_result[0]
                }
                return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Not authorized to edit this post',
                }
                return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Could not find post',
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not update post',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500


@api.route('/posts/<pk>', methods=['DELETE'])
@jwt_required
def post_delete(pk):
    current_admin = get_jwt_identity()
    try:
        post = Post.find_post_by_id(pk)
        if post:
            if post.admin_id == current_admin['id']:
                db.session.delete(post)
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'message': 'Successfully deleted post',
                }
                return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Not authorized to delete this post',
                }
                return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Could not find post',
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not delete post',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500


