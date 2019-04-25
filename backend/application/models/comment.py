from application import db
import copy
from sqlalchemy.sql import text


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())
    content = db.Column(db.Text)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, content, post_id, user_id):
        self.content = content
        self.post_id = post_id
        self.user_id = user_id

    def __getitem__(self, idx):
        c = copy.copy(self)
        c.title = c.content.split("`")[idx]
        return c

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def remove_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @staticmethod
    def find_most_commenting_users():
        stmt = text("SELECT users.username,"
                    " COUNT(comments.id) as comment_count"
                    " FROM Users"
                    " JOIN comments ON comments.user_id = users.id "
                    "GROUP BY users.id "
                    "ORDER BY comment_count DESC")
        res = db.engine.execute(stmt)
        response = []
        for row in res:
            response.append({"username": row[0], "stats": row[1]})
        return response

    @classmethod
    def find_comments_by_post_id(cls, post_id):
        return cls.query.filter_by(post_id=post_id)

    @classmethod
    def find_comments_by_comment_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
