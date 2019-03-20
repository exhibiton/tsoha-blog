"""This is a simple example module.
Change or delete this as you see fit.
"""
from flask import jsonify

from application.controllers import api
from application.models.post import Post
from application.schemas.post import PostSchema
from sqlalchemy.exc import IntegrityError


@api.route('/posts', methods=['GET'])
def index():
    posts = Post.query.all()
    post_schema = PostSchema(many=True)
    result = post_schema.dump(posts)
    return jsonify({'posts': result})


@api.route('/posts/<int:pk>')
def get(pk):
    try:
        post = Post.query.get(pk)
    except IntegrityError:
        return jsonify({'message': 'Post could not be found.'}), 400
    post_schema = PostSchema(many=True)
    post_result = post_schema.dump(post)
    return jsonify({'post': post_result})
