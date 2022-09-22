# Front End Research Notes


Front end has to do with 
- Development — what modularity system do we want to use to enable more cross-talk and sharing?
- Deployment — after you make your app how do we make it as seamless/zero commands as possible to send it up to the web?
- Testing — how do we start to integrate unit testing and other testing frameworks into the UI of our experiments so they are more reliable?
- Configuration — how do we configure each experiment to customize it’s global settings
- Code version linking: all data records from an experiment should record which version of a code base was run (e.g., github commit hash) for replicability/bug tracking
- Recruitment — how do we make it possible to recruit and run with any arbitrary recruitment platform including Mechanical Turk, Prolific, a custom citizen-science type page, Facebook/Instagram/Twitter/Google ads, etc…

### Possibilities:
- Custom javascript (ala psiturk.js)
- raw [jQuery](https://jquery.com)
- [d3.js](https://d3js.org)
- [jsPsych](https://www.jspsych.org/7.2/)
- [Vue](https://vuejs.org)
- [React](https://reactjs.org)
- [Angular](https://angular.io), etc…
- gaming libraries like [Phaser](https://phaser.io) (pam!), [Unity](https://unity.com/pages/unity-pro-buy-now?gclsrc=aw.ds&gclid=CjwKCAjw7IeUBhBbEiwADhiEMZ_9Fmbg4yKNAO_c1TU6kpAGm8Ufkn_OXML91pG_WWKpUtaLsNEW3BoCBuYQAvD_BwE) (Ili! Guy!), etc…
- something else?

*One comment about frontend: It is likely that in 1-5 years python will become a more viable front end language due to recent advances in WebAssembly possibly leading to a shift away from Javascript.  However, Javascript is so big that will be a slow evolution and so I’m still comfortable with going Javascript here.*