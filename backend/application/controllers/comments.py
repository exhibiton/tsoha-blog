import json
from flask import jsonify, request, make_response
from application import db
from application.controllers import api
from application.models.comment import Comment
from application.models.user import User
from application.schemas.comment import CommentSchema
from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)


@api.route('/comments', methods=['GET'])
def comments_index():
    comments = Comment.query.all()
    comment_schema = CommentSchema(many=True)
    result = comment_schema.dump(comments)
    # I have no idea why Marshmallow is adding an empty dict into the dump.
    return jsonify(result[0])


@api.route('/comments/<pk>', methods=['GET'])
@jwt_required
def comment_get(pk):
    current_user = get_jwt_identity()
    try:
        comment = Comment.find_comments_by_comment_id(pk)
        if comment:
            if comment.user_id == current_user['id']:
                comment_schema = CommentSchema()
                comment_result = comment_schema.dump(comment)
                return make_response(jsonify(comment_result[0])), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Not authorized to edit this comment',
                }
                return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Could not find comment',
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not get comment',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500


@api.route('/comments', methods=['POST'])
@jwt_required
def comments_create():
    current_user = get_jwt_identity()

    data = json.loads(request.data)
    content = data['content']['content']
    post_id = data['post_id']
    user = User.find_user_by_email(current_user['email'])

    try:
        comment = Comment(
            content=content,
            post_id=post_id,
            user_id=user.id
        )

        db.session.add(comment)
        db.session.commit()

        comment_schema = CommentSchema()
        comment_result = comment_schema.dump(comment)

        response_object = {
            'status': 'success',
            'message': 'Successfully created a Comment',
            'comment': comment_result[0]
        }
        return make_response(jsonify(response_object)), 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not create a comment',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500


@api.route('/comments/<pk>', methods=['PUT'])
@jwt_required
def comment_update(pk):
    current_user = get_jwt_identity()
    try:
        comment = Comment.find_comments_by_comment_id(pk)
        if comment:
            if comment.user_id == current_user['id']:
                data = json.loads(request.data)
                if data['content']:
                    content = data['content']
                    comment.content = content
                db.session.commit()
                comment_schema = CommentSchema()
                comment_result = comment_schema.dump(comment)
                response_object = {
                    'status': 'success',
                    'message': 'Successfully updated comment',
                    'comment': comment_result[0]
                }
                return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Not authorized to edit this comment',
                }
                return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Could not find comment',
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not update comment',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500


@api.route('/comments/<pk>', methods=['DELETE'])
@jwt_required
def comment_delete(pk):
    current_user = get_jwt_identity()
    try:
        comment = Comment.find_comments_by_comment_id(pk)
        if comment:
            if comment.user_id == current_user['id']:
                db.session.delete(comment)
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'message': 'Successfully delete comment',
                }
                return make_response(jsonify(response_object)), 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Not authorized to delete this comment',
                }
                return make_response(jsonify(response_object)), 403
        else:
            response_object = {
                'status': 'fail',
                'message': 'Could not find comment',
            }
            return make_response(jsonify(response_object)), 404
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not delete comment',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 500
