from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tsoha-database.db"
app.config["SQLALCHEMY_ECHO"] = True

db = SQLAlchemy(app)
db.create_all()

from application.controllers import api
app.register_blueprint(api)
