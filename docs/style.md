---
head:
  - - link
    - rel: stylesheet
      href: "/css/bulma.min.css"
---

# :artist: Styling, CSS, and Icons

Styling the look and feel of your experiment elements is often a time-consuming process.  However, it is worthwhile because participants are likely to view your task as more professional, user-friendly, and engaging if there is an appealing design.

In modern web design, the look and feel of an application are determined jointly by three types of files: HTML (for the basic structure/content), CSS (for the style/colors/shapes/spacing), and Javascript (for the dynamic interaction, clicking, dragging, etc...).[^vue]

[^vue]: Interestingly these are roughly the same as the three sections of a [Single-file Component in Vue](/components). 

In this document, we will focus mostly on the CSS side of things: how you make things look nice by choosing colors, layouts, spacing, and typography for your experiments.  If you are entirely unfamiliar with the term CSS or Cascading Style-Sheets it might help to read this nice chapter from [Interneting is Hard](https://www.internetingishard.com/html-and-css/hello-css/) before continuing.

## Global design framework: Bulma

The components in <SmileText/> by default use the [Bulma](https://bulma.io) CSS framework.  Bulma is a free, open-source framework that provides simple components that help you build [responsive](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) web interfaces.

It is already included in the main <SmileText/> application framework so there is nothing you need to do to use it in your components.

At its core, Bulma provides a set of CSS classes that you can apply to your elements to help quickly style your display.  (It is similar to [Bootstrap](https://getbootstrap.com) and [Tailwind](https://tailwindcss.com) if you have used these before.) 

:::danger Bulma does not include Javascript!
Bulma doesn't provide Javascript so it is up to you to define the interactive logic of elements in your application.  For instance, Bulma provides a pop-up [modal element](https://bulma.io/documentation/components/modal/) but you need to use Vue to toggle showing/hiding this element.
:::

For example, if you are building a form and using a default button tag element:

```html
<button>Click me</button>
```

it renders as this when no styles are applied at all: 

<button style="all: revert">Click me</button>

This looks kinda plain and boring compared to users' expectations about Facebook or Google, or e-commerce sites.
You can easily convert this default button to add Bulma's button styling by adding the class "button":

```html
<button class="button">Click me</button>
```

<button class="button">Click me</button>

which makes the button larger, easier to click, adds a hover state, etc...

Bulma styles are semi-compositional in that you can apply various styles incrementally to elements.  For example, we can make the same type of button blue by adding the `is-primary` class to the list:

```html
<button class="button is-primary">Click me</button>
```

<button class="button is-primary">Click me</button>

or red adding `is-danger`: 

```html
<button class="button is-danger">Click me</button>
```

<button class="button is-danger">Click me</button>

or we can make it small and yellow:

```html
<button class="button is-warning is-small">Click me</button>
```

<button class="button is-warning is-small">Click me</button>

or big and green:

```html
<button class="button is-success is-large">Click me</button>
```

<button class="button is-success is-large">Click me</button>

You can read the full Bulma documentation on button elements [here](https://bulma.io/documentation/elements/button/)
which demonstrates many of the options.

These examples show how classes mix together to determine the final design.
This is a key to using Bulma effectively.  Instead of writing CSS, you can often get custom options by mixing together pre-existing classes to determine the look and feel that you want.

:::info Semantic Classes in CSS
Semantic classes in CSS refer to the idea that a "success" button should probably be some shade of green since it 
conveys to the user "go"/"good" and that a warning/danger button should be red.  In Bulma, instead of 
styling an element using raw CSS (e.g., `background-color: red;`) you style it with the add-on class 
`is-danger` which has been defined by the theme to make it a red-ish color.  This captures the 
visual semantics that most people anticipate.
:::

### Limiting choices
One of the key purposes of Bulma is to help limit your design choices while making those choices easy.  When you make a button using raw CSS often you have to decide the color, size, etc... of elements.  Getting consistency (i.e., making an overall "theme" for your page) and also making choices users anticipate 
can be hard.  Instead, Bulma gives you nice-looking defaults for many semantic purposes easily 
(`is-primary`, `is-success`, `is-warning`, etc...) each assigning colors to elements in line with common functions. 

### Customization with composition

Another key principle is the use of multiple CSS classes together to compose a custom design.  For example, the preferred way to format a set of text (e.g., in some instructions) is to wrap it in a `<p>` (paragraph) tag.  However, you can control many aspects of that text easily in Bulma.  For example, this will set up a plain paragraph of text:

```html
<p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>
```

<p style="all: revert">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>

But using modifiers you can change the alignment to be centered:

```html
<p class="has-text-centered">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>
```

<p class="has-text-centered">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>

Making it larger:

```html
<p class="has-text-centered is-size-5">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>
```

<p class="has-text-centered is-size-5">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>


Add a large margin on the left to indent and on the top to add space:

```html
<p class="has-text-centered is-size-5 ml-6 mt-6">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>
```

<p class="has-text-centered is-size-5 ml-6 mt-6">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odio nam itaque accusantium amet iste, ipsum, corrupti laudantium vero tempora velit possimus dolorum libero eaque perspiciatis harum quibusdam fugiat? Nemo.
</p>


There are many other classes provided by Bulma covering spacing, color, and more:
- [Colors](https://bulma.io/documentation/helpers/color-helpers/) - e.g., `has-background-grey`, `has-background-light-grey` etc...
- [Typography](https://bulma.io/documentation/helpers/typography-helpers/) - e.g., `is-size-1`, `is-size-7`, `has-text-centered`, `has-text-left`, etc...
- [Spacing](https://bulma.io/documentation/helpers/spacing-helpers/) - e.g., lets you quickly add padding and margins to the elements (e.g., `mb-4` adds 4 pixels of margin to the button, `pt-6` adds 6 pixels of padding to the top, etc...)
- [and many more...](https://bulma.io/documentation/helpers/)

### Columns

In addition to styling individual elements using CSS helper classes, Bulma includes a very intuitive way to configure [responsive columns of content](https://bulma.io/documentation/columns/basics/).  Columns are responsive in that if you have multiple side-by-side columns then the browser window becomes too small then they re-organize into a column.  You can see an example of this in action on [gureckislab.org](https://gureckislab.org) where the landing page has several columns of options on a desktop-sized browser but if you make the window very thin (as would be in a mobile phone) the columns are re-organized into single stacked columns.

For example, this little snippet shows off a simple two-column design mechanism as well as different types of tags:

```html
<div class="columns">
    <div class="column">
        <span class="tag is-black">Black</span>
        <span class="tag is-dark">Dark</span>
        <span class="tag is-light">Light</span>
        <span class="tag is-white">White</span>
        <span class="tag is-primary">Primary</span>
    </div>
    <div class="column">
        <span class="tag is-link">Link</span>
        <span class="tag is-info">Info</span>
        <span class="tag is-success">Success</span>
        <span class="tag is-warning">Warning</span>
        <span class="tag is-danger">Danger</span>
    </div>
</div>

```

which will render as: 

<div class="columns">
    <div class="column">
        <span class="tag is-black">Black</span><br>
        <span class="tag is-dark">Dark</span><br>
        <span class="tag is-light">Light</span><br>
        <span class="tag is-white">White</span><br>
        <span class="tag is-primary">Primary</span><br>
    </div>
    <div class="column">
        <span class="tag is-link">Link</span><br>
        <span class="tag is-info">Info</span><br>
        <span class="tag is-success">Success</span><br>
        <span class="tag is-warning">Warning</span><br>
        <span class="tag is-danger">Danger</span><br>
    </div>
</div>

The key to the columns format it to create a `div` element with class `columns` and then include any number of sub-divs with class `columns`.

```html
<div class="columns">
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>
```

You can control [relative sizes of columns](https://bulma.io/documentation/columns/sizes/) (e.g., adding the modifier `is-three-quarters` or `is-half`) as well as the [gap](https://bulma.io/documentation/columns/gap/).  Complete documentation of columns mechanism is [here](https://bulma.io/documentation/columns/).



## Customizing Bulma

Although the key upside of Bulma is that it limits your design choices while making it easy to build nice-looking interfaces, you sometimes might want to customize things globally.  For example, perhaps the default `is-primary` color is too "aquamarine" for you and you'd like it to be pinkish.

If so you can do this by overriding basic [SASS](https://sass-lang.com) definitions in the `sass/mystyles.scss` file.  Refer to that file for some examples as well as read the Bulma docs for the definition of [customizable](https://bulma.io/documentation/customize/) SCSS variables](https://bulma.io/documentation/customize/).

After you make edits to this file you need to "rebuild" Bulma's css files.   This sort of "compiles" the default Bulma theme, plus any of your customizations into a new Bulma library. To do this you run the following command:

```
npm run css-build
```

This will generate a new output file `css/styles.css` (which is not version tracked because it is a computer-generated file).

This command **is** run as part of the [deployment process](/deploying) so you can be sure that changes here will be reflected on your live site even though `css/styles.css` is not version tracked.

A related command is `css-watch`

```
npm run css-watch
```

which continually rebuilds the CSS from SASS as changes are made (so you can see them in your development browser quickly).

## Customizing CSS

In addition to customizing Bulma (e.g., overriding defaults in bulma or adding new options), you can also add global css classes to `css/main.css`.  This file includes the Bulma-generated `css/styles.css` and then appends additional options.  Adding things here apply to _all_ your components and/or pages, so it is a global option similar to modifying the default Bulma theme.  

:::info  Where is the best place to make global style changes?
Whether you override a Bulma setting (or add a new setting in the `sass/mystyles.scss`) or directly in the global CSS file (using `css/main.css`) is up to you.  Some people are more familiar with CSS than the SCSS language used by Bulma.  Also modifying `css/main.css` doesn't require the build step.  Generally, it makes sense to use CSS to add styles and the SCSS to override or modify the Bulma theme.
:::

## Component specific stylesheet

In addition to global styles, you can add component-specific styles to your components.  In Vue, each Single-File Component includes an optional `<style>` section.  If you define it like this:

```vue
<style scoped>
.mydivstyle {
    text-size: 1.1em;
}
</style>
```

then the style `.mydivstyle` will **only** apply to the current component.  This is helpful in case there are other components that use the same class name that you might interfere with.  For example, you might decide on a style for your component called `bigtext` to configure very large font sizes.  But if another component uses that same name you'll possibly change the look and feel of that component.  `scoped` thus allows you to apply styles specifically to a given component and is preferred.

However, you can modify the global styles as well if you leave out the `scoped` command:

```vue
<style>
.mydivstyle {
    text-size: 1.1em;
}
</style>
```

In this second case, `mydivstyle` applies to **all components** in the application (similar to if it was added to `css/styles.css` or `scss/mystyles.scss`).

## Custom fonts

Fonts are an important part of web design.  Although the defaul Bulma theme includes some nice, professional-looking font choices you may want to use custom fonts in your experiment to highlight certain elements or convey a sense of fun, style, etc...

Perhaps the easiest way to add fonts is to search to Google Fonts [website](https://fonts.google.com).  This includes a huge number of web-compatible fonts that are free.  The following screen video shows how to search and find the correct URL for including a google font in your project:

<video autoplay loop controls="controls" width="600" name="using google fonts">
  <source src="/videos/googlefonts.mp4">
  This browser does not display the video tag.
</video>


The final copied import command is something like this: 

```css
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
```

which you can simply paste a the top of either `sass/mystyles.css` (then rebuild the css, see above) or `css/main.css`.

To use the font in your application you will need to define a custom CSS class and set the font accordingly:

```css
.mydiv {
    font-family: 'Pacifico', cursive;
}
```

Refer to the final screen of the movie above to see that Google provides you with what you need to put in this string for your particular font.

## Icons and emoji

It is often helpful to use icons and emoji in your designs.  These help given symbolic reference to things and add to the feeling that the website was "designed".  There are a couple of approaches here.  The first is to use traditional emoji that are similar to the ones you see in text messaging programs and are built into the operating system 👋.  To do this just use your emoji keyboard (on Mac choose Edit->Emoji & Symbols).  These are embedded as unicode symbols and are interpreted by most modern Macs and PCs.  However, [recently new emojis have been added that are not available on all operating systems or devices](https://www.engadget.com/apple-ios-37-emojis-melting-face-troll-130554838.html) so it is not the preferred approach.

A better approach is to include custom icons that are loaded into the webpage (i.e., don't require the local computer to locally interpret).  There are many free or commercial icon libraries out there but one of the popular ones is called [FontAwesome Icons](https://fontawesome.com/icons/square-check?s=solid) (free).  FontAwesome includes custom icons for many more things than there are emojis and even include icons for common brands, etc...  FontAwesome includes some icons for money but there are a variety of free icons.

The <SmileText/> system includes a Vue component tied to FontAwesome which is registered globally (meaning available to all components).  The component name is `<FAIcon />` which is registered globally in `src/main.js`.  Anywhere you write `<FAIcon/>` in your template will attempt to display a particular icon.  You choose *which* icon using a prop:

```html
<FAIcon icon="fa-solid fa-book" />
```

Here `fa-solid` is the library type and `fa-book` displays the book icon.


### Adding new icons

To save space, FontAwesome loads only the icons you need for your project.
This is configured in `src/icons.js`.  Search for icons on the FontAwesome site [here](https://fontawesome.com/search?m=free&s=solid).
Make sure you have the "free" toggle checked so you don't search for icons that cost money on their
plan:

![](/images/font-awesome-search.png)

When you find an icon you like click on it and FontAwesome will show you the name of it.
For instance this address book icon:
![](/images/font-awesome.png)

has the name `fa-solid fa-address-book`.  The `fa-solid` part refers to the fact that the icon belongs to the 
"solid" FontAwesome library.

Next to use the icon in your experiment you simply refer to it in your Vue template:

```html
<FAIcon icon="fa-solid fa-address-book" />
```

Finally, you need to import that specific icon into the project.  Open `src/icons.js`.  Add a line like
this to important the address book:

```js
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
```

Notice how the FontAwesome website listed the name as `fa-address-book` (known as kabob case) but to import it in Javascript you use the Camel case version (`faAddressBook`). Sorry, computers suck (this is a [thing](https://vuejs.org/guide/essentials/component-basics.html#case-insensitivity) in Vue).
Finally, at the bottom of the the `src/icons.js` there is a command to register the imported icon with the library:

```js
library.add(
  faAddressBook,
  ...
)
```

Make sure you add the newly important icon here to use it in your project.  Also, it is a good idea to check this icon hasn't already been 
imported by searching the file.

The full docs for the FontAwesome Vue library is [here](https://fontawesome.com/docs/web/use-with/vue/).


## Custom UI components

Sometimes you need slightly more complex UI elements than the default HTML set of buttons, checkboxes, tables, etc...  <SmileText/> includes the [Bulma extensions](https://bulma.io/extensions/) package which adds some additional UI elements like sliders, steppers (show how many steps there are to a form), etc...

And, of course, you can create custom components yourself (simple UI elements often are considered [Atoms](/components#atoms) in the design organization of <SmileText/>).

