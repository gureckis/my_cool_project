<script setup>
import { useRouter, useRoute } from 'vue-router'
import useTimelineStepper from '@/composables/timelinestepper'
import useSmileStore from '@/stores/smiledata'
import DebriefText from '@/components/atoms/DebriefText.vue'; // get access to the global store

const router = useRouter()
const route = useRoute()
const smilestore = useSmileStore()

const { next, prev } = useTimelineStepper()

if(route.meta.progress) smilestore.global.progress = route.meta.progress

smilestore.setDone()

function finish(goto) { 
    if(goto) router.push(goto)
}
</script>

<template>
    <div class="page">
        <h1 class="title is-3">What was that about?</h1>
        <DebriefText />
        <button class="button is-success is-light" id='finish' @click="finish(next())">next &nbsp;<FAIcon icon="fa-solid fa-arrow-right" /></button>
    </div>
</template>

