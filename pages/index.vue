<template>
  <v-app>
    <div class="column">
      <Posts ref="posts" class="posts" />
    </div>
    <div class="column">
      <Stats class="stats" />
      <Logs ref="logs" class="logs" />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  watch: {
    '$accessor.logs': {
      handler () {
        document.querySelectorAll('.v-list').forEach((list) => {
          list.scrollTop = list.scrollHeight
        })
      }
    },
    '$accessor.posts': {
      handler () {
        document.querySelectorAll('.v-list').forEach((list) => {
          list.scrollTop = list.scrollHeight
        })
      }
    }
  }
})
</script>

<style>
div.v-application--wrap {
  flex-direction: row;
  justify-content: center;
  padding: 32px;
  gap: 32px;
  height: 100vh;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 0 1 480px;
  gap: 32px;
}

.v-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.v-card > .v-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.stats {
  flex-shrink: 0;
}
</style>
