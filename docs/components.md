# :jigsaw: Components

A key to making development faster in <SmileText/> is to organize parts of the overall
user interface into smaller, modular units called **components**.  Most of <SmileText />
is developed with a component-based framework known as [Vue.js](https://vuejs.org) (version 3.0).

Using components, the meaningful parts of a complex webpage are broken down into smaller elements which are then built up into a hierarchy.  The code for these smaller elements can, in many cases, be developed completely independently from the rest of the project or webpage.  

![components](/images/components.png)


[Component development](https://www.componentdriven.org) speeds the process of designing a new experiment because you don't have to understand every part of the code in order to begin adding new interface elements and logic. 

Well-designed components are reuseable across projects so that if someone else develops a useful component you can easily import it into your project.  In addition, novel components are easily built up out of other components leveraging modularity and code resuse.  

Components are somewhat similar to the role that ["plugins"](https://www.jspsych.org/7.2/overview/plugins/) play in a library like [JSPsych](https://www.jspsych.org/7.2/) but generally JSPsych plugins handle single trials of an experiment whereas a component might be as small as a button or as big as an entire webpage or even application.  In addition, components leverage some other concepts in modern web design such as [reactivity and declarative rendering](/reactive) that make your life easier (read about these after this page).

## Vue.js components

Vue components are a method for designing modular and reusable user interfaces for the web.  

If you are familiar with traditional methods for interactive web development (e.g., [JQuery](https://jquery.com) or [d3](https://d3js.org)), components can seem quite mysterious.  However, effectively Vue components define a specific API which, when "compiled" using a build step, creates a simple Javascript function that is called to determine the behavior of a small section of an overall larger webpage.

The preferred way to develop components is using a special file format known as SFC (Single File Component).  These files end with an extension `.vue`.  The SFC files combine elements of Javascript, HTML, and CSS/SCSS into a single modular element that defines your component.  These files can be opened and processed best using the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension for [VSCode](https://code.visualstudio.com) (i.e., it provides syntax highlighting and other code formatting hints). 

Here is an example SFC file:

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

Look closely at this example and notice how this example has a `<script>` section, as `<template>` section, and a `<style>` section.  These sections define the javascript behavior, the HTML rendering, and the look/feel of the component.  These three factors are typical for interactive websites (e.g., you typically import your javascript code, and style sheet (CSS) code into your basic HTML document).  However, normally you define these for the entire page not separately for individual pieces of a larger page.  The SFC file format is the first concept I want to introduce that highlights the value of modularity since it helps you group the code for a particular part of the page together with its HTML and CSS styling.

## Using Vue components

Vue is a flexible framework and so there are many ways to use Vue components in your code.  However, frequently the first step is to create a Vue app.   Typically you create a HTML page that looks something like this:


```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/css/main.css">
  <title>My Vue demo</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>

</html>
```

and then in `main.js` you add the following code:

```js
import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

Notice that in the HTML there is a `<div>` with id set to `"app"`.  Then in the Javascript file we import `createApp` and call `mount('#app')`.  This "binds" the Vue application to that div, effectively giving control of the rendering of the contents of that `<div>` over to the application.

Notice that `App.vue` is imported at the top of the file.  Since `App.vue` is not valid javascript (it is a Single File Component) you might think this import should fail.  However, the build step in Vue compiles references such as these into simple Javascript which can be imported.



## Learning Vue

Teaching the internals of Vue.js is beyond this particular guide.  However, luckily Vue has a rich ecosystem of documentation and guides which can help (and also excellent documentation).  The following are some useful pointers:

- If you are coming to Vue with experience in jQuery this guide [comparing the two is interesting](https://www.smashingmagazine.com/2018/02/jquery-vue-javascript/).
- Vue.js explained in [100 seconds](https://www.youtube.com/watch?v=nhBVL41-_Cw)
- Vue.js documentary about the [lead developer](https://www.youtube.com/watch?v=OrxmtDw4pVI)
- The Vue.js [documentation](https://vuejs.org/guide/introduction.html)
- Official Vue.js [tutorial](https://vuejs.org/tutorial/#step-1)
- Online school for learning [Vue](https://learnvue.co)
- [LearnVue](https://www.youtube.com/LearnVue) a YouTube channel devoted to teaching Vue
- Long video with a guy walking through the [code and thinking of developing a simple game in Vue](https://www.youtube.com/watch?v=WQa9-4K3me4&t=1652s)

One very useful tool for learning about components is the [Vue Single File Component Playground](https://sfc.vuejs.org/).  On this page, you can write simple components see how they will render in real-time, and even build slightly larger components that include sub-components.  It can be useful for learning setting up <SmileText/> on your computer and even can help engage students in the research process.

## Reactivity and Declarative Rendering



## Component organization in Smile

When you start developing your own components there are a few guidelines.  First, components should be named using Pascal Case names (e.g., `StatusBar.vue` or `InformedConsentButton.vue` as opposed to `statusbar.vue` (lowercase), `statusBar.vue` (camel case) or `status-bar.vue` (kebab case)).  This is the official recommendation of the [Vue documentation](https://vuejs.org/guide/components/registration.html#component-name-casing).

Second, components should be organized into folders based on the type of role the component plays.  For this, <SmileText /> borrows from the excellent [Atomic Design](https://atomicdesign.bradfrost.com) book and notes the following types of modular elements: atoms, molecules, organisms, templates, and pages.

![atomicdesign](/images/atomicdesign.png)


In <SmileText />, the components are organized in the `src/components` directly which has the following layout:

```
├── atoms
│   ├── ColoredToggleButton.vue
│   └── NicerCheckBox.vue
├── molecules
│   ├── Search.vue
│   └── TagCloud.vue
├── organisms
│   ├── Footer.vue
│   └── StatusBar.vue
├── templates
└── pages
    ├── Advertisement.vue
    └── InformedConsent.vue
```

The following sections describe which types of components go in each folder.

### Atoms

Atoms are based UI elements like buttons, checkboxes, and other simple interface elements.  Components for these elements might add some custom look and feel to a built-in HTML component (e.g., an improved button) or add an entirely new interaction element.

![atomic design atoms](https://atomicdesign.bradfrost.com/images/content/atoms-form-elements.png)

### Molecules

In chemistry, molecules are small combinations of atoms and in the design language, they have a similar meaning.  An example molecule might compose several smaller atomic elements into a UI element that is reused in several places.  For example, a search field might include a text box for specifying the search terms and a button to begin executing the search.  These elements might be composed in a SearchButton.vue component that arranges these elements in a template and controls their local behavior.

![atomic design molecules](https://atomicdesign.bradfrost.com/images/content/molecule-search-form.png)

### Organisms

Organisms are built out of molecules and are thus more substantial elements.  A good example might be a navigation bar that appears at the top of a page or a footer.  These might combine many elements including both atoms and molecules.

![atomic design organisms](https://atomicdesign.bradfrost.com/images/content/organism-header.png)

### Templates

Templates break the chemistry analogy but are basic structures that can be referred to for other roles.  For example, a template might show how to build a page.

![atomic design templates](https://atomicdesign.bradfrost.com/images/content/template.png)

### Pages
Finally, pages are components that lay out the overall arrangement and style of an overall page.  They would likely combine several organisms (a navigation bar, a footer, a menu system) as well as other elements like buttons, text, etc...

Based on what type of component you are developing, place the corresponding component file in the correct folder.  This will help you stay organized and help other users of your code know where to look to find an element they might like to reuse in their projects.

![atomic design pages](https://atomicdesign.bradfrost.com/images/content/page.png)