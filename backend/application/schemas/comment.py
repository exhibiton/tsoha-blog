"""Schemas for the `Post` model."""
from marshmallow import Schema, fields
from application.schemas.user import UserSchema


class CommentSchema(Schema):
    """Post model."""
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True)
    user = fields.Nested(UserSchema, only=["username"])
    post_id = fields.Int(requied=True)

    class Meta:
        """Set strict to `True` so that `webargs` will be able to use this `Schema`."""
        strict = True
