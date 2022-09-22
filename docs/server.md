# :electric_plug: Server-side Computations

Although most of <SmileText /> can be done completely in Javascript without any server side code, sometimes it is useful to have some of the logic from your experiment determined using Python code.  A classic example is if the interaction for the subject is with an [OpenAI Gym](https://www.gymlibrary.ml) environment.

To do this you need some type of server processing running in the cloud that executes Python code.  This can be done using [Google Cloud Functions](https://cloud.google.com/functions) which are the more general name for the [Firebase Cloud Functions](https://firebase.google.com/docs/functions) mentioned in the guide about [computing bonuses](/bonuses).