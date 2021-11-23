# Heylink Project : Payment Notes 
Tech stack includes Typescript, Node.js, Express.js framework, Knex.js(Sql query builder)

#### MYSQL database Access
If the server requested authentication fails use these commands to modify the current root password in sql workbench.

```ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;```


## Installation

#### Insatll Dependencies: 
```bash
$ npm install
```
#### Start the server: 
```bash
$ npm start
```
### 🤔 Questions

1. What do you see as potential issues, if the volume of transactions per payment note is ever increasing?

2. If you had the option to choose any tech-stack & service(s) to help scale up the handling of an ever increasing volume of transactions, which would you choose & how would each chosen option help?

2.1 Would the chosen options change the architecture of the code written for this task? If so, explain briefly what would change.

