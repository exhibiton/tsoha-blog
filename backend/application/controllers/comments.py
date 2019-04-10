from flask import jsonify
from application.controllers import api
from application.models.comment import Comment
from application.schemas.comment import CommentSchema


@api.route('/comments', methods=['GET'])
def comments_index():
    comments = Comment.query.all()
    comment_schema = CommentSchema(many=True)
    result = comment_schema.dump(comments)
    # I have no idea why Marshmallow is adding an empty dict into the dump.
    return jsonify(result[0])
