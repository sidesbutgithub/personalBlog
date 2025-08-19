# personalBlog
A backend api written with ExpressJS for a blog with posts stored in a MongoDB database, including https verification for users using Express Sessions and PassportJS
## Prerequisites
1. NodeJS and Node Package Manager (npm) for running and installation
2. A Mongo DB database for storing blog posts and session info
3. (Optional) git for cloning project repo
## Set-Up
### Installation
Clone the repo with `git clone github.com/sidesbutgithub/personalBlog.git` and cd into the directory with `cd personalBlog`  
Install dependancies with `npm install` and build the application with `npm run build`
```
git clone github.com/sidesbutgithub/personalBlog.git
cd personalBlog
npm install
npm run build
```
### .env file
Create a file named `.env` containing the port you want the API to listen on, your secret string for session management and your MongoDB database URI as an environment variable for the project
```
PORT = <your desired port number>
MDB_URI = <your MongoDB database URI>
secret = <a secret string to be used in session management>
```
## Usage
In the root directory of the project, run `node .` to start the API  
You should see `listening on port <PORT>` in your command line

## Routes
### GET
```
/api/blog
```
Gets all blogs to be viewed, regardless of if the session is authenticated
```
/api/blog/<id>
```
Gets blog with id of `<id>`, regardless of if the session is authenticated
```
/login
```
Logs in the current session with the credentials provided in the request body if it matches any regiestered user in the database
```
/register
```
Registers a new user into the database with the credentials provided in the request body if a record with the username does not currently exist
```
/logout
```
Logs out the current session, making it no longer authenticated
### POST
```
/api/blog
```
Creates a blog post using the body data of the request, only if the session is authenticated
### PATCH
```
/api/blog/<id>
```
Updates the blog with id of `<id>` using the body data of the request, only if the session is authenticated and the session user is the same as the blog's original poster
### DELETE
```
/api/blog/<id>
```
Deletes the blog with id of `<id>`, only if the session is authenticate and the session user is the same as the blog's original poster

## Models
### Blog Posts
Request bodies for creating and updating blog posts should be formatted as shown here
```
{
    "title":"<blog post title>",

    "content": "<content of post>",

    "tags":["post tag1", "post tag2",....]
}
```
### Authentication
Request bodies for authentication related calls (login & register) should be formated as
```
{
    "username":"<username of user to be logged in or registered>",
    "password":"<password of user to be logged in or registered>"
}
```
