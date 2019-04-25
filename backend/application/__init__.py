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

GDAL_LIBRARY_PATH = os.environ.get('GDAL_LIBRARY_PATH')
GEOS_LIBRARY_PATH = os.environ.get('GEOS_LIBRARY_PATH')

if os.environ.get("HEROKU"):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tsoha-database.db"
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
