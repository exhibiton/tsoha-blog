"""Module containing the `Blog` model."""
from application import db


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())
    title = db.Column(db.String(144), nullable=False)
    content = db.Column(db.String(144))

    def __init__(self, title, content):
        self.title = title
        self.content = content
