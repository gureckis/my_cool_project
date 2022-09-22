# :disguised_face: Design Principles

The design of online experiments (and webpages in general) requires a lot of complex choices.  The goal of <SmileText/> is to make sensible choices as much as possible so you don't have to think about things.  Experience developing psiTurk is instructive in many ways.  Reflecting on this leads to several design principles that you should keep in mind while contributing to this project:

[[toc]]

## Our goal is to write error-free experiments, happily.

The first point is that we want to write high-quality code which is bug-free while smiling the whole time 🫠 (and not melting too much).  We need to do this because we have a moral obligation both in our scientific papers and to our participants to not have mistakes in our empirical data collection.  Messing up a model code is bad but at least you didn't waste the time of 1000 subjects and the money of taxpayers [^moral].  All the subsequent principles are ultimately in the service of this one.

A great article with tips on this by Rouder, Haaf, and Snyder is available [here](https://journals.sagepub.com/doi/10.1177/2515245918801915).

[^moral]: This shouldn't be interpreted as pressure to hide bugs when they happen.  An even more important factor there is humans are humans, bugs happen, and we should fix them and move on even if costly.  The goal actually of this project is to lower the costs and roadblocks that face us as humans.  It's not life or death here.  The moral imperative is higher for honestly fixing things!

## No code is the best code.

> Jeff Atwood: “the best code is no code at all. Every new line of code you willingly bring into the world is code that has to be debugged, code that has to be read and understood, code that has to be supported. Every time you write new code, you should do so reluctantly, under duress, because you completely exhausted all your other options.”

In trying to keep things simple and easy to maintain it is helpful to keep this old programmer lore in mind.  Of course, code has to be written but simple and intuitive is helpful.  Perhaps the biggest example of this is reactive programming where you simply define how your website component should *look* and then the state is updated automatically when things change.  Or like if data needs to be saved from an experiment do it automatically in the background with some fault tolerance rather than asking the experiment designer to think about this.

## Don't sweat the dumb stuff.

There are a lot of stupid things you need to do in developing and deploying slightly complex software.  These things include uploading your files to the server, etc...  Your daily time as a developer of your experiment is better spent on the code itself and all this stuff should be worked out in advance with reasonable settings by <SmileText/>.  

Here's an example.  In the past with psiTurk you called `psiturk.saveData()` when you wanted to push the current data from your experiment to the database.  You might do this multiple times in the task, often at the end of a block of trials.  However, it could make sense to engineer this so it happens automatically.  Now you as the task developer don't have to think about when to save the data, you can trust that it has been worked out for you and it means you have one less thing to think about (or possibly forget!).[^forget]

[^forget]: This has happened.   Once because a student didn't know they needed to call the save data function and another time because they forgot to do it.  The fact that this happens is an indication that something is wrong in a way since there's no point to doing an experiment where you don't save the data so why should you even need to think about it?  Think about it -- you are using a package to help you make experiments and saving the data is left to you as an **option**? :monocle_face:

Another example is the [15-step process](https://psiturk.readthedocs.io/en/latest/tutorials/heroku.html) to deploy psiTurk to the Heroku cloud.  Instead, it would make sense for reasonable choices to be made about the configurations and all this to happen in the background, automatically.


## Don't repeat yourself.

This is known as D.R.Y.  This means you shouldn't have copies of your code in two places.  If you are cutting and pasting the same things lots of time then you should abstract that function into something more reusable.  This way updates to the common part will spread across all the uses.

## Abstraction is your friend.

Related to D.R.Y. is when something becomes useful enough it should be abstracted into a component, object, or plugin that can be reused by others.  As one example of a failure, in the first version of psiTurk we envisioned most of it working using a command line.  This meant that we had a command-line shell interpreter that made direct calls to Bobo (the library that interfaces to Amazon Web Services).  Later we wanted to make a web dashboard GUI to replace the command line.  However, we had to go back and re-abstract the Mechanical Turk function into a more general class that could be used by *either* the command line or the front end.  In the first place, it would have made sense to do that abstraction.  Lesson learned.


## Limit choices so that the only options are to do things correctly.

People hate having to make choices.  It is exhausting and you never are quite sure if you did the right thing.  If possible narrow choices so there is just one (a default) or if you need options keep them reasonable.  psiTurk has suffered from the desire to be all things to all people.  As an example, you can run it locally or on Heroku or AWS.  There are instructions for all these options, each being more complex than the next.  It'd make more sense if there was just a choice made and everyone lives with it.  New users hate this complexity and you are just forcing it on them instead of making the hard decisions yourself.

## Keep learning.

Learning things is hard.  It hurts your head and is an unpleasant feeling when you don't understand things 🙇.  Also, it can be hard to know if the thing you are learning about is really what you need to know to solve your problem.  My recommendation is to push through and always be learning.  There's a good chance that the problem you think you have has already been solved and you just don't know the right words to put into Google to find the solution.  Or there is an important concept you are missing that would make your life much easier.

## Documentation first.

Documentation is often considered to be something you do after you finish writing your main code.  However, this is one reason things are never adequately documented.  When you are writing your code is the best time to write down the steps you took, the research you did (links to URLs, etc...) and the overall design considerations you were trying to achieve.  These notes can be edited later to make useful, stable docs for a project.  So do the docs then write a little code, then do more docs, and more code, etc...  Also writing documentation is a check on yourself -- is what you are doing too complex to explain?

## Data must always be linked to the code that created it.

Modern software development largely happens using version control software like git/GitHub.  This is incredibly helpful for keeping track of changes, collaborating, and documenting code as it is developed.  However, version control also offers the potential of linking empirical data generated using a software program to the exact version of the software used to create it.  This is helpful for several reasons.
First, this makes it trivial to limit data analyses to participant data from particular code versions (e.g., removing subjects affected by a bug without looking inside their data file).  Second, this is helpful for replicability since when you share your data and code other scientists can go back and realize if a bug affected only a subset of participants. In <SmileText/>, a key design goal is to always provide a way to link the current code version history to datasets generated from that code.  This should happen automatically so that users don't forget this important step.

## Trust in useful third-party services but don't tie yourself to them.

There are a lot of options on the web about how you host things or store data, etc...  It makes sense to use these services but not to tie the code to them too closely.  As one example of a lesson learned, it's ok to use fancy and specific GitHub or Google features in your application as long as you have some plan for what happens if those services are discontinued.  Often time the principle of [abstraction](#abstraction-is-your-friend) can save you here.

## Automate testing.

Having bugs in your experiment code is actually one of the worst things we can do (see [error-free code](#our-goal-is-to-write-error-free-experiments-happily)).  It corrupts our measurement, leads to false findings in the field, and wastes our participant's time and energy.  However, stopping bugs is complicated.  Perhaps the best guard against the unintended consequences of changes in a complex code base is unit tests and integration tests.  Use them.  Smile aims to remove some of the cognitive load of other aspects of experiment design so you can focus on being bug-free as much as possible.

## Don't try to solve every possible problem.

Deciding what things Smile can do and what things it shouldn't (i.e., project scope) can be hard.  It can be a matter of taste.  psiTurk tried to do a lot (front-end development, server-side code, Mechanical Turk API).  It is useful to pull these services together but made things somewhat complex.  A better solution is to find the natural break points in how other people develop systems.  Have pieces that are small and manageable that can be shared between projects.

## Spend time setting up your development environment.

Modern web development tools are outstanding.  Become familiar with syntax highlighting, automatic code completion, linters, and other debugging packages to make your life better.  These have a learning curve (see principle about [learning](#sometimes-learning-1-seemingly-complex-thing-makes-everything-you-do-10-faster)), but the payoff can be dramatic not only in productivity but in writing high-quality error-free code.  For this project it is recommended you use [VS Code](https://code.visualstudio.com/) and the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension as your development environment.