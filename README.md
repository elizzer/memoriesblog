# memoriesblog
this is made to be a blog, with basic CRUD(Create Read Update Delete) opreations.

it is made up of MERN stack technology(Mongodb, Express, Reactjs, Nodejs)


to get started with this application

clone it from git and get into the server and the client foldres and install all the deendencies with npm install

after installing the dependencies start the mongodb server
start the nodejs server which should be running on port 5001
start the react development serve ( it should open the react app up in the browser)

once all the servers are up and running, you are ready to go.

once the react app is ready, you would be given with no posts

to create a post, get into the route {http://localhost:3000/create}

as only the admin should be able to create a post, if you are not logged in as admin you would be redereted to a admin login page.

if you are logging in for the first time, there would be no admins data in the database.

so just submitting a garbage form would create a admin data in the database

after that your admin login credentials is 'admin','admin', untill you manually change the credentials in the database.

