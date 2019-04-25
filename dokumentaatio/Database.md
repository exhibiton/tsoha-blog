# Database documentation

The database consists of 4 tables. The local database uses sqlite3 and the Heroku deployment uses PostgreSQL.

## 1. Admin table
In this project, we will only have 1 Admin, with a fixed account and no registration. This will basically be a 1-man blog website, not capable of supporting multiple admin accounts. This would be a small upgrade to the system, but now is outside of the scope of this project.

An admin has their own login page.
## 2. User table
Users can sign up and sign in. Users can create comments to posts they read.
## 3. Post table
Posts are created by admins and are "blog-entries". They have comments.
## 4. Comment table
Comments are posted on each Post by signed-in users only, not by admins.

#### UML code

```
[Post | id: int | content: string | title: string | date_created: DateTime | date_modified: DateTime |(fk) admin_id: int]
[User | id: int | email: string | password: string | username: string]
[Comment | id: int | content: string | date_created: DateTime | date_modified: DateTime |  (fk) user_id: int | (fk) post_id: int]
[Admin | id: int | email: string | password: string | username: string ]

[Admin]1 - *[Post]
[User]1 - *[Comment]
[Post]1 - *[Comment]
```

#### UML Diagram

![Database](https://github.com/exhibiton/tsoha-blog/blob/master/dokumentaatio/db_uml.png)

## Database Create SQL

These are the SQL-create commands used to create this database. The project uses `flask-migrate` to manage migrations, but these are the manual ones that could mimic the functionality in the project, which is here to help onboarding of reviewers.

```sql
CREATE TABLE admins (
	id INTEGER NOT NULL,
	email VARCHAR(120) NOT NULL,
	username VARCHAR(120) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (email),
	UNIQUE (username)
);
CREATE TABLE users (
	id INTEGER NOT NULL,
	email VARCHAR(120) NOT NULL,
	username VARCHAR(120) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	UNIQUE (email),
	UNIQUE (username)
);
CREATE TABLE posts (
	id INTEGER NOT NULL,
	date_created DATETIME,
	date_modified DATETIME,
	title TEXT NOT NULL,
	content TEXT,
	admin_id INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY(admin_id) REFERENCES admins (id)
);
CREATE TABLE comments (
	id INTEGER NOT NULL,
	date_created DATETIME,
	date_modified DATETIME,
	content TEXT,
	post_id INTEGER,
	user_id INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY(post_id) REFERENCES posts (id),
	FOREIGN KEY(user_id) REFERENCES users (id)
);
```