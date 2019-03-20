"""Re-export Controllers."""
from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='')

from application.controllers import posts
