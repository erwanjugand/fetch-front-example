<template>
  <v-card rounded>
    <v-card-title v-text="'Posts'" />

    <v-list>
      <v-list-item v-for="post of $accessor.posts" :key="post.id">
        <v-list-item-content>
          <v-list-item-title v-text="post.title" />
          <v-list-item-subtitle v-if="post.author" v-text="`Author: ${post.author.name}`" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn :loading="loading" @click="fetchMorePosts">
        Fetch new posts
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      loading: false,
      limit: 5,
      offset: 0
    }
  },
  methods: {
    async fetchMorePosts () {
      this.loading = true
      await this.$accessor.fetchPosts({ offset: this.offset, limit: this.limit })
      this.loading = false
      this.offset = this.offset + 5
    }
  }
})
</script>
