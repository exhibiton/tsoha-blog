import os
import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////Users/jesseheikkila/Projects/tsoha/backend/tsoha-database.db"
app.config["SQLALCHEMY_ECHO"] = True
app.config["JWT_SECRET"] = os.environ.get('JWT_SECRET', default="very-secret-key")
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY', default="very-secret-key")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from application.controllers import api
app.register_blueprint(api)
db.create_all()
