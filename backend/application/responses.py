"""Module containing all possible responses for this API."""
from flask import jsonify


def ok(data=None):
    """Response for HTTP `OK`."""
    return jsonify(data), 200


def created(data=None):
    """Response for HTTP `CREATED`."""
    return jsonify(data), 201


def no_content():
    """Response for HTTP `NO CONTENT`."""
    return None, 204


def bad_request(message="Bad Request"):
    """Response for HTTP `BAD REQUEST`."""
    return jsonify({"message": message}), 400


def unauthorized(message="Unauthorized"):
    """Response for HTTP `UNAUTHORIZED`."""
    return jsonify({"message": message}), 401


def forbidden(message="Forbidden"):
    """Response for HTTP `FORBIDDEN`."""
    return jsonify({"message": message}), 403


def not_found(message="Not Found"):
    """Response for HTTP `NOT FOUND`."""
    return jsonify({"message": message}), 404


def unprocessable_entity(message="Unprocessable Entity"):
    """Response for HTTP `UNPROCESSABLE ENTITY`."""
    return jsonify({"message": message}), 422


def internal_server_error(message="Internal Server Error"):
    """Response for HTTP `INTERNAL_SERVER_ERROR`."""
    return jsonify({"message": message}), 500
