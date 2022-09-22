# :writing_hand: Contributing to the documentation

This project takes a "docs first" approach by first planning the development in the documentation
and then working on implementation.  Thus, the place to start is by contributing to the docs.  **It's easy
and fun.**

The docs are developed with [Vitepress](https://vitepress.vuejs.org) which is super awesome.

Make sure you have followed the steps on the [Getting started](/gettingstarted) page.

Things are still evolving but after cloning the repo you should get a directory listing like this:

```
.
├── LICENSE
├── README.md
├── docs/                 <- docs are in here
├── index.html
├── node_modules/         <- appears when you run `npm install`
├── package-lock.json
├── package.json          <- useful to take a look at
├── public/
├── src
│   ├── App.vue
│   ├── assets
│   ├── components/
│   └── main.js
└── vite.config.js
```

The documentation lives in the `docs/` folder.

## Development
To develop the docs in real time type `npm run docs:dev` in the top level project folder.  You should see something like this:

```
➜ npm run docs:dev

> smile@0.0.0 docs:dev
> vitepress dev docs

vitepress v1.0.0-alpha.1

  > Local: http://localhost:3000/
  > Network: use `--host` to expose
```

In this case, opening `http://localhost:3000/` in your browser (it might be a different number if port 3000 on your computer
is already in use) will let you see the current documentation website.

Now let's look at the current files in the `docs/` folder:

```
docs
├── .vitepress
│   └── config.js
├── contributing.md
├── index.md
├── introduction.md
├── manifesto.md
└── notes.md
```

The docs are written in [plain markdown](https://vitepress.vuejs.org/guide/markdown.html).  Just edit or add
new `.md` files as you like.  You can also add new subfolders.  To add them to the side bar or nav bar at the top take a look inside
`docs/.vitepress/config.js`.  It is mildly self-explanatory (full docs [here](https://vitepress.vuejs.org/config/introduction.html)).
Vitepress is under active development but quite functional.

One cool thing about running `npm run docs:dev` is the website uses [hot module reloading](https://vitejs.dev/guide/features.html#hot-module-replacement) so any changes you  save to the markdown or configuration files will automatically update your browser giving you instant feedback.  It is incredibly
fast thanks to Vite.

When you are finished making changes to the docs just use git commands to stage the files, commit them and (when you are ready) push
them to the github repo.  There are several useful tutorials available online for using git and GitHub.

## Technical Figures

We strongly encourage the use of [Figma](https://www.figma.com)/FigJam for technical figures and illustrations.  A good starting place is the [Diagram basics in FigJam](https://www.figma.com/file/0CutmCGEhR20glush9sKze/Untitled?node-id=0%3A1).

## What happens next?
Currently, the docs are live at [http://smile.gureckislab.org](http://smile.gureckislab.org).  When you commit changes to the `docs/` folder in the `main` GitHub branch, a Github Actions script runs which automatically builds the static website using VitePress and then syncs the files to the server.  **Thus, simply pushing your changes to the master branch will update the website, there's nothing else to think about.**  This is a core design principle of **🫠 Smile**: [don't sweat the dumb stuff](/principles.html#don-t-sweat-the-dumb-stuff).


 If the build fails on the Github Action the website will remain unchanged.  You can get diagnostic information about the auto-deploy process on the [Github Actions tab](https://github.com/NYUCCL/smile/actions) of the repo.  If you suspect your changes to the docs introduced a bug that was not caught by the development server, you can check the build process locally by running `npm run docs:build`. 