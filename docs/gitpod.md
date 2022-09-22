#  <img src="/images/gitpodlogo.png" width="40" align='left' style="padding-right: 5px;"> Pre-configured development environment using Gitpod

Installation of the [required software](/requirements) for most recent computers should be straightforward.  However, <SmileText /> also has been configured to run on [Gitpod](https://gitpod.io), a development environment that runs in the cloud.  Using Gitpod doesn't require any software to be installed on your local computer and everything is set up for you (in fact you can run and interact with Gitpod with an iPad!).

<a href="https://gitpod.io"><img src="/images/gitpod-full.svg" align="center" style="margin: auto; padding-bottom: 30px" width="250"></a>

The downside of this approach is that Gitpod costs money if you exceed the 50 hours of run time for any of your development projects.  That is why it usually makes sense to install things locally.

However, it can be really helpful to collaborators/students or when you are away from your main computer to use the cloud-based editor which provides almost all the features you need for local development with zero configuration.

:::info
Gitpod and Github provide discounts to students.  For example, at the time of this writing, the GitHub student developer pack includes 6 months of free Gitpod access at a slightly higher plan than the free one: https://education.github.com/pack
:::


Getting started using Gitpod is exceptionally easy, but there are two cases to consider depending on if you are joining to [collaborate on an existing, configured project](#you-are-using-gitpod-to-collaborate-on-an-already-existing-project-repository) or creating a [new project from scratch](#you-are-using-gitpod-to-begin-an-entirely-new-project-based-on):

## You are using Gitpod to collaborate on an already existing project repository

If you are joining an existing project which has already been configured and set up it is easy to get started (there are only two steps!).

### Step 1: Navigate to your <SmileText /> repository on github.com

Go to the webpage of your repository (e.g., `https://github.com/gh_user/my_smile_project`).  

Next, edit the URL of the page in your browser to prefix with `gitpod.io/#` and press Enter (e.g., `gitpod.io/#https://github.com/gh_user/my_smile_project`).  

If this is your first time using Gitpod, it will ask you to log in to Github (click "Contiue with GitHub"):

<img src="/images/gitpod_step1.png" align="center" style="margin: auto; padding-bottom: 30px" width="400">


Next it will request permissions to link Gitpod and your Github account:

<img src="/images/gitpod_step2.png" align="center" style="margin: auto; padding-bottom: 30px" width="450">

You then are asked to choose which editor you will use.  It is recommended to choose VSCode (browser) which is the default choice as VSCode has specific extensions that help with <SmileText /> development.

<img src="/images/gitpod_step3.png" align="center" style="margin: auto; padding-bottom: 30px" width="350">

Next, if the repository you are working on is set to 'private' on Github, you may get an error message.  You will need to click "Grant Access" to given Gitpod access to your private repositories:

<img src="/images/gitpod_step4.png" align="center" style="margin: auto; padding-bottom: 30px" width="350">

Finally verify on Github that Gitpod should have access to your private repositories:

<img src="/images/gitpod_step5.png" align="center" style="margin: auto; padding-bottom: 30px" width="350">

Once this is done, the system will start to build your project for the first time.  While the system is building you will then see a page that looks like this:

![Gitpod loading page](/images/gitpod-loading.png)

After it loads you get a full-featured version of VSCode in your broswer that looks like this:

![Gitpod loading page](/images/gitpod-vscode.png)

A couple of notes:
- The system launches with the `npm run dev` command already executed in the terminal at the bottom (see [developing](/developing) for details) so you can see the live website in a VSCode side panel.  Click the small square in the top right corner to break that window off into a new tab.  This view of your project in developer mode should hot reload as you make changes to your code.

- You can install additional VSCode packages, run additional `npm run` commands, start terminals, and interact with the project exactly as it would be on your personal computer.  

- Files that you change and want to share with others should be committed using `git`.  Files you change in the project folder (`/workspace`) but have not committed are saved and will reappear between starts and stops of the project.  Workspaces are deleted after 14 days of inactivity.

- Click the green "Gitpod" logo in the lower right of the interface to bring up Gitpod-specific commands including starting/stopping the computing node (which you should do when you are done working to save compute time).   The node will automatically time out after 30 minutes of inactivity.  Full information about workspaces is available [here](https://www.gitpod.io/docs/life-of-workspace).

The Gitpod [docs](https://www.gitpod.io/docs) are generally good including some helpful [videos](https://www.gitpod.io/screencasts).  You can customize several aspects of your development environment by changing the `.gitpod.yml` file or `.gitpod.Dockerfile`.

### Step 2: Obtain a copy of .env.local

To develop a <SmileText /> project, you need to have an `.env.local` file in the `env/` folder.  The easiest way to get this is to contact either Todd (if you are a core lab member), or your mentor if you are a research assistant in the lab.  This file contains the access options for saving data into the lab database.

## You are using Gitpod to begin an entirely new project based on <SmileText />

If you are starting an entirely new project using Gitpod the instructions are similar.  There are just a few extra steps to clone the base repository and to configure your [deployment](/deploying).

### Step 1: Clone the <SmileText /> template to a new repository

Navigate to the base <SmileText /> repo (https://github.com/NYUCCL/smile).  You should see a large green button that says "Use this template":

![clone the repo](/images/github-clone.png)

Click it and follow the instructions for setting up a new repo under your personal Github account.  Choose a unique name for the repo, and add a description.  It is up to you if you want to make the repo public or private (this can be changed later).

![clone the repo](/images/github-clone2.png)

Github will immediately navigate you to your new repository.

### Step 2: Open your new repository on Gitpod

Click the web address in your browser and add the word `gitpod.io/#` to the front of your project URL:
For example, change `https://github.com/gureckis/smile_test_2` to `gitpod.io/#/https://github.com/gureckis/smile_test_2`.

This will spin up a pre-configured compute instance.  You can follow the instructions [above](#step-1-navigate-to-your-repository-on-github-com) for setting this up then come back.


### Step 3: Configure your git secrets and deployment options

- To develop locally you need to decrypt the secret environment files 
(INSTRUCTIONS TBD)
- For automated deployment to work correctly you need to, at least once on some machine someplace, run `npm run upload_config` in your project repo.  It doesn't have to be specifically on the Gitpod instance but whoever first configured/cloned the repository should configure the deployment settings.
