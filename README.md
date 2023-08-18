# compass_challenge03
This is the repository for the 3rd Compass Challenge

## Introduction:
Your task is to build a responsive website that showcases healthy restaurant 
delivery information. The challenge will consist of four primary pages:

### 1. Login Page:

• Users input their username and password.

• Authenticate users using GraphQL API and Axios.

• Redirect to the homepage on successful login or display an error message on failure.

### 2. Register Page:

• New users input details like username, password, and email.

• Register new users using GraphQL API and Axios.

• Redirect to the login page with a success message on successful registration or display an error message on failure.

• Ensure user input validation (e.g., password length, valid email format).

### 3. Homepage:
   
• Fetch a list of restaurants from the GraphQL API with Axios.

• Display information for each restaurant.

### 4. Restaurant Detail Page:
   
• Fetch detailed information for a restaurant based on its ID through Axios.
• Display the restaurant's details, including its top three dishes.


#### Requirements and Recommendations:

• Use React, HTML5, CSS3, and Typescript.

• Install and utilize the Axios library for API requests.

• Write unit tests.

• Ensure the site is responsive across various screen sizes.

• Prioritize user-friendly interface.


## How to execute the project

1 - Clone this reposiroty:

```console
$ git clone https://github.com/talessoares/compass_challenge03.git
```

2 - Install the modules with "npm install":

```console
$ npm install react react-dom react-router-dom axios
```

4 - Execute with: npm start.

```console
$ npm start
```
