from application import db, app, bcrypt
import jwt
import datetime


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

    def encode_auth_token(self):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': {
                    'email': self.email,
                    'name': self.username
                }
            }
            return jwt.encode(
                payload,
                app.config.get('JWT_SECRET'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get('JWT_SECRET'))
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
