# Pollfish Front-End Mock API

This is a companion mock-api that can be used together with the front-end assignment. It is built using dyson and contains a one-file-text database (yes, yes indeed).


## Prequisites 

You will need to have installed locally on your machine
- Node (preferably version 8+)
- Npm (preferably version 6.4.1+)

## Installation

Install the dependancies

```shell
npm install
```

## Starting the mock Server

Starting the server with the default options is the simple
```
npm start
```

The dyson server will start in port 5000. Navigate to [http://localhost:5000](http://localhost:5000)

> If you want to change the port that the server runs in you can edit the index.js options object to anything you like.

## API

All API access is over HTTP (since it currently only works locally). All data is sent and received as JSON.

```shell
curl -i http://localhost:5000/api/questions
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Content-Length: 749
ETag: W/"2ed-qA9FFyZ4Fw/nOJyMXuDEwpZMEK4"
Date: Thu, 20 Dec 2018 13:43:28 GMT
Connection: keep-alive
```
The response object will contain a `success` property and a `data` or `message` property, with an added `error` property if something went wrong.


### Authentication

There is none. This is used locally, only for the purposes of the assignment and the data is kept in a text file! Adding authentication seemed overkill.


### Client Errors

[The AJV](https://github.com/epoberezkin/ajv) library is being used to validate the json schema of the data received per endpoint. If the validation fails for some reason it will result in a `400 Bad Request` HTTP Header with the response being 
```js
{ success: false, message: 'Bad Request', error: 'Message explaining the error received' }
```

### Models

For the purposes of this assignment the only model that exists is that of a question that is containing an array of answers.

ex: 
```js
Question Model
{
  id: String, // provided always by the storage.
  prompt: String, // the title of the question
  answers: Array[String]
}


```

### List All Questions

```shell
GET /api/questions
```

#### Response
```
Status: 200 OK
```
```json
{
  "success": true,
  "data": [
    {
      "id": "478ef726-bceb-4547-af89-77c979d7486e",
      "prompt": "Would you consider buying \"Unbranded Wooden Fish\"",
      "answers": [ "Yes", "No" ]
    },
    {
      "id": "67aa65be-cd5c-428f-a937-33e685d081ac",
      "prompt": "Would you consider buying \"Gorgeous Granite Tuna\"",
      "answers": [ "Yes", "No" ]
    },
    {
      "id": "713190bf-5d87-4fb5-a3a5-23cbbceba509",
      "prompt": "Would you consider buying \"Awesome Frozen Shirt\"",
      "answers": [ "Yes", "No" ]
    },
    {
      "id": "09a5b26b-a8b0-4ffd-8270-744724c9f5de",
      "prompt": "Would you consider buying \"Intelligent Concrete Chair\"",
      "answers": [ "Yes", "No" ]
    }
  ]
}
```

### Create a new Questionnaire

Creating a questionnaire expects an array of questions and will be overwriting the existing one. There is currently no way to support more than one questionnaire.


```shell
POST /api/questionnaire
```

#### Parameters

The API is expecting an array of questions. 
ex: 
```js
[{
  "prompt": "Would you consider buying \"Awesome Frozen Shirt\"",
  "answers": ["Yes", "No"]
},
{
  "answers": ["Yes", "No"]
}]
 ```
 
 **Warning** Id's will be provided by the storage implementation after saving.

#### Response
```
Status: 200 OK
```
```js
{
  "success": true,
  "data": [Question],
  "message": "Saved successfully X number of questions"
}
```

### Edit Question

You can edit an individual question by providing its id. You don't have to send all of the properties of a single question to edit only the `prompt` property for example. You can send only the `prompt` field (PUT Updates).

```shell
PUT /api/questions/:question_id
```

#### Parameters
| Name         | Type        | Description
|:-------------|:------------|:--------------------
| Prompt       | String      | The title of the question
| Answers      | Array       | An array of answers.
#### Response
```
Status: 200 OK
```
```json
{
  "success": true,
  "message": "Question with id XXXX-xxxx-XxXx was updated successfully"
}
```

### Populating the Database

Initially the "database" will be empty. If you want to start with some auto-generated questions you can run 
```shell
npm run generate-data
```

and a random number of questions 0-10 will be generated in the database.

### Bonus Points
#### Server Errors

To immitate real production use, some of the endpoints can fail with 500 errors at random intervals using a true RNG algorithm (...`Math.random`). Use
`?env=production` on any endpoint and it will respect your wishes and fail randomly.


## FAQ 

### Should i create my own unique id's for each question?

The id property should be handled by the storage API. If you send a question without an id you will receive it on the response with the id populated. This is only to immitate real use.

### How should i handle the question and/or answer ordering?

Using the array index for ordering is enough. Array order is guaranteed in Javascript

### Should i use the edit question endpoint or can i work only with the create questionnaire?

Whichever suits you best. It is not required to use both endpoints in the same project.
