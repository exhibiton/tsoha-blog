# Use cases & SQL-queries

This page lays out different use cases for the application and their SQL-queries that the application is using.

## Aggregate query

There is a controller-function for admins that is `comment_stats()`. This function returns the users who have commented the most and the amount of comments they have done in a descending order.

```
def find_most_commenting_users():
    stmt = text("SELECT users.username,"
                " COUNT(comments.id) as comment_count"
                " FROM Users"
                " JOIN comments ON comments.user_id = users.id "
                "GROUP BY users.id "
                "ORDER BY comment_count DESC")
    res = db.engine.execute(stmt)
    response = []
    for row in res:
        response.append({"username": row[0], "stats": row[1]})
    return response
```

```sql
SELECT
  users.username,
  COUNT(comments.id) as comment_count
FROM
  Users
  JOIN comments ON comments.user_id = users.id
GROUP BY
  users.id
ORDER BY
  comment_count DESC;
```

## Models:

### Admin:
```python
    def find_admin_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
```

This function finds admins by email.

```sql
SELECT * From Admins WHERE Email=email;
```

And `first()` is a simple `slice(0,1)` function by SQLAlchemy. 

### User:
```python
    def find_user_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
```

This function finds user by email.

```sql
SELECT * From User WHERE Email=email;
```

And `first()` is a simple `slice(0,1)` function by SQLAlchemy.

### Comment:

```python
    def find_comments_by_post_id(cls, post_id):
        return cls.query.filter_by(post_id=post_id)
```

This function finds all comments by `post_id`, so which were commented on a certain post.

```sql
SELECT * FROM Comment WHERE post_id=post_id;
```

```python
    def find_comments_by_comment_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
```

This function finds a comment by it's own comment id.

```sql
SELECT * FROM comments WHERE id=id;
```

### Post:

```python
    def find_post_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
```

This function finds a post by it's id.

```sql
SELECT * FROM posts WHERE id=id;
```

## Controllers

### Admin:

Admin controller does not run many SQL-queries. It uses `find_admin_by_email` to find admins in `authenticate`-function and `bcrypt` for password hashing. Upon signing in, we create a JWT-token and return it in a JSON-object with a status and a messages so a notification system like toastr could inform the user (frontend could create a Type for StatusMessages to render these). There is no create admin route, only sign in. 

### User:

User sign in uses `find_user_by_email` for sign_in method and Upon signing in, we create a JWT-token and return it in a JSON-object with a status and a message.

Sign Up function uses `find_user_by_email` to first find the user's email and we check if the user already exists. If it doesn't exist, we proceed to create the account with:

```python
user = User(
    email=email,
    password=password,
    username=email
)

db.session.add(user)
db.session.commit()
```

Don't worry, [model-init function](https://github.com/exhibiton/tsoha-blog/blob/master/backend/application/models/user.py#L15) takes care of hashing the passwords, they are not saved as plain-text.

And these insert and save the user into the database

```sql
INSERT INTO Users (email, password, email) VALUES (?, ?, ?);
```

### Comment:

#### Read all

Comment has full CRUD-functionality, so a create-function, a read-function, an update-function and a delete-function.

Index finds all Comments and renders them as json with 
```python
comments = Comment.query.all()
```

```sql
SELECT * FROM Comments;
```

#### Read one

Read-function first checks that user request has a JWT, so there has to be a `Authorization`-header with a Bearer-token that can be decoded. Then we check the identity with `current_user = get_jwt_identity()` which is a helper function from `flask_jwt_extended` that simply decodes the jwt-token using `PyJWT`. This path requires authentication because it is only used for Edit-comment page.

We then find the comment using the id with 
```python
comment = Comment.find_comments_by_comment_id(pk)
```

which was described above earlier. We then return this response object as a JSON to the user.

#### Create

Create function first checks users identity to see that they are logged in. We need the user's id for the comment to be created.

```python
user = User.find_user_by_email(current_user['email'])
```

```sql
SELECT * From User WHERE email=email
```

We then parse the JSON data and create the comment and save it to the database, and render it back to the user in a JSON response, so it can be updated to the Redux-store and shown to user without a re-render.

```python    
comment = Comment(
    content=content,
    post_id=post_id,
    user_id=user.id
)

db.session.add(comment)
db.session.commit()
```

```sql
INSERT INTO Comments (content, post_id, user_id) VALUES (?, ?, ?);
```

#### Update

Update function finds the comment with the same `find_comments_by_comment_id`-function after checking that the user is the correct user with 
```python
comment.user_id == current_user['id']
```

and then we update the comment, if there is data sent from the frontend with

```python
data = json.loads(request.data)
if data['content']:
    content = data['content']
    comment.content = content
db.session.commit()
comment_schema = CommentSchema()
comment_result = comment_schema.dump(comment)
```

which translates to SQL of

```sql
UPDATE comments SET content=content WHERE id=id;
```

We also check in update and delete that the user is the user who posted the comment originally with
```python
if comment.user_id == current_user['id']:
```

#### Delete

Delete function simply checks if the comment can be found the same as read and update: 
```python
comment = Comment.find_comments_by_comment_id(pk)
```

and the checks if the user trying to delete it, is the user who psoted it with
```python
if comment.user_id == current_user['id']:
```

and then we delete it by running
```python
db.session.delete(comment)
db.session.commit()
```

and returning the json object that it was successfully deleted.

```sql
DELETE FROM comments WHERE id=id;
```

The user check is not done at SQL-level as it is not natural for Python and SQLAlchemy, but it could be done there as well.

### Post:

Posts have a full CRUD-functionality as well.

#### Read many
The index function finds all posts and returns them in a reverse order by id, which is auto incrementing so in a reverse order from creation.

```python
posts = Post.query.all()
sorted_posts = sorted(posts, key=lambda post:post.id, reverse=True)
```

```sql
SELECT * FROM Posts ORDER BY ID DESC;
```

Posts READ simply finds the post by it's id and returns it in JSON with no additional checks.

```python
post = Post.find_post_by_id(pk)
```

```sql
SELECT * FROM Posts WHERE id=pk
```

#### Read one

Posts `get(pk)` function simply finds the post by it's Id (and selects it with slice(0,1) in python) and returns it to the frontend in a JSON response with¨

```python
post = Post.find_post_by_id(pk)
```

```sql
SELECT * FROM Post WHERE id=pk;
```

#### Create

First we find the Admin class-instance by parsing the JWT with
```python
current_admin = get_jwt_identity()
```

and then use this data to find the admin from the database and slice the result with python to select the first result only:
```python
admin = Admin.find_admin_by_email(current_admin['email'])
```

```sql
SELECT * FROM Admin WHERE email=email;
```

We then create the Post model and save it to the database and return the post to the user in a JSON response

```python
post = Post(
    title=title,
    content=content,
    admin_id=admin.id
)

db.session.add(post)
db.session.commit()
```

```sql
INSERT INTO Posts (title, content, admin_id) VALUES (?, ?, ?);
```

#### Update:

First we need to find the post by it's id with and SQLAlchemy `first()` slices us the first result, which could be done in SQL as well
```python
post = Post.find_post_by_id(pk)
```

Example with limit, even though we use SQLAlchemy's `first()`-function.

```sql
SELECT * FROM Posts WHERE id=pk LIMIT 1;
```

We then check that the admin of the post is correct and that the request has data to update. We then save that information to the database and give the updated post as a JSON response to the user.

```python
post = Post.find_post_by_id(pk)
if post:
    if post.admin_id == current_admin['id']:
        data = json.loads(request.data)
        if data['title']:
            title = data['title']
            post.title = title
        if data['content']:
            content = data['content']
            post.content = content
        db.session.commit()

        post_schema = PostSchema()
        post_result = post_schema.dump(post)
```

```sql
UPDATE Posts SET title=title, content=content WHERE id=pk;
```

#### Delete:

First we need to find the post by it's id with and SQLAlchemy `first()` slices us the first result, which could be done in SQL as well
```python
post = Post.find_post_by_id(pk)
```

Example with limit, even though we use SQLAlchemy's `first()`-function.

```sql
SELECT * FROM Posts WHERE id=pk LIMIT 1;
```

We then check that the admin of the post is correct so no one else deletes other's blog posts. We then proceed to delete it from the database and render a response success message to the user in JSON.

```python
current_admin = get_jwt_identity()
post = Post.find_post_by_id(pk)
if post:
    if post.admin_id == current_admin['id']:
        db.session.delete(post)
        db.session.commit()
```


```sql
DELETE FROM posts WHERE id=id;
```
