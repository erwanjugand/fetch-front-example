import { getAccessorType, mutationTree, actionTree } from 'typed-vuex'
import { Post, User, CustomResponse } from '~/models'

export const state = () => ({
  users: {
    items: [] as User[],
    version: 1
  },
  posts: [] as Post[],
  logs: [] as string[]
})

export const mutations = mutationTree(state, {
  resetLocalStorage (state) {
    state.users.version++
  },

  setPosts (state, posts: Post[]) {
    for (const post of posts) {
      const index = state.posts.findIndex(p => p.id === post.id)
      post.author = state.users.items.find(u => u.id === post.authorId)

      if (index < 0) {
        state.posts.push(post)
      } else {
        state.posts.splice(index, 1, post)
      }
    }
  },

  setUsers (state, users: User[]) {
    for (const user of users) {
      const index = state.users.items.findIndex(u => u.id === user.id)

      if (index < 0) {
        state.users.items.push(user)
      } else {
        state.users.items.splice(index, 1, user)
      }
    }
  },

  setLog (state, log: string) {
    state.logs.push(log)
  }
})

export const actions = actionTree(
  { state, mutations },
  {
    async fetchPosts ({ commit }, params: { offset: number, limit: number }) {
      commit('setLog', `Fetch ${params.limit} posts...`)

      const { items } = await this.$axios.$get<CustomResponse<Post>>('http://localhost:8000/posts', { params })

      commit('setPosts', items)
    }
  }
)

export const accessorType = getAccessorType({
  state,
  mutations,
  actions
})
