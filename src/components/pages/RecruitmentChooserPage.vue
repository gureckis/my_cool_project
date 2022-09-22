<script setup>
</script>

<template>
        <section class="hero">
        <div class="hero-body">
            <p class="title">
            <span id="bigsmile">🤠</span>
            </p>
            <p class="subtitle">
            <h1 class="title is-1">Welcome to dev 👩‍💻 mode !</h1>
            </p>
        </div>
        </section>
        <div class="content">
            <p class="is-size-5 has-text-left">
                Please choose how you would like to test your application.
                You can choose between these options:
                <br>
                <hr>
                <h3 class="title is-5">Prolific.ac</h3>
                  <p class="is-size-6">
                  <a href="https://www.prolific.co" target="_new">Prolific.ac</a> is a platform for online experiments with slightly higher overall quality than AMT.
                  </p>
                  <a href="/#/welcome/prolific/?PROLIFIC_PID=XXXX&STUDY_ID=XXXX&SESSION_ID=XXXXX" class="button is-info is-small" id='prolific_tester'>Random Fake Prolific User &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a>
                <hr>
                <h3 class="title is-5">CloudResearch</h3>
                  <p class="is-size-6">
                  <a href="https://www.cloudresearch.com" target="_new">CloudResearch</a> is a platform that recruits from several sources, including Mechanical Turk but includes some screening for bots and server farms.
                  </p>
                  <a href="/#/welcome/cloudresearch/?assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE" class="button is-pink is-small" id='prolific_tester'>Random Fake CloudResearch User &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a>
                <hr>
                <h3 class="title is-5">Mechanical Turk</h3>
                  <p class="is-size-6">
                  <a href="https://www.mturk.com">Amazon Mechanical Turk</a> is the original wild-west 🤠 of online crowd labor markets.  
                  </p>
                  <a href="/#/mturk/?assignmentId=ASSIGNMENT_ID_NOT_AVAILABLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE" class="button is-danger is-small" id="amt_tester_preview">AMT Preview Mode &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a>
                  <a href="/#/mturk/?assignmentId=123RVWYBAZW00EXAMPLE456RVWYBAZW00EXAMPLE&hitId=123RVWYBAZW00EXAMPLE&turkSubmitTo=https://www.mturk.com/&workerId=AZ3456EXAMPLE" class="button is-warning is-small" id="amt_tester">Random Fake AMT User &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a> 
                <hr>
                <h3 class="title is-5">Citizen Science</h3>
                  <p class="is-size-6">
                  Citizen Science is a stand-in for a posssible future platform run by the lab.
                  </p>
                  <a href="/#/welcome/citizensci/?CITIZEN_ID=XXXXX&CITIZEN_STUDY_ID=123RVWYBAZW00EXAMPLE&CITIZEN_SESSION_ID=AZ3456EXAMPLE" class="button is-success is-small" id="citizen_tester">Random Fake Citizen Science User &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a>
                <hr>
                <h3 class="title is-5">Anonymous web user</h3>
                  <p class="is-size-6">
                    Anonymous web user is not referred by any recruitment service
                  </p>
                  <a href="/#/welcome" class="button is-orange is-small" id="citizen_tester">Anonymous Web User &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></a>

            </p>            
        </div>

    
</template>

<style>
.hero {
  background-color: #79f2cc;
  margin-bottom: 30px;
  padding: 0px;
}
.hero-body {
  padding: 10px;
}
.content {
    width: 70%;
    margin: auto;
    padding-bottom: 60px;
    
}

.content a {
    margin-left: 10px;
}

.is-pink {
    background-color: #ffc0cb;
}
.is-orange {
    background-color: #fda918;
    color: #fff
}
.config b {
  color: #639aa6;
}
#bigsmile {
  font-size: 100px;
}
</style>