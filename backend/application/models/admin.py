from application import db, bcrypt


class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    comments = db.relationship('Post', backref="admin", lazy=False)

    def __init__(self, email, password, username):
        self.email = email
        self.username = username
        self.password = bcrypt.generate_password_hash(password)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_admin_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

