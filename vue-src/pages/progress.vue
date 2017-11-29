<template>
  <v-scroll>
    <v-progress-circle v-model="percent" reduce>
      <v-progress-number v-model="percent" reduce/>
    </v-progress-circle>
    <v-progress-circle v-model="percent">
      <v-progress-number v-model="percent"/>
    </v-progress-circle>
    <v-progress-line v-model="percent"/>
  </v-scroll>
</template>
<script type="text/babel">
  import {
    vScroll,
    vProgressCircle,
    vProgressLine,
    vProgressNumber
  } from '../../framework/_vue'

  export default {
    components: {
      vScroll,
      vProgressCircle,
      vProgressLine,
      vProgressNumber
    },
    data() {
      return {
        percent: 50
      }
    },
    mounted() {
      setTimeout(() => {
        this.percent = 88.5;
      }, 3500)
    }
  }
</script>
