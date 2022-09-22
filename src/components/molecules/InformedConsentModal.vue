<script setup>
import InformedConsentText from '@/components/atoms/InformedConsentText.vue'
</script>


<template>
    <article class="message">
        <div class="message-header">
            <p>Informed Consent</p>
        </div>
        <div class="message-body has-text-left mr-7 pb-8">
            <InformedConsentText /> <!-- load text of consent form -->
            <div class="has-text-right mt-5">
                <button class="button" aria-label="close" @click="$emit('toggleConsent')">Thanks, take me back to the study!</button>
            </div>
        </div>            
    </article>
</template>