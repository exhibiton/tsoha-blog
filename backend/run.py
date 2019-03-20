from application import app


@app.route("/")
def hello():
    return "Welcome to TSOHA API!"


if __name__ == "__main__":
    app.run()
