from flask import jsonify, make_response
from application.controllers import api
from application.models.post import Post
from application.schemas.post import PostSchema
from sqlalchemy.exc import IntegrityError


@api.route('/posts', methods=['GET'])
def index():
    posts = Post.query.all()
    post_schema = PostSchema(many=True)
    result = post_schema.dump(posts)
    # I have no idea why Marshmallow is adding an empty dict into the dump.
    return jsonify(result[0])


@api.route('/posts/<id>', methods=['GET'])
def get(id):
    try:
        post = Post.find_post_by_id(id)
        if post:
            post_schema = PostSchema(many=True)
            post_result = post_schema.dump(post)
            return make_response(jsonify({'post': post_result})), 200
        else:
            return make_response({'message': 'Post could not be found.'}), 400
    except IntegrityError:
        return make_response({'message': 'Post could not be found.'}), 400
