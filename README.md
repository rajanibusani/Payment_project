# Heylink Project : Payment Notes 
Tech stack includes Typescript, Node.js, Express.js framework, Knex.js(Sql query builder)

#### MYSQL database Access
If the server requested authentication fails,please use these commands to modify the current root password in sql workbench.

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';flush privileges;```


## Installation

#### Install Dependencies: 
```bash
$ npm install
```
#### Start the server: 
```bash
$ npm start
```
#### To Check the end points responses, I used Postman.
Below is my link to postman collections, which you can import and check the responses of end points.

[Payment Project POSTMAN Collection](https://www.getpostman.com/collections/c88878facc097f3a2b26)

### 🤔 Questions

1. What do you see as potential issues, if the volume of transactions per payment note is ever increasing?

Ans: Even though MySQL is a widely used open-source relational database management system (RDBMS) and is an excellent solution for many web-scale applications, MySQL does not have a strong memory-focused search engine. Because it is not designed for very high concurrency, so if the volume of transactions per payment note is increasing, users can experience performance issues and also cannot deliver optimal speed.

2. If you had the option to choose any tech-stack & service(s) to help scale up the handling of an ever increasing volume of transactions, which would you choose & how would each chosen option help?

Ans: I would like to use MongoDB instead of MySql, to handle the increasing volume of transactions as it is capable of scaling out huge volumes of traffic as well as data. And it also offers great speed and certain flexibility with the use of unstructured data within a schemaless environment.
I would like choose the tech stack of express.js, MongoDB and also would like to use services like mongoose library which makes working with MongoDB easier and also has built in validation.


  2.1 Would the chosen options change the architecture of the code written for this task? If so, explain briefly what would change.

Ans: If I choose mongoose instead of MySql (knex.js), I have to install and import the mongoose into app.js file, and to set up the database connection, I have to call mongoose.connect with connection string.

For creating a collection with Mongoose I have to create two necessary things: 

 i) Schema: It is a document structure that contains the property with its types ( default value, validations, etc. when required) as a key-value pair.

 ii) Model: It is a class created with the help of defined Schema and a MongoDB document is an instance of the Model. Therefore, it acts as an interface for the MongoDB database for creating, reading, updating, and deleting a document.

I can use different MongoDB methods to perform CRUD operations on database for example insertMany() function is used to insert multiple documents into a collection.


