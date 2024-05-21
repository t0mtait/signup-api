# signup-api

### How does someone run this program?
- Pull the code from this repository
- cd into the signup-api directory on your machine within the terminal
- install all dependencies
- run the 'node app' command within the terminal
- go to localhost:3000 in a browser (or localhost:3000/users to bypass registration and view registered users)
- this API can also be used via postman with proper endpoint and body data.
  
### What purpose does your program serve?
it is a simple online user registration system, you can register users and view registered users.
this system can be implemented in various ways, but is most often used to block content / other aspects of applications from un-registered users.

### Sample input/output?
there isn't much i/o for this app other than the form users use to register. If you type an invalid email format such as 'xyz123' into the email field, you will
not be able to register. if you leave any form elements blank, you will not be able to register. if you put in a username or email that is already taken by another user, an error message will display in the console and the webpage will essentially crash (will freeze on loading redirect)

Otherwise, your input will be valid, your info will be stored in a dynamo database, and you will be shown in the list of all other registered users found at /users.
