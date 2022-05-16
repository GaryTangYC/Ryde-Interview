# Ryde-Interview

Welcomes to my submission for Ryde Back-end Developer Test.

This document will walk you through how the creation, details, and reflection towards my implementation of this challenge. The sections will be as follows:

1. Tech Stack of choice
2. Starting the application
3. Available API's and how to use them
4. Testing of APIs
5. User Authentication
6. Personal Reflections

## 1. Tech Stack

This project was developed with Node, with an Express framework and is connected to a MongoDB which served as a database (DB).

---

## 2. Starting the Application

1. Start by cloning the repo down from Github with the following command:

   `git clone https://github.com/GaryTangYC/Ryde-Interview.git && cd Ryde-Interview`

2. Next, you will need to run `npm install` to install all the necessary packages and required dependencies.

3. Create a ".env" file in the folder and paste the following contents into the .env file

   ```PORT=3004
   DATABASE_URL="mongodb://localhost:27017/ryde"
   SALT='Ohs0fl@vor4ul'
   PW_SALT_ROUND=8
   ```

   <b>Note: You can replace the DATABASE_URL with other mongoDB configuration that you prefer. This should be configured based on step 4 below (https://www.mongodb.com/docs/drivers/go/current/fundamentals/connection/#connection-uri) </b>

4. Open up MongoDB and create a new database (Recommended to use folder: ryde).
   <br>
   .env file (Step 3: DATABASE_URL) needs to be amended based on the DB name.

5. Once done, seed the database with the following command:
   `node seeder/seed.js`

---

## 3. Available API's and how to use them

There are 4 APIs created for this test.

For the purpose of attempting the advanced requirements of user authentication, email and password has been included as additional key value pairs for the user Model (refer to Section 5. Authentication).

<b> <ins> 1. Create User </ins></b>

POST `/user/createUser/`

This route will create a new user by posting all the required key-values pair based on the User model.

Response would include a token which is meant to be inserted into the Header as part of authentication

Body:

```
{
    "name": "TestUser1",
    "dob": "1988-03-18",
    "address": "Singapore",
    "description": "testDelete",
    "email": "testuser@gmail.com",
    "password": "abc"
}
```

Response:

```
{
    "message": "User Created",
    "result": {
        "_id": "6281fe46c2ad36dd38ab56fd",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI2ODY0MDYsImV4cCI6MTY1MjcwODAwNn0.KagT54reo8nsREZl_Kfqlgci0jtIAlbwBnnucYH8ZGE",
        "name": "TestUser1",
        "dob": "1988-03-18",
        "address": "Singapore",
        "description": "testDelete",
        "email": "testuser@gmail.com",
        "createdAt": "2022-05-16T07:33:26.181Z"
    }
}
```

<br>

<b> <ins> 2. Get User </ins></b>

GET `/user/getUser/:id`

This route will obtain the user data based on the user ID.

For this example, we will be using the following user ID from the pre-seeded data to obtain a response:

<ins>URL request </ins>

`localhost:3004/user/getUser/507f1f77bcf86cd799439012`

Response:

```
{
    "_id": "507f1f77bcf86cd799439012",
    "name": "Gary",
    "dob": "1945-05-29T00:00:00.000Z",
    "address": "Gary address @ Malaysia",
    "description": "Gary is a fun user",
    "email": "gary@gmail.com",
    "password": "$2b$08$TPj0QVsKetM6kpSgSiGDlOjvKvRZvCqFUiANLu0svIYJC2E0IAETW",
    "__v": 0,
    "createdAt": "2022-05-16T07:45:18.123Z",
    "updatedAt": "2022-05-16T07:45:18.123Z"
}
```

<b> <ins> 3. Update User </ins></b>

PUT `/user/updateUser`

This route will update details of an existing user.

For the sake of simplicity, a single API has been built to update all the key-values pairs in the specified user data rather than building a separate API for each key data.

The route works by querying the user ID follow by updating the details in the key value pair. Example as follow:

Body:

```
// Notes: Update user id:507f1f77bcf86cd799439012 with the following data

{
    "id": "507f1f77bcf86cd799439012",
    "name": "Gary T",
    "dob": "1990-05-28",
    "address": "singapore",
    "description": "testCreate",
    "email": "gary@gmail.com",
    "password": "abcdeg"
}
```

Response:

```
{
    "message": "Update success",
    "updateData": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Gary T",
        "dob": "1990-05-28T00:00:00.000Z",
        "address": "singapore",
        "description": "testCreate",
        "email": "gary@gmail.com",
        "password": "$2b$08$22MoR.ikLVRen2qrX8vr0eE4uZDgwqU7mfMS.E.itLA7N9aBe0vIK",
        "__v": 0,
        "createdAt": "2022-05-16T07:45:18.123Z",
        "updatedAt": "2022-05-16T08:04:46.424Z"
    }
}
```

<b> <ins> 4. Delete User </ins></b>

DELETE `/user/deleteUser`

This route will delete the user by providing the userID

Body:

```
{
  "id": "627f76aedab5e514afc4fdf3"
}
```

Response:

```
Deleted userId: 627f76aedab5e514afc4fdf3
```

## 4. Testing of APIs

![](./Postman-Test.gif)

## 5. User Authentication

For the purpose of attempting the advanced requirements of user auth, email and password has been included as part of the user Model.

## 6. Personal Reflections
