from application import db
import copy

class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
                              onupdate=db.func.current_timestamp())
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text)
    comments = db.relationship('Comment', backref="post", lazy=False)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))

    def __init__(self, title, content, admin_id):
        self.title = title
        self.content = content
        self.admin_id = admin_id

    def __getitem__(self, idx):
        p = copy.copy(self)
        p.title = p.title.split("`")[idx]
        return p

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_post_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
