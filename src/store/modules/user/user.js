import { axios } from '@/plugins/axios'

const axiosPlugin = store => {
    store.$axios = axios
}

const user = {
    plugins: [axiosPlugin],
    state: {
        logged: null,
        accessToken: localStorage.getItem('access_token') || '',
        user: null,
    },
    getters: {
        isAuthenticated: state => !!state.accessToken,
        accessToken: () => {
            let token = window.localStorage.getItem('access_token')

            if (!token)
                token = false

            return token
        }
    },
    mutations: {
        login (state, payload) {
            state.logged = payload
        },
        accessToken(state, payload) {
            const token = payload.token_type + ' ' + payload.access_token
            state.accessToken = token
            window.localStorage.setItem('access_token', token);
        },
        user (state, payload) {
            state.user = payload
        },
        logout (state) {
            state.userdata = false
            state.user = null
            state.accessToken = null
            window.localStorage.removeItem('access_token');
        },
    },

    actions: {

        async login({ commit }, requestObject) {
            return new Promise((resolve, reject) => {

                axios.post('api/auth/login', requestObject)
                    .then(function (response) {
                        commit('login', true)
                        commit('user', response.data.user)
                        commit('accessToken', response.data)
                        resolve(response.data);
                    })
                    .catch(function (e) {
                        reject(e.message);
                    });

            });
        },

        async logout({ commit }) {
            return new Promise((resolve) => {

                axios.get('api/auth/logout')
                    .then(function () {
                        commit('logout')
                        resolve({ status: true});
                    })
                    .catch(function () {
                        commit('logout')
                        resolve({ status: true});
                    });

            });
        },

        async update({ commit }) {
            return new Promise((resolve, reject) => {

                axios.post('api/auth/user', {})
                    .then(function (response) {
                        commit('user', response.data)
                        commit('login', true)
                        resolve(response.data)
                    })
                    .catch(function (e) {
                        reject(e.message);
                    });

            });
        },
    },
}
export default user