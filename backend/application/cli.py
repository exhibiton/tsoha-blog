"""This module extends the `flask` command with various `click` subcommands."""

import click
import urllib.parse
from flask import url_for
from sqlalchemy_utils.functions import database_exists, create_database, drop_database
from application import db
from application.models import Post

def register_cli(app):
    """Register a few CLI functions."""

    @app.cli.command()
    def initdb():
        """Initialize the database.
        This will drop and recreate the actual database if it already exists.
        The database name from the `SQLALCHEMY_DATABASE_URI` environment
        variable is used for this.
        """
        # If there is an existing DB, make sure to drop it and start completely fresh.
        db_url = db.engine.url
        if database_exists(db_url):
            drop_database(db_url)
        create_database(db_url)

        db.create_all()

        post = Post("Cool blog post title", "Content is even cooler within the blog post itself!")
        db.session.add(post)
        db.session.commit()