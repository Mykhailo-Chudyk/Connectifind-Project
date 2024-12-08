# ConnectiFind


## Overview
It's a platform that allows users to find and join events with like-minded people. 

## Features
- Users can create events and invite other users to join them.
- Users can join public events and see other participants.
- Users can chat with other participants in the event.
- Users can post to the event's feed.
- Users can see all events in the area.


## Installation
- Clone the repository
- Navigate to the frontend directory
- Run `npm install` to install the dependencies
- Run `npm run build` to build the project
- Run `npm run start` to start the development server
- Navigate to the backend directory
- Create virtual environment using `python -m venv .venv`
- Activate virtual environment using `source .venv/bin/activate`
- Install dependencies using `pip install -r requirements.txt`
- Create `.env` file and add the following:
```
DB_NAME=name_of_your_database
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```
- Run `python manage.py migrate` to create the database tables
- Run `python manage.py runserver` to start the development server  