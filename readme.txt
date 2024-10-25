Setup Project: 

FROM UDACITY WORKSPACE INSTRUCTIONS (this is how I set my project up, according to these instructions):

Setup and package installation :
in a terminal tab, create and run the database:

switch to the postgres user: su postgres
start psql: psql postgres
in psql run the following:
CREATE USER full_stack_user WITH PASSWORD 'password123';
CREATE DATABASE full_stack_dev;
\c full_stack_dev
GRANT ALL PRIVILEGES ON DATABASE full_stack_dev TO full_stack_user;
to test that it is working run \dt and it should output "No relations found."
In the 2nd terminal:

Migrations to set up the database tables from the last section are included in this exercise. To run them, follow the instructions below:
install yarn: npm install yarn -g
install db-migrate on the machine for terminal commands: npm install db-migrate -g
check node version: node -v - it needs to be 10 or 12 level
IF node was not 10 or 12 level, run
npm install -g n
n 10.18.0
PATH="$PATH"
node -v to check that the version is 10 or 12
install all project dependencies: yarn
to run the migrations ``
to test that it is working, run yarn watch should show an app starting on 0.0.0.0:3000

Note: On my mac because of my company's configuration settings, I was not able to switch users to my local user. I wrote the project using
my local user eruth, and have replaced it with the user 


Looking forward to your feedback and corrections. 