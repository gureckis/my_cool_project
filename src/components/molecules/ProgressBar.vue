<script setup>
import { useRouter, useRoute } from 'vue-router'
import useSmileStore from '@/stores/smiledata'

const smilestore = useSmileStore() // get the global store
//const router = useRouter()
const route = useRoute()
</script>



<template>
    <nav class="navbar is-fixed-bottom" v-if="(route.name!=='recruit'&&route.name!=='mturk')">
        <div class="container is-fluid pl-6 pr-6">
            <progress class="progress is-success" v-bind:value="smilestore.global.progress" max="100">60%</progress> 
        </div>
    </nav>
</template>

<style scoped>

.labeltext{
    color: #000;
    width: 20%;
    font-weight: 700;
}
.navbar {
  font-size: 13px;
  background: #fff;
  color: #fff;
  height: 5px;
  padding: 0px;
  padding-top: 20px;
  padding-left: 0px;
  padding-bottom: 50px;
  margin: 0px;
  min-height: 32px;
  text-align: center;
}
</style>