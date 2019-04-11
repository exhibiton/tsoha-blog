"""Schemas for the `Post` model."""
from marshmallow import Schema, fields


class PostSchema(Schema):
    """Post model."""
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True)
    title = fields.Str(required=True)
    admin_id = fields.Int(required=True)

    class Meta:
        """Set strict to `True` so that `webargs` will be able to use this `Schema`."""
        strict = True
