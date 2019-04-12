"""Schemas for the `Post` model."""
from marshmallow import Schema, fields
from application.schemas.admin import AdminSchema
from application.schemas.comment import CommentSchema


class PostSchema(Schema):
    """Post model."""
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True)
    title = fields.Str(required=True)
    admin = fields.Nested(AdminSchema, only=["username"])
    comments = fields.Nested(CommentSchema, many=True)

    class Meta:
        """Set strict to `True` so that `webargs` will be able to use this `Schema`."""
        strict = True
