# :package: Data Storage

Data recording and storage are critical functions of an experiment that enables [analysis](/analysis).  When a user participates in an experiment we would like a centralized place to organize the data from each participant.  We would like this storage system to be secure, robust, scalable, and fault tolerant.


Depending on your experiment design you may need to develop custom data storage code (e.g., real-time multiplayer games).  But in most cases that cover "experimental cognitive science on individuals", <SmileText/> provides a robust solution that requires little to no configuration or code.   Dealing with data is so important, [it isn't something you should even have to think about](/principles#no-code-is-the-best-code)!

This document describes the basics of <SmileText/> data storage including how to configure the system, how to use the data storage techniques manually in your code, the overall logic behind how it works, and how to set it up for a new lab.


## Getting started quickly

If you start your project using the <SmileText /> github template, and are in the gureckislab and follow the [starting a new project](/starting) guide then there's nothing else for you to do.  Your application already has the ability to save data to a password protected lab database and will begin saving the data from your experiment as participants progress through your task!  

As a result, you can jump immediately to either:
- [Accessing your data](#accessing-the-data-from-your-experiments) 
- [How to save data in your experiment](#recording-data)

In addition to these sections, the rest of the document includes an in-depth guide to understanding how data is managed in <SmileText />, how to customize aspects of the data processing system, and how to set up a new system for a new lab.


## Accessing the data from your experiments

It may be weird to start first with how to access your data rather than discussing how to save it but it turns out the default <SmileText /> configuration takes you pretty far to begin with on the saving side with no configuration, so we can start with accessing the saved data.  There are two ways to monitor your data and export it for later analysis: the <SmileText /> command line tool and the Firebase console.

### Exporting data using the command line tool

When you are ready to export your data for analysis you can use the <SmileText /> command line tool.  Simply run:

```
npm run getdata
```

in a terminal from the root directory of your project and an interactive script will guide you through the options of downloading different subsets of data.  Data is typically output as a `.json` file in the `data/` folder but is something configured via the interactive prompts.  From here you can begin [data analysis](/analysis).


### Viewing data in the Firebase console

Data from your experiment is stored, long-term, in a [Google Firestore database](https://cloud.google.com/firestore).  You can read more of the details about this below.  However, in terms of looking at this data and monitoring it during development, Google provides a web-based console that allows you to view the data from your experiment in real-time.  To access the console, you first need to ask Todd (if you are in the gureckislab) for permission to access the lab Firestore from your Google Account (contact him with your preferred Google account name).  Once he verifies you are added to the project go to [https://console.firebase.google.com/](https://console.firebase.google.com/) and you should see something similar to this:

![Firebase projects](/images/firebase-projects.png)

Here there is one project named `smile-db-test` and yours might be different.  Whatever it is, click the project name and you will be presented with a project overview looking similar to this:

![Firebase project overview](/images/firebase-project-overview.png)

Next, click the "Firestore Database" on the left-hand menu under "Project Shortcuts" and you will get the interface to the database:

![Firebase project overview](/images/firebase-viewer.png)

This is a live view of the database that updates automatically as new data comes in.  Data is organized into documents and collections which act similar to folders and files on your computer. 
At the top (root) level of a <SmileText /> project is two collections called `real` and `testing`.  The `testing` collection is where data goes anytime you are running your experiment in [development mode](/developing).  The `real` collection is where data goes anytime you are running your experiment on a live [deployment](/deploying).

Under the top level collection is a list of documents, one for each experiment in the lab.  The names of these documents reflect the `${VITE_GIT_OWNER}-${VITE_GIT_REPO_NAME}-${VITE-GIT-BRANCH}` for your project.  Refer to the documentation on [organizing versions of your experiment](/deploying.html#organizing-versions-of-your-experiment) for more information.  Suffice to say that this is automatically configured and places your data into "folders" based on the current branch of your code in which you are working or deployed. 

Within each folder is a new collection called `data` which contains records for each participant who started your experiment.  It looks like this:

![Firebase data listing](/images/firebase-data-listing.png)

Each participant in your study is automatically assigned a random id which is the name of the document (e.g., `57Af2dq105RgzFqqgcZS` in the screenshot).  Clicking on that document shows its contents which is a structured JSON-like representation of the data from your experiment.

![Firebase data record](/images/firebase-data-record.png)

You can use this web interface to delete data, and also watch as it fills in real-time.  This can be helpful to check that things are working and also that the data has the structure you expected.

## Recording data

The default project template of <SmileText /> automatically records and saves many relevant data fields including logging if participants agreed to provide informed consent, the current version of the code that the participant is interacting with, etc...  However, invariably you will want to record and save the data from your actual experiment design including aspects of the instructions and task or trials that might be custom to your task.  It is extremely simple to do this but it is helpful to understand the concepts involved first.

### The concept of "state"

State refers to one or more variables organized into a collection that captures the moment-by-moment details
of your application.  The state of your application changes over time as users interact with it (e.g., clicking on buttons), as well as based on network requests that load data and information from other APIs or databases.

As an everyday example, the state of a light switch in your home can be either `light=on` or `light=off`.  When you take actions (click a button or flick a switch) the state changes.  In an electrical circuit this state is implemented as a physical switch that either allows or blocks the flow of current.  However, in a web application state is much more complex and might include things like "user is logged in" (`logged_in=true` or `logged_in=false`), or even things with values like username (`username=linustorvalds` or `username=thurstonmoore`).  Each of these states also change based on actions the user of the software takes.

The central question in developing web experiments is managing this state and using the state to display the correct information to the user (e.g., we should show the person a login page if they haven't yet logged in, or otherwise their account information for their username).  Although <SmileText /> is not necessarily a complex web application with login forms, etc... it is sufficiently complex that the code for managing the overall application state is distributed into different modules which generally have different properties.

![overview ](/images/storage-statediagram.png)

### Local states, global state, and persistance

A <SmileText /> experiment is made up of various [components](/components) which are controlled programmatically.  Each component has what is known as **state** which is data reflecting the current component.  Ideally, state is local to each component allowing for modularity (users of a component don't have to know the internal workings).  Example of local state might be "is the participant on page 1, 2, or 3 of the instructions?" Or "what are the values of various form fields?" or "What is the x,y position of the mouse currently?"  In most cases these types of values do not need to be globally available all components.

However, there are times where it makes sense for there to be a **global state** which is shared by all components.  You can think of this as a global "whiteboard" that any component can access.  This is where you place information that is common to all components and is a natural place to put data from human participants in your study (because data might be generated from several different components over the entire experiment). In <SmileText /> this global state is known as a **store** and is managed by the [Pinia](https://pinia.vuejs.org) plugin.  Stores are slightly more general than state because while they maintain a global state, they provide methods for manipulating that state as well as additional debugging tools (see Pinia).

A final issue concerns the **persistance of state**.  Some state information (e.g., information local to a component) is "in memory" in the sense that it only exists inside the temporary memory storage of the browser while it is viewing your experiment.  If you close the browser window, press reload, navigate to a new page then press back, or the browser unexpectedly crashes, the state is lost.  Another name for this type of state information is **ephemeral**. In contrast we can make some types of state **persistant** by synchronizing it with various tools for data storage.  In <SmileText />, we set up a system that persists the global application state in several ways but the most important one is storing data from our participant's behavior in Google Firestore (which is a NoSQL database solution hosted on the Google Cloud).  We also make use of state persistance features of the browser such as [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) which is similar to cookies.  

A graphical overview of this is provided above.  Individual components usually have ephemeral states which capture information that doesn't need to be shared or recorded/persisted.  Components in <SmileText /> can, when necessary, write information into the global store.  Other components are able to read this information.  In addition, <SmileText/>'s global storage state provides methods for easily persisting values of the state by writing them either to Google Firebase/Firestore or the LocalStorage in the browser.




### Data is recorded in the global app store


To access this global "store" within any other component or script simply import the `useSmileStore` method and create a reference to the store instance:

``` vue
<script setup>
import { useSmileStore } from '@/stores/smiledata'
const smilestore = useSmileStore()
<script>
```

Typically this would happen in the `<script setup>` section of your component (assuming you are using the Vue 3 Composition API).  To see an example of how you use the store, consider the consent form page (`src/components/pages/ConsentPage.vue`).  This page displays informed consent and then provides a button that when clicked advances to the next part of the experiment (a method called `finish(goto)`).  

```js
function finish(goto) { 
    smilestore.setConsented()
    smilestore.saveData()
    router.push(goto)
}
```

The first line of this function sets the user as "consented."  Consenting is a property of the global state/store that is accessible to other components which might want to check if the user has consented yet.  In addition, it persistent via the `smilestore.saveData()` method which makes a copy of the current application state in the Firebase database.

## Writing Data to the Global Store

Writing to the global store is as simple as updating a Javascript object in memory.  In any Vue component simple write

``` vue
<script setup>
import { useSmileStore } from '@/stores/smiledata'
const smilestore = useSmileStore()

// sets a new variable called 'something' to 'true' in the global store
smilestore.data.something = true
<script>
```

A more preferred way is to modify `src/stores/smiledata.js` to add new setter and getter methods for your data type.  Setters are function defined under the `actions` property that can be called via `smilestore.action()` (if the method was named `action`).  You can use these to modify the state.

Similarly under `getters` you can define new properties that 'get' the value of the state.  For example, consider one getter:

```js
isConsented: (state) => state.data.consented
```

returns the value of `state.data.consented`.  In your component code then you call `smilestore.isConsented()` to check if the use has agreed to the consent form yet.


## Automatically recorded data

In addition to data that you manually record <SmileText /> automatically tracks additional information about the browser state during your experiment.  Specifically, it records window resize events, and changes in focus (blur means when someone clicks on a window other than the current browser and focus is an even when the window is brought back to the front).  These fields can sometimes be used to detect odd behaviors such as using another window to search for answers or dual-tasking.
The data is tracked in `smilestore.data.browser_data` in a easy to parse JSON structure.



## Google Firebase/Firestore

- Video introduction to [Google Cloud Firestore](https://www.youtube.com/watch?v=QcsAb2RR52c&list=PLl-K7zZEsYLmOF_07IayrTntevxtbUxDL)

The [Cloud Firestore Console](https://console.firebase.google.com/u/0/)



- caveat: maybe the ad/ page for AMT shouldn't create the data record

- when land on first page (/)
    - check if the user has been here before
    - if not
        - log in to firebase anonymously
        - create a new document
        - save some data there
        - update local to know user is "known"
    - if yes
        - is this like a new session and the database has gone away?
        - if yes
            - need to reconnect to database
        - if no
            - nothing needs to happen really

- what about if the user requests a different route?

- if the user hasn't been here before send them immediately to /
- otherwise if this is the expected route continue as usual

other features
- offer a method to save the state (verifying that the docid is known and writeable)
- run this on a timer in the background

## Automatic saving

You can configure automatic saving whenever a page change happens
using the TimelineStepper using `env/.env` using option `VITE_AUTO_SAVE_DATA`.

:::warning 
This only works if you use the `TimelineStepper` to move between pages.  If you
advance to new pages on your own you need to call `smilestore.saveData()` manually.
:::


<img src="/images/firebaselogo.svg" width="70px">

## Data saving outside of Vue Components

Sometimes your page might have additional content that is defined outside of the Vue SPA.  For these you need to import a library to access the data store.


## Local storage

## Setting up Google Firestore

- Create a new project
- Create a web app
- Enable anonymous login
- Change the privacy settings


## SmileStore API

`stores/smiledata.js`

``` vue
<script setup>
import { useSmileStore } from '@/stores/smiledata'
const smileStore = useSmileStore()
<script>
```
<img src="/images/pinialogo.svg" width="70px">

### createStore

This describes this method

- **Arguments**

- **Details**

Somethign about it

### saveData

This describes this method

- **Arguments**

- **Details**

Firebase has several limits on document writing.  Documents can't be larger than 1MB.
In addition, you can't write to the same document faster than once per second.  Since billing is based on writes it also is a bad idea to allow unlimited writes since code can live running in a user's browser for a long time if they do not close the window.  As a result, this function has an upper limit on the number of writes allowed.  This is [configured](configuration.html#experiment-options-env) using `VITE_MAX_WRITES`.  By default, it is 1000 but can be adjusted if you need more writes for your experiment.  In addition, the code doesn't allow this method to be called faster than once every two seconds.  This is [configured](configuration.html#experiment-options-env) using `VITE_MIN_WRITE_INTERVAL`.


```
service cloud.firestore {
    match /databases/{database}/documents {
        match /real/{expId} {
            match data/{dataId} {

            }
        }
        match /testing/{expId} {
            match data/{dataId} {
                
            }
        }
    }
}
```