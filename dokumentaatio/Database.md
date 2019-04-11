# Database documentation

The database consists of 4 basic tables. 

## 1. Admin table
In this project, we will only have 1 Admin, with a fixed account and no registration. This will basically be a 1-man blog website, not capable of supporting multiple admin accounts. This would be a small upgrade to the system, but now is outside of the scope of this project.

An admin has their own login page, and dashboard area. Via this dashboard they can create Posts.
## 2. User table
Users can sign up and sign in. Users can create comments to posts they read.
## 3. Post table
Posts are created by admins and are "blog-entries". They have comments
## 4. Comment table
Comments are posted on each Post by signed-in users.

#### UML code

```
[Post | id: int | content: string | title: string | (fk) admin_id: int]
[User | id: int | email: string | password: string | name: string | avatar_uri: string ]
[Comment | id: int | content: string | (fk) user_id: int | (fk) post_id: int]
[Admin | id: int | email: string | password: string | name: string | avatar_uri: string ]

[Admin]1 - *[Post]
[User]1 - *[Comment]
[Post]1 - *[Comment]
```

#### UML Diagram

![Database](https://github.com/exhibiton/tsoha-blog/blob/master/dokumentaatio/db_uml.png)
