
# Airline Reservation System  

B Airways is a subsidiary of Virgin Airlines but functions independently. It currently caters only 
to the needs of small distance, internal flights in Indonesia. Hence, they do not possess access 
to the advance airline reservation system of Virgin. With the recent gain of popularity, the 
director board of B Airways has decided to expand the airline to cover multiple destinations 
worldwide. For this process, B purchased several, refurbished aircrafts to be used in the newer 
routes. Among those are 3 of Boeing 737, 4 of 757, and single Airbus A380. Each model has 
a varying seating capacity that is consistent among the model. As the first stage of expansion, 
B would fly on routes covering CGK and DPS (Indonesia), BIA and HRI (Sri Lanka), DEL, 
BOM, MAA (India), BKK and DMK (Thailand), SIN (Singapore). Multiple flights will be created 
covering these destinations. 

In B systems, a flight has a designated origin and a destination. For an example BIA → BKK 
is considered as one flight. It is also referred to as a route, yet currently B does not offer transit 
/ transfer flights. Hence only two locations are related to a given flight, B would pre-define a 
flight schedule for each flight every day. Each scheduled flight would have the corresponding 
flight details and an assigned airplane. Two airplanes cannot be assigned to the same flight 
schedule at the same time. Flight schedule is static in general. Only exception being the flight 
delays, in which the schedule is updated to reflect the delay. When a passenger need to book 
a flight, he or she should first login to their online platform. Passenger could either continue as 
a guest of register with the platform. Registered users are categorized as Frequent and Gold 
depending on the number of times they have booked with B. They would get 5% and 9% 
discounts off the final ticket prices respectively. The platform will first show the user with the 
flight schedule for each day, where the user could select a flight. Once selected, user is 
prompted with a seat selection. No two users can select the same seat and B does not 
overbook the seats as other airlines. Once a seat is selected, a booking is created. The 
booking is considered completed after payments. Payments will not be handled by the system. 
A ticket is allocated when the booking is completed. The prices may vary depending on the 
traveler class (Economy, Business or Platinum).  

## Features

- Flight Booking
- Exclusive Loyalty Offers
- Fullscreen mode



![Logo](b-airlines-frontend/public/images/B-Airways.png)


## Screenshots

![App Screenshot](b-airlines-frontend/public/images/bairwayshome.jpeg)

## Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/De-Silva-Madhushankha/Airline-Reservation-System.git
   ```

2. **Install dependencies**
   
   Run the following command in following 4 directories to install the necessary dependencies:

   First navigate to the root directory `Airline Reservation System` and then run
   ```bash
   npm install
   ```
   Change the directories and install required dependencies.
  
   ```bash
   cd .\b-airlines-backend\
   npm install
   ```
   
   ```bash
   cd ..
   cd .\b-airlines-admin\  
   npm install
   ```
   
   ```bash
   cd ..
   cd .\b-airlines-frontend\  
   npm install
   ```


2. **Navigate to the backend directory**

   ```bash
   cd ..
   cd .\b-airlines-backend\
   ```

4. **Set up the environment file**

   Create a `.env` file in the `b-airlines-backend` directory with the following content:

   ```bash
   MYSQL_HOST='127.0.0.1'
   MYSQL_USER='root'
   MYSQL_PORT='3306'
   MYSQL_PASSWORD='your_password'
   MYSQL_DATABASE='bairways'
   PORT=3001
   SECRET_KEY='talkischeapshowmethecode'
   TZ='Asia/Colombo'
   ```

   Replace `your_password` with your actual MySQL password.

5. **Run the SQL script**

   Run the following command in `database` directory in the `b-airlines-backend` to create the database:

   ```bash
   cd .\database\
   mysql -u root -p
   ```
   Enter your MySQL password when prompted.

   ```bash
   source make
   ```

7. **Run the application**

   To start the application navigate to the root directory `Airline Reservation System`, run the following comman:

   ```bash
   npm start
   ```

   This command will concurrently start the back-end server, front-end and admin-end.
   The server will start on the port `3000` defined in the `server.js` file. Make sure the port is `3000`.
   The frontend will start on the port `3001`.
   The adminend will start on the port `5174`


## Project Structure

```
.
├── b-airlines-backend/ - Express server that provides API routes and serves front-end
│ ├── routes/ - API routes
│ ├── model/ - Handles the query logics connecting the database
│ ├── controller/ - Handles API calls for routes
│ ├── middleware/ - Adds middleware to the express server
│ └── server.js - Configures Port and HTTP Server
├── b-airlines-admin/
├── b-airlines-frontend/  - React front-end
│ ├── src
│ | ├── components - React components for each page
| | ├── pages -  each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
└── README.md
```

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/

- Bootstrap CSS - https://getbootstrap.com/
- Express - https://expressjs.com/

## Appendix

Any additional information goes here


## Feedback

If you have any feedback, please reach out to us at bawantha.22@cse.mrt.ac.lk

## Team Members (Group 23)
DE SILVA S.M.B.M.   220102L    desilvasmbm.22@uom.lk
DE SILVA D.L.P.H.   220099F    desilvadlph.22@uom.lk
SANJULA N.G.K.      220578A    sanjulangk.22@uom.lk
SHALIKA T.K.T.      220604D    shalikatkt.22@uom.lk
VITHURSANAA.N.      220671D    vithursanaan.22@uom.lk

## License

[MIT](https://choosealicense.com/licenses/mit/)
