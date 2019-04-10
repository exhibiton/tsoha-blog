"""Schemas for the `Post` model."""
from marshmallow import Schema, fields


class UserSchema(Schema):
    """Post model."""
    id = fields.Int(dump_only=True)
    email = fields.Str(required=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)

    class Meta:
        """Set strict to `True` so that `webargs` will be able to use this `Schema`."""
        strict = True
