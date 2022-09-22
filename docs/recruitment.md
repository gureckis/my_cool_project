# :raising_hand: Recruiting Participants

The first step in recruiting participants is to get the URL for your study. If you're in the Gureckis Lab, the easiest way to do this is through the `#smile-deploy` slack channel. Find the message for your most recent commit, which will look like this:

![Slack URL](/images/getURL-slack.png)

The URL for your study is the second one (`https://exps.gureckislab.org/e/note-useless-uncle` in the example above).

## Prolific

### Posting your study 

From the Prolific dashboard, either click ‘New study’, or duplicate a previous study from within the ‘Completed’ tab on the sidebar (click ‘Action’, then ‘Duplicate’).

Describe your study in the first section:

![Prolific study description](/images/prolific-step1.png)

In the second section, you provide the study link for your participants. When Prolific sends participants to this URL, it can pass three variables: PROLIFIC_PID (unique to the participant), STUDY_ID (unique to the study), and SESSION_ID (unique to the participant and study). To record these variables, we need to add to the end of the study URL. 

First, we need to direct participants to the Prolific welcome page, so we add `#/welcome/prolific/` to the end of the URL.

Then, we need to record the variables from Prolific, so we add: `?PROLIFIC_PID=[[%PROLIFIC_PID%]]&STUDY_ID=[[%STUDY_ID%]]&SESSION_ID=[[%SESSION_ID%]]` to the end of the URL.

So the final URL you give Prolific should look like this:

`https://exps.gureckislab.org/e/note-useless-uncle/#/welcome/prolific/?PROLIFIC_PID=[[%PROLIFIC_PID%]]&STUDY_ID=[[%STUDY_ID%]]&SESSION_ID=[[%SESSION_ID%]]`

Here's how you enter that in Prolific:

![Prolific study link](/images/prolific-step2.png)

Next, you need to tell Prolific how to end the study. Smile automatically redirects participants to Prolific when the study has completed (as long as you include `#/welcome/prolific/` in the URL, which directs participants through the Prolific version of your study). So you shoud select "I'll redirect them using a URL":

![Prolific end study](/images/prolific-step3.png)

The completion code doesn't have to be anything in particular. Smile is configured to produce a random completion code specific to each participant, based on a hash of the participants' data file. This can be used to verify that each participants' completion code matches their data (e.g., to prevent completion codes from being shared with people who didn't actually complete the study). As a result, however, the completion code submitted by participants will not match the completion code on Prolific. This is fine -- you can still auto-approve all participants when the study is completed. However, if you want to reject participants who have the incorrect completion code, you may need to do so manually.

You can override the completion code provided by Smile by editing `ThanksPage.vue`.

Next, you need to specify your sample. It can sometimes be helpful to screen out participants with a low approval rate or who are very new to Prolific:

![Prolific participants 1](/images/prolific-step4.png)
![Prolific participants 2](/images/prolific-step5.png)

Finally, you should enter how long your study takes, and how much you want to pay participants. In the Gureckis Lab, you should aim to pay participants $15/hour. Prolific requires a minimum of $8/hour.

You can now preview your study -- it's good practice to test that Prolific directs you to the correct URL for your study, that Smile saves the Prolific URL parameters with the data, and that you get redirected back to Prolific when the study is completed.

Finally, you can save your study as a draft or publish your study. You can also schedule a later time/date for your study to be published.

### Paying participants

When your study is complete, it will be listed as "AWAITING REVIEW" on the active studies tab:

![Prolific finish](/images/prolific-step6.png)

Click on the name of your study, then click "Approve all" to pay all participants who finished the entire study. If you don't want to approve all participants, you can approve individually by clicking the check mark next to each submission. You can also click "More," then "Approve in bulk" to provide a list of Prolific IDs to approve.


<!-- - Set the URL for your experiment to the IP address of the server using the format `http://<hostname>:<port-number>/`. (T Make sure you include the forward slash, `/`, at the end, and make sure that you do not include the angle brackets.
- Under ‘How to record Prolific IDs’, select the option ‘I’ll use URL parameters’.
- Make sure Prolific will pass the following variables: PROLIFIC_PID, STUDY_ID, and SESSION_ID.
- At the end of the three steps above, the URL in the box under ‘What is the URL of your study?’ should look something like: 

`http://128.100.100.100:9000/?PROLIFIC_PID=[[%PROLIFIC_PID%]]&STUDY_ID=[[%STUDY_ID%]]&SESSION_ID=[[%SESSION_ID%]]`


At the end you redirect the participant to 
https://app.prolific.co/submissions/complete?cc=HZCQS9MX
The completion code doesn't have to be anything in particular but there is an  -->

## Cloud Research

[Cloud Research](https://www.cloudresearch.com) previously known as TurkPrime is a service that runs on top of Amazon Mechanical Turk that offers some additional screening and demographic information about workers.  The most relevant service for psychologists is probably the [MTurk Toolkit](https://www.cloudresearch.com/products/turkprime-mturk-toolkit/).  Essentially, CloudResearch pre-screens workers on Mechanical Turk to flag possible bots as well as reliably inattentive participants.  The idea is that using their technology you can get higher quality data than using the low-level MTurk API.  

Cloud Research takes several steps to improve the general data quality for surveys including presenting workers questions at various points which they check for consistency (did the subject las week answer this question the same as today?).  The also can perform some demographic sampling/filters if you need samples from particular population groups.

They also provide GUI tools for posting HITs on Mechanical Turk that simplify recruitment.

To get started you first need to create an account on [CloudResearch.com](https://account.cloudresearch.com/Account/Login)

Next, you have to connect your Mechanical Turk account to Cloud Research effectively granting them access to post and approve HITs on your behalf.  Cloud Research provides instructions on doing this [here](https://cloudresearch-com.s3.amazonaws.com/files/Instructions+for+linking+MTurk+and+CloudResearch+Accounts.pdf).  If you are in the gureckislab you will need to ask Todd to add you to our lab MTurk account.

To create studies you use the intuitive study builder.  There are many custom fields that you can use to configure your study including payment, demographic restrictions, privacy-enhancing features, etc... However, the most important is to post the correct link to the study.  Here is an example.  But basically it is


At the end of CloudResearch studies you display to the worker a completion code that they paste into the study window.  



## Mechanical Turk

Mturk adds these parameters to your URL when a participant accepts the hit.

`http://128.100.100.100:9000/?assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE`


- Preview mode:

`http://128.100.100.100:9000?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE`

This should just show a "advertisement" for the study.
In psiturk the advertisement checks to see if user has already completed the task and if so tells them they can't do it.
Could do this using local storage (cheap, easily bypassed) or by checking the database (expensive)



## Crowd-sourcing

In the future the lab might make a citizen science recruitment portal.  To support this we provides a similar API to prolific/AMT with the more generic CITIZEN_ID type identity variables:

`/?CITIZEN_ID=XXXXX&CITIZEN_TASK_ID=123RVWYBAZW00EXAMPLE&CITIZEN_ASSIGN_ID=AZ3456EXAMPLE`