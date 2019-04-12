from flask import jsonify, make_response, request
from application.controllers import api
from application.models.post import Post
from application.schemas.post import PostSchema
from sqlalchemy.exc import IntegrityError
from application import db

@api.route('/posts', methods=['GET'])
def index():
    posts = Post.query.all()
    post_schema = PostSchema(many=True)
    result = post_schema.dump(posts)
    # I have no idea why Marshmallow is adding an empty dict into the dump.
    return jsonify(result[0])


@api.route('/posts', methods=['POST'])
def create():
    data = request.args
    title = data['title']
    content = data['content']
    admin_id = data['admin_id']

    try:
        post = Post(
            title=title,
            content=content,
            admin_id=admin_id
        )

        db.session.add(post)
        db.session.commit()

        response_object = {
            'status': 'success',
            'message': 'Successfully created a Post',
            'post_id': post.id
        }
        return make_response(jsonify(response_object)), 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Could not sign in',
            'error': ','.join(e.args)
        }
        return make_response(jsonify(response_object)), 401


@api.route('/posts/<pk>', methods=['GET'])
def get(pk):
    try:
        post = Post.find_post_by_id(pk)
        if post:
            post_schema = PostSchema(many=True)
            post_result = post_schema.dump(post)
            return make_response(jsonify(post_result[0])), 200
        else:
            return make_response({'message': 'Post could not be found.'}), 400
    except IntegrityError:
        return make_response({'message': 'Post could not be found.'}), 400
