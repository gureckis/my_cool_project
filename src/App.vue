<script setup>
import { useRouter, useRoute } from 'vue-router'
import useSmileStore from '@/stores/smiledata'
// load sub-components used in this compomnents
import DeveloperNavBar from '@/components/organisms/DeveloperNavBar.vue';
import StatusBar from '@/components/organisms/StatusBar.vue';
import { onMounted, watch, ref } from 'vue';
import ProgressBar from './components/molecules/ProgressBar.vue';

// imports the global config object
const router = useRouter()
const route = useRoute()
const smilestore = useSmileStore()


// monitor events on the main window
onMounted(() => {
  window.addEventListener('resize', (event) => { 
    smilestore.recordWindowEvent('resize', {width: window.innerWidth, height: window.innerHeight})
  })

  window.addEventListener('focus', (event) => {
    smilestore.recordWindowEvent('focus')
  })

  window.addEventListener('blur', (event) => {
    smilestore.recordWindowEvent('blur')
  })
})

// this is tied to the router-view component, allowing us to re-render it according to the watchers below
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};

// monitor changes to condition variable in smilestore 
// if condition changes, pop it up to the URL
watch(() => smilestore.getCondString, (newCond) => {
  const newQueries = { ...route.query, ...{cond: newCond} } // add new condition to queries
  router.replace({path: route.path, query: newQueries}) // push to router
})

// monitor changes to url
// if url changes and it doesn't match what's already in smilestore for condition,
// change the condition, then reload the page
watch(() => route.query, (newquery, oldquery) => {
  if(newquery.cond && newquery.cond !== smilestore.getCondString){ // if the query cond exists and doesn't match the one already in the data
    const success = smilestore.overwriteConds(newquery.cond) // reassign conditions
    if(success){
      forceRerender() // re-render the page
    } else{
      router.replace({path: route.path, query: oldquery}) // push to router
    }
  }
})


// monitor changes to local state and force router changes


// smilestore.$subscribe((mutation, state) => {
//   // go to the new route
//   if(!state.local.allowJumps && smilestore.config.mode === 'development') {
//     router.push({name: state.local.lastRoute})
//   }
// })


</script>

<template>
  <DeveloperNavBar v-if="smilestore.config.mode=='development'"></DeveloperNavBar>
  <StatusBar v-if="$route.name!=='config' && $route.name!=='recruit'"></StatusBar>
  <div class="router">
    <router-view :key="componentKey"></router-view> <!-- the router loads here -->
  </div>
  <ProgressBar v-if="$route.name!=='config' && $route.name!=='recruit' && smilestore.config.show_progress_bar=='true'"></ProgressBar>
</template>

<style>
/* global fonts **/
:root {
    --vp-font-family-base: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --vp-font-family-mono: Menlo, Monaco, Consolas, "Courier New", monospace;
    /* fontkit overrides */
    --fk-color-primary: #48c78e;
}

.router {
  height: 100vh;
  background-color: v-bind(smilestore.global.page_bg_color);
}

#app {
  font-family: var(--vp-font-family-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
