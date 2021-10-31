import { Plugin } from '@nuxt/types'
import { CustomResponse, User } from '~/models'
import { encodeUrl } from '~/utils/url'

const axiosPlugin: Plugin = function (ctx) {
  ctx.$axios.onResponse<CustomResponse<any>>(async function (response) {
    const userDatas = response.data.userDatas

    if (userDatas) {
      ctx.store.commit('setLog', `There are ${userDatas.length} users to check`)
      const userIdsToFetch: number[] = []

      for (const userData of userDatas) {
        // @ts-ignore-next-line
        const localUser = (ctx.$accessor.users.items as User[]).find(u => u.id === userData.id)

        if (localUser && localUser.updatedAt >= userData.updatedAt) {
          ctx.store.commit('setLog', `User n°${userData.id} already in local & updated`)
        } else {
          userIdsToFetch.push(userData.id)
          ctx.store.commit('setLog', `User n°${userData.id} not exist OR not up to date`)
        }
      }

      if (userIdsToFetch.length) {
        ctx.store.commit('setLog', `Need to fetch ${userIdsToFetch.length} users`)
        const { items: newUsers } = await ctx.$axios.$get<CustomResponse<User>>(encodeUrl('http://localhost:8000/users', { ids: userIdsToFetch }))
        ctx.store.commit('setUsers', newUsers)
      }
    }
    return response
  })
}

export default axiosPlugin
