"""Global project configuration."""
import os
from application import db

class Config(object):
    """Generic configuration class for default options."""

    CORS_ALLOW_ORIGIN = '*'
    CORS_ALLOW_METHODS = '*'
    CORS_ALLOW_HEADERS = '*'


class ProductionConfig(Config):
    """Production specific configuration."""

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")

class DevelopmentConfig(Config):
    """Development specific configuration."""

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tsoha-database.db"
    app.config["SQLALCHEMY_ECHO"] = True


configs = {
    'production': ProductionConfig,
    'development': DevelopmentConfig,
}
