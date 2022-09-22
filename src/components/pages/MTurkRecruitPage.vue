<script setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
//import useTimelineStepper from '@/composables/timelinestepper'
import useSmileStore from '@/stores/smiledata' // get access to the global store
import StudyPreviewText from '@/components/atoms/StudyPreviewText.vue'

// const router = useRouter()
const route = useRoute()
const smilestore = useSmileStore()

// const { next, prev } = useTimelineStepper()

if(route.meta.progress) smilestore.global.progress = route.meta.progress

const mturkPreview = ref(true)
const launched = ref(false)
let redirectURL = ref('/#/welcome/mturk/?')
onMounted(() => {
    const urlParams = route.query
    let queryStr = route.fullPath.split('?')
    
    if(queryStr.length==2) {
        redirectURL.value += queryStr[1]
    } 
    console.log(redirectURL.value)
    if (urlParams.assignmentId && urlParams.hitId && urlParams.workerId) {
        if (urlParams.assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE') {
            console.log('AMT mode, but no assignment (preview mode)')
            // supposed to show the ad here
            mturkPreview.value = true
        } else {
            console.log('AMT mode, with assignment')
            mturkPreview.value = false
        }
  }
})

function clicked() {
    launched.value = !launched.value
    // open new window
    window.open(redirectURL.value, '_blank')
}
// function finish(goto) { 
//     smilestore.saveData()
//     router.push(goto)
// }

// TODO: Figure out if you are in sandbox mode or not automatically
// if(sandbox) {
//     const turkSubmitTo = 'https://workersandbox.mturk.com/mturk/externalSubmit'
// } else {
//     const turkSubmitTo = 'https://www.mturk.com/mturk/externalSubmit'
// }
const turkSubmitTo = 'https://www.mturk.com/mturk/externalSubmit'
function submit() {
    console.log("submitting to AMT")
}
</script>

<template>
    <div class="page">
        <StudyPreviewText v-if="mturkPreview"></StudyPreviewText>
        <div v-else>
            <h1 class="title is-3">Thanks for accepting our HIT</h1>
            <div class='submitform' v-if="launched">
                <p class="has-text-left">
                    Please complete the task in the window that was launched.
                    When you are finished you will be provided with a completion code which
                    you should copy and enter here.
                 </p>
                 <hr>
                <FormKit type="form"
                         submit-label="Submit to Mechanical Turk"
                         :action="turkSubmitTo"
                         method="post">
                    <FormKit type="text" 
                        name="completioncode"
                        label="Completion Code"
                        v-model='smilestore.local.completionCode'
                        placeholder='Paste your completion code here'
                        validation="required" />
                </FormKit>
            </div>
            <div v-else>
                <a class="button is-info" id='launch_window' @click="clicked()" target="_new">Begin Task in New Window</a>
            </div>            
            
        </div>

    </div>
</template>

<style scoped>
.submitform {
    width: 50%;
    margin: auto;
}
</style>