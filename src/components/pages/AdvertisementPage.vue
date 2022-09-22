<script setup>
// import '@/seed'
import { useRouter, useRoute } from 'vue-router'
import useTimelineStepper from '@/composables/timelinestepper'
import useSmileStore from '@/stores/smiledata' // get access to the global store

const router = useRouter()
const route = useRoute()
const smilestore = useSmileStore()

const { next, prev } = useTimelineStepper()

smilestore.global.page_bg_color = '#fff'
smilestore.global.page_text_color = '#000'
smilestore.global.status_bar_bg_color = '#fff'
smilestore.global.status_bar_text_color = '#000'

if(route.meta.progress) smilestore.global.progress = route.meta.progress

function finish(goto) { 
    // smilestore.saveData()
    if(goto) router.push(goto)
}
</script>

<template>
    <div class="page">
        <br><br><br>
        <img src="@/assets/brain.svg" width="220">
        <h1 class="title is-3">Please help us understand the mind!</h1>
        <p>
            Take part in a short experiment where you play a game for money.
        </p>
        <br>
        <button class="button is-warning" id='finish' @click="finish(next())">I'm ready! &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></button>
    </div>
</template>

<style scoped>

</style>