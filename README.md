# Capstone Fall 2022 - Spring 2023 (Front End)

#### Creators: Johnathyn Strong and Nickolas Wofford

#### Description: This is the front end of our capstone project that aims to take a set of Bitcoin transactions and visualize the transactions in a easy to use web app.

---

## Details

The goal of this app is to visualize transactions from the Eliptic dataset. Since the Eliptic dataset consists of over 200k transactions we decided to create many subset of the data. We did this by splitting the dataset into time steps and then cutting the timesteps down to 1,000 transactions per. 1,000 transactions per time step gave the best amount of performance in the app and dataset depth.

For the design of the web app. We decided to use Material UI which allowed for us to easily have the app split into two sections. Material UI was also used because of its great looking buttons and drop down menus. The drop down menus were used to allow a user to select what time step they want to display as well as how many transactions that want to visualize from the selected time step.

D3.js was used to visualize our dataset.

Axios was used to make requests to the back end's API where are the transaction data is received from.

---

## Dependicies

* React
* Material UI
* D3.js
* Axios

---

## How to run

open a terminal and run 'npm start'

However for the project to work correctly you need to have the backend runing before running the frontend

---

## Bugs

The graph visualization will sometimes render as a red dot in the top left corner of the visualization panel

---
