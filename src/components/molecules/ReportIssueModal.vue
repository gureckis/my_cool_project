<script setup>
</script>

<template>
    <article class="message is-warning">
        <div class="message-header">
            <p>Report Issue</p>
        </div>
        <div class="message-body has-text-left mr-7 pb-8">
            Report issue form goes here.
            <div class="has-text-right mt-5">
                <button class="button" aria-label="close" @click="$emit('toggleReport')">Thanks, take me back to the study!</button>
            </div>
        </div>            
    </article>
</template>