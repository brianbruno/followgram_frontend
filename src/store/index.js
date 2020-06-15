import Vue from 'vue'
import Vuex from 'vuex'
import { axios } from '@/plugins/axios'
import user from './modules/user/user'

Vue.use(Vuex);

const axiosPlugin = store => {
    store.$axios = axios
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      user
    },
    plugins: [axiosPlugin],
    state: {
        client: null,
        posts: [],
        page: 1,
        total: -1,
        perpage: 6,
        lastPage: 0,
        query: { match_all: { } },
    },

    getters: {

    },

    mutations: {
        setPage(state, page) {
            state.page= page;
        },
        setQuery(state, query) {
            state.query= query;
        },
        setTotal(state, total) {
            state.total = total;
        },
    },

    actions: {

        async getTotal(context) {
            return new Promise((resolve, reject) => {
                context.state.client.count({
                    index: 'posts-social-network',
                    body: {
                        query: context.state.query,
                    }
                }).then((response) => {
                    resolve(response.count);
                }).catch((e) => {
                    reject(e.message)
                }) ;
            });
        },
    },
})
