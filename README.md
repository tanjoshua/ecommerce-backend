# Ecommerce server

Barebones implementation of an express server created for an online shop.
This backend server was created as I was learning express.js, while taking the "NodeJS - The Complete Guide" Udemy course.

As the main purpose of this project was for me to learn how to build a backend server using express, the server sends ugly html files directly to the browser. Front end design is not the main focus of this project. If I were to actually make an ecommerce application, I would use a frontend framework like React.js for the user interface.

Note: api key for sendGrid has been redacted

# What I learned

1. Using the Model View Controller (MVC) design pattern
2. Using middleware functions in express and understand how they work
3. Using routers and controllers to handle requests and send responses
4. Using body parser middleware to extract body from post requests
5. Using ejs as a template engine to return html pages
6. Extracting dynamic parameters from route
7. Setting and handling query parameters for get requests
8. Connection and interaction with a MongoDB database (native driver)
9. Connection and interaction with a MongoDB database using an ODM tool like Mongoose
10. Using sessions stored in MongoDB for authentication
11. Route and CSRF protection
12. Sending emails + password reset
13. Input validation
14. Throwing errors within controllers and catching them using middleware
15. Storing image files on the server
