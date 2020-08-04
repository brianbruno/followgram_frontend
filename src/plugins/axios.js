import ax from 'axios'

// insert all your axios logic here

export const axios = ax

export default {
    install (Vue) {
        Vue.prototype.$axios = ax
        Vue.prototype.$axios.defaults.baseURL = process.env.VUE_APP_API_HOST;


        const token = localStorage.getItem('access_token')
        if (token) {
            Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
        }

    }
}