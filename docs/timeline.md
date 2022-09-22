# :twisted_rightwards_arrows: Timeline

Web experiments are often composed of several parts presented in sequence.  For example, first, we might show a welcome page &rarr; informed consent &rarr;instructions &rarr; etc...
<SmileText /> provides a central "sequencing" or timeline feature which makes it easy to configure, customize, and move through different stages of an experiment.

This page shows how to configure and control <SmileText />'s Timeline implementation, and how to customize it with more complex behaviors.   Most of the configuration happens in `src/router.js` which is short, self-explanatory, and well commented so you jump there if you feel confident.

## Single-page Applications and Routing

Modern apps such as <SmileText/> are known as **Single-page Applications (SPAs)**.  These apps load a single HTML page and then use a Javascript framework to control the dynamic interactions of the page including showing and hiding different elements, handling events like clicks, loading data to or from a server, etc...  However, it is often useful to be able to directly access different content in an app using URLs.  For example, users might want to bookmark the login or settings page of an app and so they need a distinct URL that will pull each of these views up.

Because SPAs load the entire app from a single URL, the solution to this for SPAs is known as a **router**.  A router is a piece of software running in the browser which interprets URL requests and programmatically changes the visible content on the webpage, mimicking normal browser requests for specific pages.  In <SmileText />, routing is handled by the [Vue Router](https://router.vuejs.org) which is a powerful open-source project built for routing in [Vue](https://vuejs.org) applications.

A simple example of using the Vue router is visible here (adapted from the Vue Router [documentation](https://router.vuejs.org/guide/#javascript)):


``` js
// 1. Define route Vue components
// These can be imported from other files
const Welcome = { template: '<div>Welcome</div>' }
const Consent = { template: '<div>Consent</div>' }

// 2. Define some routes
// Each route should map to a component
const routes = [
  { path: '/', component: Welcome },  // maps '/' to 'Welcome'
  { path: '/consent', component: Consent }, // maps '/about' to 'Consent'
]

// 3. Create the router instance and pass the `routes` option
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})
```

First, we define two simple Vue [components](/components), then we create an array called `routes` which configures each route.  Each route is, in effect, a mapping between a particular URL and a component.  For example, in this code snippet, `/` on the server is mapped to the `Welcome` component and `/consent` to the `Consent` component.  

You can read this as literally saying "when the user requests the `/` URL on this application, display the `Welcome` component".  Specifically, it renders the template of your component in your app in place of where the `<router-view>` tag appears.  In smile, that tag appears in `src/App.vue` which is the starting component for the application.


## URLs and Routes

A quick note about URLs and routes.  We will often mention a base path or base URL for a project.  This is the full deployment URL to your experiment including the protocol (`http://`), the domain (`exps.gureckislab.org`), as well as subfolders (`/ghuser/repo/branch/`) etc...  For example `http://exps.gureckislab.org/` might be the base path.  This is configured via the `VITE_CODE_NAME_DEPLOY_URL` or `VITE_DEPLOY_URL` in the `env/.env.git` file (see the docs on [configuration](/configuration)).  

Routes are configured beneath this base URL so `/` means the original base URL but `/about` means `http://exps.gureckislab.org/#/about`.  The base URL can also include subfolders so for instance the base route could just as easily be `https://exps.gureckislab.org/ghuser/repo/branch/#/about`.  The base folder is where your `index.html` for the SPA is located during deployment or development.

The `#` character in these URLs is not a typo.  When you access a URL with slashes on it typically it is interpreted by the browser as a new network request for a particular resource on the webserver.  An exception is for content that follows `#` character which indicates a link to different content on the **same page** (e.g., read about the `<a name>` tag also known as [fragment identifiers](https://www.w3.org/TR/html401/intro/intro.html#fragment-uri) in HTML).  Changes to this part of the URL do not trigger page reloads ordinarily.

The easiest way to think about it is like this:

![how route URLS are processed](/images/routing.png)

words separate by slashes appearing before the `#` (or if there are no `#`s) are sent by the browser to the webserver as resource requests using standard `http` protocol, which triggers a page reload from the server.  Things that appear after the `#` do _not_ trigger a page reload.  The Vue Router interprets changes appearing after the `#` and parses the content and uses it to determine what Vue components to load (based on the routing table that you configure).[^hash]  

[^hash]: The `VueRouter.createWebHashHistory()` call is what tells the router to use the `#` navigation strategy.

In <SmileText/> key steps in the experiment are indexed by routes that map to [page-level components](/components).  So `/consent` might load the consent page form and `/debrief` would load the debriefing page form.  This is good organization but also helpful for debugging since you can easily jump to different sections of the task.  

## Timeline

As just described, the Vue Router is a mapping between different URLs and Vue components to load.  However, in experiments we often want to step through content sequentially.  For this purpose <SmileText /> implements a simple Timeline class (see `src/timeline.js`) which acts as a wrapper around the basic Vue Router.


The timeline class allows you to configure a sequence of routes as well as allow for routes that are not part of the sequence:

<img src="/images/timeline.png" width="500" alt="timeline example" style="margin: auto;">

Sequential routes are accessed in a chain/timeline.  Non-sequential routes are not part of that timeline.


A timeline is created like this:

```js
import { Timeline } from '@/timeline'  // @ resolves to /src in Smile
const timeline = new Timeline()
```

There are three key methods available on the timeline instance:

### `timeline.pushSeqRoute(route_obj)`

Pushes a new route (specified in `route_obj`) into the sequential timeline.
The first call to this function will make the configured route the first route in the sequence.  The second call will make it the second route in the sequence and so forth.  The format of `route_obj` is what [VueRouter](https://router.vuejs.org/) allows.

### `timeline.pushRoute(route_obj)`

This pushes a new route (specified in `route_obj`) into a nonsequential timeline.  This route will exist in the Vue router but will not be in the timeline sequence.  This is useful for configuration and debugging routes as well as routes you want to define and even link to but 

### `timeline.build()`

This should be called to construct the sequence.  It takes the configured timeline and figures out which route is the successor or predecessor of each (allowing for manual overrides using the `meta` field).

<!-- ### `buildProgress()`

This should be called as the final step.  It takes the configured timeline and configures the progress tracking (for an optional progress bar you can make visible to participants).  The progress tracking counts the total number of routes, and for the sequential routes converts the order into a percentage complete (e.g., if there were three routes each would add 33% to the total as you step through). -->

Here is an example configuring three sequential routes and one non-sequential route:

```js
import { Timeline } from '@/timeline'  // @ resolves to /src in Smile
const timeline = new Timeline()

// first route
timeline.pushSeqRoute({
    path: '/',
    name: 'welcome',
    component: WelcomeComponent
})

// second route
timeline.pushSeqRoute({
    path: '/instructions',
    name: 'instructions',
    component: InstructionsComponent
})

// third route
timeline.pushSeqRoute({
    path: '/thanks',
    name: 'thanks',
    component: ThanksComponent
})

// a non sequential route available for debugging
timeline.pushNonSeqRoute({
    path: '/config',
    name: 'config',
    component: ConfigComponent
})

timeline.build()

```

During development you can, of course, comment out certain routes to help isolate and test particular aspects of your experiment.  In addition, since routes are mapped to distinct URLs it is easy to jump between sections of your experiment during development.

Hopefully, you are thinking this sounds super easy to set up, but how do you step from one component/route to the next?  To do that we need to introduce the concept of a [stepper](#timelinestepper).  But first, let's quickly consider more complex sequential flows.

## Complex flows

Sometimes you need timeline structures a little more complex than a simple sequence.  For example, there might be multiple initial landing pages depending on if you come in from a particular [recruitment](/recruitment) service:

<img src="/images/timeline-flows.png" width="500" alt="timeline example" style="margin: auto;">

To configure this we need multiple routes (1a and 1b in the figure) to all point to the same successor.  We can do this using [Vue router meta fields](https://router.vuejs.org/guide/advanced/meta.html).  In particular, when we create a sequential route we can configure a specific successor using `meta: {next: 'some_name'}` (or predecessor using `meta: {prev: 'some_name'}`):

```js
// first route
timeline.pushSeqRoute({
    path: '/first',
    name: 'first',
    meta: { next: 'second' }, // this should jump to a specific route (by name)
    component: FirstComponent
})

// alternative first route
timeline.pushSeqRoute({
    path: '/first_alt',
    name: 'first_alternate',
    meta: { next: 'second' }, // this should jump to a specific route (by name)
    component: AlternativeFirstCompomnet
})

// second route
timeline.pushSeqRoute({
    path: '/second',
    name: 'second', 
    component: SecondComponent
})

// third route
timeline.pushSeqRoute({
    path: '/third',
    name: 'third',
    component: ThirdComponent
})

timeline.build()

```

Using this approach you can configure fairly complex flows through pages.
Importantly if you want to create alternative paths (e.g., going down one sequence if some condition is set otherwise following another) you need to configure this manually using the `meta` fields.  

The `timeline.build()` method steps through all nodes pushed using `pushSeqRoute()` and mades the `next` point to the successor and `prev` point to the previous route.  If this is not what you want (because your routes need more complex flows) you can simply omnit the `build` step.

## TimelineStepper

In each component in our router we need to call a method when that component is "finished" and allow the timeline/router to pass control to the next route in the sequence.  To do this we use the [composables](https://vuejs.org/guide/reusability/composables.html) feature of Vue.  Composables are function that let you re-use logic across multiple components.  To step to the next route in the sequence we import the TimelineStepper composable into our component and call the appropriate method when we are done.

The way to import the stepper composable into your component is:

```js
import useTimelineStepper from '@/composables/timelinestepper'
const { next, prev } = useTimelineStepper()
```

This imports the composable, then creates a `next()` and `prev()` which are functions that when they are called provides the `name` of the next route (or `null` if there is no "next" either because you are at the end of the sequence or because it is a non-sequential route).  To navigate to the next route just use the `push()` method of the router:

```js
if(next) router.push(next) // go to the next
// or instead
// if(prev) router.push(prev) // go to the prev
```


Here is a complete, simple SFC component that imports the timeline stepper and uses it to advance to the next route in the sequence when the user clicks a button (calling the `finish()` method):


```vue
<script setup>
import { useRoute } from 'vue-router'
import useTimelineStepper from '@/composables/timelinestepper'
import useSmileStore from '@/stores/smiledata' // get access to the global store

const route = useRoute()
const smilestore = useSmileStore()

const { next, prev } = useTimelineStepper()

function finish(goto) { 
    if(goto) router.push(goto)
}
</script>

<template>
    <div class="page">
        <h1 class="title is-3">Experiment</h1>
        <button class="button is-success is-light" id='finish' @click="finish(next())">next &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></button>
    </div>
</template>
```

Details about the implementation of the `useTimelineStepper` are quite simple and in `src/composables/timelinestepper.js`.

:::warning IMPORTANT (and helpful!)
One important feature of the stepper is that it calls `saveData()` on the global store prior to route changes.  So as a result you can trust that your data will be saved/synchronized with the persistant store (Firestore) whenever you navigated between sequential routes.  See the data storage does on [automatic saving](/datastorage.html#automatic-saving).  This only works if you use the TimelineStepper to advance between pages/routes.  If you call this manually you need to save manually as well using the `saveData()` method.
:::


## Running custom code before route loading

Sometimes you want to run a little bit of code prior to loading a route.  You can do this using [route guards](https://router.vuejs.org/guide/advanced/navigation-guards.html), a feature of the Vue Router.  Route guards are traditionally used to prevent navigation to a route or redirect it.  Here is an example using the <SmileText /> Timeline object.

```js
// welcome screen
timeline.pushSeqRoute({
  path: '/welcome',
  name: 'welcome',
  component: Advertisement,
  beforeEnter: (to, from) => {
    console.log(to, from)
  },
})
```

The `beforeEnter` method will run before the route is loaded.  This can be helpful for doing computation prior to the route loading.  For example, after the user consents to the study it might make sense to create a database record for them.  So we might add a special method to the route _after_ the consent form to handle that.

It is also possible to register route guards too all routes using the `.beforeEach()` method.  In `src/router.js` there is a method `addGuards()` which has examples of registering global guards.

Note that Vue Router provides a variety of lifecycle hooks that you can customize for all or individual routes.  See the documentation [here](https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow) for a full accounting of the order in which things occur.

## Testing the Timeline

The timeline has a full coverage test in `tests/vitest/timeline.test.js`.  You can run that test in isolation with

```
npx vitest timeline
```
