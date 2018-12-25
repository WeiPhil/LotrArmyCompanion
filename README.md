# Lord of the Ring: A companion App for your army

![alt text](https://raw.githubusercontent.com/WeiPhil/LotrArmyCompanion/master/src/assets/images/tempCardBackground1.jpg)

## THIS PROJECT IS A WORK IN PROGRESS
It should not be run in production.

## Build

Build the frontend react app:
> npm install  
> npm run build  

Build the backend:
> docker-compose build

## Run
> docker-compose up

Visit localhost:3000 to see the website.

## Ongoing Work and Todos

> Todo Philippe

- `[x]` Make a todo list as suggested by Gregoire
- `[x]` Add elements to each company card (equipment,totalcost,experience, etc..)
- `[x]` Add a some more sample elements to the database to work on
- `[x]` Create a nice presentation of the company overview including stats, totalGold, effective and total cost, a way to add personal notes (+ linking to database)
- `[x]` Add wiki submenus for all the equipments, special powers, etc..
- `[x]` You can now have an account and login on your personal companies!
- `[x]` Add a menu item to go in a fight!
- `[x]` add a register form and unsecure user account system (just for testing)
- `[ ]` Add a simple way to buy new troops if gold allows it in Buy Troops menu
- `[ ]` a way to add personal notes (+ post to database) and calculate total and effective cost automatically
- `[x]` change forms to handle enter key press (more natural behaviour)
- `[ ]` use more carefull types in code, transform var's in let's
- `[x]` add a develepoment port and link it to the package.json scripts to run locally
- `[ ]` change color of bonuses
- `[ ]` Add a "typing..." feature to the chat
- `[ ]` Find a way to save messages from chats on server
- `[ ]` add private messaging over peer2peer

> Todo Pierre

- `[ ]` get rid of current database and upgrade it to MariaDB
- `[ ]` Remove static IP's and use dynamic ones instead
- `[ ]` Add continuous integration.
- `[ ]` Use docker secrets for database credentials

> Todo All

- `[ ]` Token expiration management (currently no expiration)
