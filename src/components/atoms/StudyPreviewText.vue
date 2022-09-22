<script setup>
import useSmileStore from '@/stores/smiledata'
const smilestore = useSmileStore()
</script>

<template>
<div class="welcome">
    <div class="columns">
        <div class="column">
            
            <h1 class="title">Welcome to our study!</h1>
            <p class="is-size-5 has-text-left">
                We are offering a paid research study looking at how
                people learn and make decisions.   In this study you will
                look at various shapes <FAIcon icon="shapes" /> and pictures <FAIcon icon="image" />
                and make decisions similar to a video game.  You may earn
                points for making good decisions that will convert to money <FAIcon icon="sack-dollar" />
                that we will pay you at the end of the study ({{ smilestore.config.payrate }}).  The study
                should take about {{ smilestore.config.estimated_time }} of your time.  You'll be
                asked to digitally sign a constent form and (optionally) provide some
                non-identifiable demographic information during the study.
                Your data will be kept anonymous.
                <hr>
                <b>Summary:</b> This study is like a game, is mentally challenging, requires concentration, can only be played once, and requires a desktop browser.
            </p>
        </div>
        <div class="column is-two-fifths">
            <img src="@/assets/brain.svg" width="220"><br><br>
            <article class="message">
            <div class="message-header is-size-7">
                <p><FAIcon icon="bahai" />&nbsp;&nbsp;Who are we?</p>
            </div>
            <div class="message-body is-size-7 has-text-left">
                We are the <a href="http://gureckislab.org" target="_blank">Computation
                and Cognition Lab</a> at New York University under the
                direction to <a href="http://todd.gureckislab.org" target="_blank">Dr. Todd Gureckis</a>.  Our
                lab uses games and other fun tasks to study human intellience.  Our research is funded in the public
                interest by the United States <a href="https://nsf.gov" target="_new">National Science Foundation</a> among other organizations and
                non-profit foundations and we publish our work, code, and results for the public.  We very much appreciate
                research participants in our studies and have a public <a href="http://gureckislab.org/research-code-of-ethics.html" target="_new">code
                of ethics</a> we strive to uphold in all our studies.
            </div>
            </article>
        </div>
    </div>
</div>
 
</template>

<style scoped>
a {
  color: #42b983;
}

.welcome {
    margin: auto;
    margin-left: 80px;
    margin-right: 80px;
}
.note {
    padding: 15px;
    padding-bottom: 0px;
}
</style>