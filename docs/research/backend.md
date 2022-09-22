# Back End Research Notes

Minimally the back end needs to store data in a database of some kind along with more infrequent server-side computations.

Key questions to answer: 

- Do you need a different backend server for each experiment or can we make one server for entire lab?
- What datastorage technology?  Key concerns are cost of storage, types of queries you can perfom on it, etc…  (e.g., .json text files hard to query, some real time NoSQL databases also limit queries).  See notes on [backend technology](#backend-technology).
- What about [server side computations](#server-side-computations) (these are computations we don’t want to be user-editable in the experiment javascript).  

## Backend Technology

Idea is to make one, always available and password secure process for saving data shared for all experiments with a very easy to access javascript API.  Ideally when developing experiments you just never even need to know about this.  Could also work with arbitrary other systems like python or iOS based experiments.  Just a “cloud bucket” for data.


Main options:

1. **Text files**: Server process that just saves .json or .txt files to a disk someplace
    - Custom CGI/Flask/Node.js process running someplace implementing a simple API (CRUD - create read update delete)
    - Data goes into a folder on the server
    - You download your data files (one per subject perhaps)
    - Need to configure and monitor backup but not that hard
1. **Relational Database (RDBMS)**: usually independent process or server that has a fault tolerant data management system that can be queried in complex ways
    - Usually MySQL or Postgres
    - Hosted solutions usually are cheap/free and provide automated backups
    - Need some process to handle the API (e.g., Flask or Node.js)
    - Queries direct from authenticated user
    - 🌟 Currently psiturk does this

1. **NoSQL**: independent, fault-tolerant system with limited query function but can scale to a large number of documents, high availability 
    - No need to schema (database fields) to be defined in advance
    - Several option but typical a document based solution
    - MondoDB one example, but Google Firestore provides the backup, management, and API functions already 


### Possibilities:
Various cominations of:
- [Flask](https://flask.palletsprojects.com/en/2.1.x/) (python based web application)
- [Firebase](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjp3eGU4eX3AhUfwsIEHYQfCIkYABABGgJwdg&ae=2&ohost=www.google.com&cid=CAESa-D2WJIj2nkfENc79DvRv3JhOgNgTLR_M5wXx6ConwD6KQjsaOn1lvQ6BTWDlq-h48Hap7Tq46rsKVLwq81-1HgZBRdkEu-tzi4ESYEb2XHotNk7E6OFMvrWlNPdOjWOLuoPph8Umn6Ll2Dl&sig=AOD64_0y1U4kGniFArjaV7dE4szVdNp3Dg&q&adurl&ved=2ahUKEwiM2teU4eX3AhXSkGoFHVBQBeIQ0Qx6BAgDEAE&nis=2&dct=1)
- [Express.js](https://expressjs.com) (node)
- [Laraval](https://laravel.com) (php)
- others? (there are literally hundreds)

Useful web howtos:
- Getting started with Firestore: https://firebase.google.com/docs/firestore/quickstart
- Create a REST API with express.js+node.js: https://www.robinwieruch.de/node-express-server-rest-api/
- Create a REST API with flask: https://medium.com/analytics-vidhya/swagger-ui-dashboard-with-flask-restplus-api-7461b3a9a2c8

## Server-side computations

Sometimes experiment need specific server-side software to run. Examples:

- Computing bonus from an experiment in a way that the subject can't change it in the browser dev tools.
- Verifying if the user id on AMT or prolific has done this specific experiment or this _type_ of experiment before
- Blocking known bots or bad actors from participating based on ip addresses, AMT workeriDs, etc…
- Running server-side python code that determines something about the experiment (e.g., using OpenAI gym to define and respond to actions by a user in a browser), or possibly fitting a model to a user's data and then using the fitted model to adapt future trials.
- Ability to yoke subjects (e.g., query database and find a previous person and use their data as input for current designs — relates to Markov Monte Carlo with people type chaining)

## Specific miscellaneous stuff like multi-player games

- Multi-player support for group behavior experiments (ala Pam)
