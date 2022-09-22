# Overview

In terms of desiging our system and choosing the technology stack it is helpful to divide up three tasks which previously were all handled by psiTurk:

1. **Front end** stuff means things in the browser that the subject interacts with.  This is where you as experimenters spend most of your time, creativity, and effort.

2. **Back end** refers to databases and other things which manage and export data.  The hope is we develop a useful backend which you rarely need to mess with much except for in rare, specific cases.

3. **Service integrations** refers to interfacing with Amazon Mechanical Turk, Prolific, or other crowdsourcing websites.

Unlike psiTurk Smile will separate these concerns.

The following pages contain research notes and design ideas:

- [Back-end research document](/research/backend)
- [Front-end research document](/research/frontend)