# Restrictions and Missing Features

As this is a school course, not all of the wanted features have been implemented. This project is not an exception. These are some small restrictions and possible future development ideas that the project could do to improve.

## Restrictions

These are the restrictions the applicatoin

- Currently, the application has no sign up for admins. I did not come up with a way to decide how Admins should be allowed to Sign Up, since they are the ones allowed to create blog posts. However the whole application is built with support to multiple admins (each post checks if the correct admin is editing or deleting it etc.), and could support multiple right now.
- The application does not have support for WYSIWYG text editing. Paragraph spacing, typography editing, etc is not available but would be an easy addition with DraftJS from Facebook.
- The application does not support uploading images. Currently all of the project images are randomly picked and I did not create an upload feature. This was due to time restrictions and little to do with databases which was the focus of the course. This would be an easy addition though.
- Admins cannot add comments to any Posts. Comments require an `user_id` at this point, and do not support admins to add comments. This has been blocked in frontend as well.
  
## Missing Features

- Categories. The application could add categories for different type of blog posts
- Admin-based Blog pages. Each admin would have their own blog, like Medium. Currently it is a "1-man show", where only 1 admin posts content for all of us, as if they were a blogger, instead of the application being a blogging platform.
- Remove twitchy funtionality from `redux-form` that is causing the page to scroll to top when submitting a new comment
- Allow users and admins to edit their emails and passwords