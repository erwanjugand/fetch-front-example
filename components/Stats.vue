<template>
  <v-card rounded>
    <v-card-title v-text="'Stats'" />

    <v-card-text v-text="`Local user count: ${userCount}`" />
    <v-card-text v-text="`Session post count: ${postCount}`" />

    <v-card-actions>
      <v-btn @click="onClick">
        Clear localStorage
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    userCount (): number {
      return this.$accessor.users.items.length
    },

    postCount (): number {
      return this.$accessor.posts.length
    }
  },

  methods: {
    onClick () {
      this.$store.commit('resetLocalStorage')
      location.reload()
    }
  }
})
</script>
