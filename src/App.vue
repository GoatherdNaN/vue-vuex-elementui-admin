<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
  },
  computed: mapState({
    netStatus(state) {
      return state.netStatus;
    },
    loadingFlag(state) {
      return state.loadingFlag;
    },
  }),
  components:{
    Loading:'Loading'
  }
}
</script>
