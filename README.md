# This Project is still in progress, this file does not contain enough information, will be updated
# A Tour Website Fullstack Project
## More Details about this project can be found in each Frontend and Backend folder
## What is still in proagress? post, patch and delete request to create a new tour, destination or edit information and delete an existed one
## Backend: Port 8000 (Docker) - npm start 3000
## Frontend: Port 3000 (Docker) - npm start: 8000
### To Access: in this directory run docker, then open the terminal then "cd Tour-Website-Fullstack" and "docker-compose up --build" after that access ![127.0.0.1:3000](127.0.0.1:3000) in your browser for the homepage
### All the tours 
![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/e766a32d-f77c-4340-9db5-f186de5ff0bd)

#### Path: ![127.0.0.1:3000/tours](127.0.0.1:3000/tours)
The data of all tours will be sent from Backend to Frontend, ReactJS will rendered all the tour and display all the destination of a tour

### All the destinations
![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/d95fa46d-4842-46b0-8628-3e073af1acf7)

#### Path: ![127.0.0.1:3000/destination](127.0.0.1:3000/destination)
As the same as tours, the list of all destinations will be shown

### Tour Detail
### Path: (Example: ![127.0.0.1:3000/tours/tour3](127.0.0.1:3000/tours/tour3))  127.0.0.1:3000/tours/{the name of a tour}
![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/246cf365-58a6-4971-b5e2-cb6ffae4f34a)


### Destination Detail
### Path: (Example: ![http://localhost:3000/destination/Darmstadt](http://localhost:3000/destination/Darmstadt))  http://localhost:3000/destination/{the name of a destination}
![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/fc834cf2-d479-46d2-88a7-3b6e3ce356b6)



