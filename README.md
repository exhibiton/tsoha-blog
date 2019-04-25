# Softium Blog

This is a blog application for TSOHA-course at University of Helsinki. Admin's can create posts and readers can read them, sign up and comment on them. Very basic, medium-like in design and functionality.

## Application Structure

The application backend is implemented as a JSON REST API with Flask. The backend is deployed to Heroku at [https://tsoha.herokuapp.com](https://tsoha.herokuapp.com).

The application's frontend is implemented in a CRA-based Typescript application with React and Redux. The project structure is mainly fractal, but due to the time restrictions of this project and the lack of focus on the frontend from the course requirements, it has some shortcomings and shortcuts that were taken to save time for the course. The frontend is deployed at [https://tsoha-react-app.exhibiton.now.sh](https://tsoha-react-app.exhibiton.now.sh).

Application styling uses vanilla CSS combined with Flexbox for layouting with some Viewport-width adjusting.

Working [demo](https://tsoha-react-app.exhibiton.now.sh) of the deployed application.

### User Credentials

Admin secret login address: [https://tsoha-react-app.exhibiton.now.sh/admin/sign_in](https://tsoha-react-app.exhibiton.now.sh/admin/sign_in)

Login: `test@test.com`

Password: `12345678`

User login address: [https://tsoha-react-app.exhibiton.now.sh/sign_in](https://tsoha-react-app.exhibiton.now.sh/sign_in)

Email: `user@user.com`

Password: `12345678`

## Documentation

- [Use guide](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/user_guide.md)
- [Retrictions and missing features](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/restrictions.md)
- [Installation guide](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/installation_guide.md)
- [Database structure](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/Database.md)
- [Use cases & SQL-queries](https://github.com/exhibiton/tsoha-blog/tree/master/dokumentaatio/use_cases.md)
