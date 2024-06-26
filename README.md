## INTRODUCING AFROLIVE: _Your Ultimate Connection to African Culture in the Diaspora!_

> Discover the vibrant world of AfroLive, the web app that unites Africans in the diaspora through electrifying events and unforgettable experiences. Whether you're in New York, DC, or the surrounding areas, AfroLive brings you closer to the heart of Afrobeats and African culture.

> Stay in the loop with exclusive listings of the hottest events featuring the biggest names in Afrobeats. From pulse-pounding concerts to intimate gatherings, AfroLive lets you purchase tickets and secure your spot at the most sought-after events.

> Join a thriving community of fans who share your passion for African music, culture, and connection. With AfroLive, every event is an opportunity to celebrate, connect, and create lasting memories. Don't miss out—experience the rhythm of AfroLive today!


## LIVE SITE
[Afrolive](https://afrolive.onrender.com)

## DATABASE SCHEMA
![database schema](https://res.cloudinary.com/dv9oyy79u/image/upload/v1717005140/Untitled_5_rprsde.png)

## Run AfroLive Locally

**Prerequisites**
- NPM
- A version of Node.js >= 14 on your local machine
- Python 3.9
- PostgreSQL or SQLite3 in dev environment
- AWS S3 bucket


**Installation**
- Clone the repo
- Install dependencies ```pipenv install -r requirements.txt```
- `cd react-app` and run `npm install`
- Create a **.env** file based on the example with proper settings for your development environment
- Setup a PostgreSQL database, user, and password, making sure they match the **.env** file.
- Migrate and seed the database, then run the app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   python run.py



### AWS Setup Instructions

> **Create an S3 Bucket**
   - Go to the [S3 Management Console](https://s3.console.aws.amazon.com/s3/home?region=us-east-1).
   - Create a new bucket.

> **Create an IAM User with Programmatic Access**
   - Navigate to the [IAM Management Console](https://console.aws.amazon.com/iam/home?#/users).
   - Create a new user with Programmatic access.

> **Set Up a Security Policy for Your User**
   - In the IAM console, go to 'Attach existing policies directly' and click 'Create Policy'.
   - Click the JSON tab and set the policy as needed.

> **Update Your `.env` File**
   - Add the following entries to your `.env` file with the appropriate values:
     ```sh
     S3_BUCKET=<your-s3-bucket-name>
     S3_KEY=<your-aws-access-key-id>
     S3_SECRET=<your-aws-secret-access-key>
     ```

> **Fire Up Your Servers**
   - In the project root directory, run:
     ```sh
     python run.py
     ```
   - In the `react-app` directory, run:
     ```sh
     npm run dev
     ```
   - Ctrl/Command click the ```localhost:XXXX``` link in the Vite server to open the live link!


## FEATURES
## Payment Methods

- Create: Users can add new payment methods.
- Read: Users can view their saved payment methods.
- Update: Users can update payment details.
- Delete: Users can remove payment methods.
***
## Event Listings

- Create: Users can create(organize) new event listings with details like date, time, venue, and performers.
- Read: Users can browse and view event details.
- Update: Users can update event information.
- Delete: Users can delete or cancel events.
> Event categories include concerts, festivals, live performances and album release parties
***

## Favorites/Bookmarks
- Create: Users can add events to their favorites or bookmarks.
- Read: Users can view their list of favorite or bookmarked events.
- Update: Users can update their list of favorites/bookmarks.
- Delete: Users can remove events from their favorites/bookmarks.


***
## Notifications
- Create: Users can set up notifications for upcoming events, ticket sales, and other updates.
- Read: Users can view their notification settings and history.
- Update: Users can update their notification preferences.
- Delete: Users can delete or turn off specific notifications.
***

## Cart
- Create: Users can add tickets to their cart for future purchase.
- Read: Users can view the contents of their cart, including the events and ticket quantities.
- Update: Users can update the quantity of tickets in their cart or remove items.
- Delete: Users can empty their cart or remove specific items before purchasing.


> ### Bonus Feature
>  ### Nearby Hotels
> - Create: Users can search for hotels in nearby areas to concerts using the Google Maps API.
> - Read: Users can view a list of hotels near the concert venue along with details such as distance, rating, and price.
> - Update: Users can refine their search criteria or update the hotel list based on new inputs.
> - Delete: Users can clear the search results or remove specific hotels from their list.


## STACK

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=flat&logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
