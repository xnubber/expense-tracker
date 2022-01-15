# Expense Tracker

A simple web page that can create, store or edit your own expense records.

Login Page
![image](https://github.com/xnubber/expense-tracker/blob/main/public/img/expense-tracker.jpg)

Home Page
![image](https://github.com/xnubber/expense-tracker/blob/main/public/img/expense-tracker-1.jpg)

## Features
- records can be sort by category
- user can add a expense record
- user can edit one expense record
- user can delete one expense record
- user can login, logout and register
- user can login and register through facebook

## Prerequisites
- Node.js v14.18.1

## Install
1.clone to local

```
git clone https://github.com/xnubber/expense-tracker.git
```

2.cd to directory

```
cd expense-tracker
```

3.npm install

```
npm install
```

4.create .env file

```
touch .env
```

5.refer to .env.example to fill out .env file

## Execution
add seeds data

```
npm run seed
```

server on

```
npm run start
```

when the **Express is listening on localhost:3000** show up on the terminal, means you can type **localhost:3000** as URL on web browser to see the web.

seed user data below:
user1
```
email: user1@example.com
password: 12345678
```


## Tools
- Node.js v14.18.1
- Express v4.17.1
- Express-handlebars v5.3.4
- Method-override v3.0.0
- Mongoose v6.0.12
- Bootstrap 4.3.1
- Font-awesome 5.8.1
- MongoDB
- passport-local-mongoose
- connect-flash 0.1.1
- dotenv 10.0.0
- express-session 1.17.2
- passport 0.5.2
- passport-facebook 3.0.0
- passport-local 1.0.0
