<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useTimelineStepper from '@/composables/timelinestepper'
import useSmileStore from '@/stores/smiledata'

import InformedConsentText from '@/components/atoms/InformedConsentText.vue';

const router = useRouter()
const route = useRoute()
const smilestore = useSmileStore()

smilestore.global.page_bg_color = '#fff'
smilestore.global.page_text_color = '#000'
smilestore.global.status_bar_bg_color = '#fff'
smilestore.global.status_bar_text_color = '#000'

const { next, prev } = useTimelineStepper()

if(route.meta.progress) smilestore.global.progress = route.meta.progress


function finish(goto) { 
    if (!smilestore.isKnownUser) {
        console.log('not known')
        smilestore.setKnown() // set new user and add document
    }
    smilestore.setConsented()
    if(goto) router.push(goto)
}
const agree = ref(false)
const name = ref('enter your name')

</script>

<template>
    <div class="page">
        <div class="pagecontent">
            <div class="has-background-light  bumper">
                <div class="columns">
                    <div class="column">
                        <InformedConsentText/>
                    </div>
                    <div class="column is-one-third">
                        <div class="box consentbox">
                            <p class="has-text-left has-text-weight-semibold">
                                We first must verify that you are
                                participating willingly and know your rights. Please take the time to read
                                the consent form (you can scroll the page).
                            </p>
                            <hr>
                            <p>
                                <FormKit
                                    v-model="agree"
                                    type="checkbox"
                                    name="consent_toggle"
                                    label="I consent and am over 18 years old."
                                    help="Do you consent to participate in this study?"
                                    validation="accepted"
                                    validation-visibility="dirty"
                                    label-class="has-text-left"
                                    />
                                <div class="hname">
                                    Required!  Please enter your name: <input type="text" name="your_name" label="enter your name" v-model='name' />
                                </div>
                            </p>
                            <br>
            
                            <button class="button is-success is-fullwidth" id='finish' v-if='agree' @click="finish(next())">
                                Let's start &nbsp;<FAIcon icon="fa-solid fa-arrow-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.pagecontent {
    padding-bottom: 100px;
    margin-bottom: 20px;
        margin: 50px;
    margin-top: 0px;
  
}
.consentbox {
    margin-bottom: 20px;
    margin-top: 30px;
}
.widetoggle {
  --toggle-width: 5.9rem;
}

.column {
    padding: 40px;
    padding-top: 0px;
}

.hname {
    visibility: hidden;
    display: none;
}

</style>