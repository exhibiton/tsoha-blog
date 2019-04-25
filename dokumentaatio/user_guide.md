# User Guide

To run the project, navigate to [http://localhost:3000](http://localhost:3000) with the help of [local installation](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/installation_guide.md) or use the [online demo](https://tsoha-react-app.exhibiton.now.sh)

## User Credentials for Demo Site

Admin secret login address: [https://tsoha-react-app.exhibiton.now.sh/admin/sign_in](https://tsoha-react-app.exhibiton.now.sh/admin/sign_in)

Login: `test@test.com`

Password: `12345678`

User login address: [https://tsoha-react-app.exhibiton.now.sh/sign_in](https://tsoha-react-app.exhibiton.now.sh/sign_in)

Email: `user@user.com`

Password: `12345678`

## Application description

The blog is currently meant for 1 person to write posts, and the world to read them. It is not like Medium, a blogging platform for multiple blogs, even though the application could support that in terms of infrastructure. 

#### Admins

- To create blog posts, you login with the [Secret Admin Login](https://tsoha-react-app.exhibiton.now.sh/admin/sign_in) and click `Add Post` from top navigation header.
- Admin can also edit posts, by opening a post and clicking `Edit Post`.
- Admins can also delete posts by opening `Edit Post` and clicking Delete Post. *There is no confirm prompt*
- Admins can read posts, but cannot add comments.

#### Users
Users can sign in and sign up, read and comment posts.
- To sign in you go to `Sign In` from top navigation header. You need to have an account to do this. Either use the given demo credentials, or sign up first.
- To sign up, you go to `Sign Up` in top navigation header and sign up with an email and a password.
- To create a comment, open a post that you want to comment. Scroll down and write your comment and submit it.
- To edit a comment, go to a post where you have commented. Click edit comment, edit it and save the results.
- To delete a comment, go to a post where you have commented. Click delete comment. *There is no confirm prompt*