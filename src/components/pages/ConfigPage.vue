<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useSmileStore from '@/stores/smiledata'

const smilestore = useSmileStore()
const router = useRouter()

defineProps({
  msg: String
})

smilestore.global.page_bg_color = '#fff'
smilestore.global.page_text_color = '#000'
smilestore.global.status_bar_bg_color = '#fff'
smilestore.global.status_bar_text_color = '#000'

const count = ref(0)

function createLink(option) {

  if(typeof(option)==='string') {
    if(option.slice(0,4)==='http') {
      return "<a href='"+option+"' target='_new'>"+option+"</a>"
    } else {
      return option
    }
  } else {
    return option
  }
}
function resetLocalState() {
  localStorage.removeItem(smilestore.config.local_storage_key) // delete the local store
  smilestore.$reset()  // reset all the data even
  router.push('/')
}
</script>

<template>
  <section class="hero">
  <div class="hero-body">
    <p class="title">
      <span id="bigsmile">🤠</span>
    </p>
    <p class="subtitle">
      <h1 class="title is-1">Smile!</h1>
    </p>
    <p>
      <h1 class="title is-4">A happy approach to online behavioral research.</h1>
    </p>
  </div>
  </section>
  
  <div class="columns">

     <div class="column is-4">

        <div class="code">
          <p>Welcome to the configuration page for your project.  This page can help you understand the application state.</p> 
        </div>
        <div class="divider">Local State</div>
        
        <button class="button is-warning is-small" @click="resetLocalState"><FAIcon icon="fa-solid fa-arrow-rotate-left" /> &nbsp; reset</button>
        <div class="code">
          <ul>
            <li class="config" v-for="option, key in smilestore.local" :key="key">
              <b>{{ key }}</b>: <span v-html='createLink(option)'></span>
            </li>
          </ul>
        </div>
        <br>
        <br>
        <div class="divider">Code Version Info</div>
        <div class="code">
          <ul>
            <li class="config" v-for="option, key in smilestore.config.github" :key="key">
              <b>{{ key }}</b>: <span v-html='createLink(option)'></span>
            </li>
          </ul>
        </div>
        <br>
        <br>
        <div class="divider">Vue.js Reactivity Example</div>
        <button   class="button is-success is-small is-light" type="button" @click="count++"><FAIcon icon="fa-solid fa-explosion" />&nbsp;Click me</button><br><br>
        
        <p>
        You've clicked the button {{ count }} times.
        </p>

        <p>
          Edit
          <code>components/pages/ConfigPage.vue</code> to test hot module replacement.
        </p>    
        
      </div>

      <div class="column is-8">
        
        <div class="divider">Full Configuration</div>
        <div class="code">
          <ul>
            <li class="config" v-for="option, key in smilestore.config" :key="key">
              <span v-if=" typeof(option)=='string' ">
                <b>{{key}}</b>: <span v-html='createLink(option)'></span>
              </span>
              <span v-else>
                <b>{{key}}</b>: 
                  <ul>
                    <li v-for="option2,key2 in option" :key="key2">
                      <b>{{key2}}</b>: <span v-html='createLink(option2)'></span>
                    </li>
                  </ul>
              </span>

            </li>
            
          </ul>
        </div>
        <div class="divider">Data</div>
        <div class="code">
          <ul>
            <li class="config" v-for="option, key in smilestore.data" :key="key">
              <b>{{ key }}</b>: <span v-html='createLink(option)'></span>
            </li>
          </ul>
        </div>
        <br>
        <br>
      </div>
     


    </div>




  





</template>

<style scoped>

.hero {
  background-color: #79f2cc;
  margin-bottom: 0px;
}

.columns {
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 30px;
}
.code {
  background: rgb(251, 251, 251);
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  word-wrap: break-word;
}

.code p {
  text-align: left;
  font-size: 0.9em;
}
.hero-body{
  padding-bottom: 0px;
  margin-bottom: 0px;
}
a {
  color: #42b983;
}
.config {
  text-align: left;
  margin-left: 20px;
  font-family: monospace;
  font-size: 0.8em;
  font-weight: 500;
}

.config b {
  color: #639aa6;
}
#bigsmile {
  font-size: 100px;
}

</style>
