<template>
    <div>
        <div class="row">
            <div class="col-md-6" v-if="fase === 1">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <h4 class="card-title">Ganhar Seguidores</h4>
                        <h5>Suas contas:</h5>
                        <ul class="list-group list-group-flush">
                            <li v-bind:key="account.id" v-for="account in accounts" class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left mr-3">
                                            <img width="42" class="rounded-circle" :src="account.profile_pic_url" alt="">
                                        </div>
                                        <div class="widget-content-left">
                                            <div class="widget-heading">{{ account.username }}</div>
                                            <div class="widget-subheading">{{ account.biography }}</div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div>
                                        <select v-model="points[account.id]" class="form-control-sm">
                                            <option value="5">5 pontos</option>
                                            <option value="10">10 pontos</option>
                                            <option value="15">15 pontos</option>
                                            <option value="20">20 pontos</option>
                                            <option value="25">25 pontos</option>
                                        </select>
                                        <b-button class="mr-2 mb-2 btn-transition float-right" variant="success" v-if="!account.is_request_follow" :disabled="doingRequest" v-on:click="updateRequest(account.id, 'ativar')">
                                            Ativar
                                        </b-button>
                                        <b-button class="mr-2 mb-2 border-0 btn-transition float-right" variant="outline-danger" v-if="account.is_request_follow" :disabled="doingRequest" v-on:click="updateRequest(account.id, 'desativar')">
                                            Desativar
                                        </b-button>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import PageTitle from "../../Layout/Components/PageTitle.vue";
    const Noty = require('noty');
    const axios = require('axios');

    export default {
        components: {
            PageTitle,
        },
        data: () => ({
            heading: 'Chart Boxes III',
            subheading: 'Highly configurable boxes best used for showing numbers in an user friendly way.',
            icon: 'pe-7s-wallet icon-gradient bg-plum-plate',
            fase: 1,
            usernameInsta: '',
            accounts: [],
            doingRequest: false,
            points: {},
        }),
        mounted() {
            const self = this;
            self.buscarContas();
        },
        methods: {
            buscarContas() {
                const self = this;
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/insta/getAccounts', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    const accounts = response.data.data;
                    self.accounts = [];
                    accounts.forEach(function (account) {
                        if (account.instagram_requests) {
                            if (account.instagram_requests[0].type === 'follow') {
                                self.points[account.id] = account.instagram_requests[0].points;
                            }
                        }

                        self.accounts.push(account)
                    });

                    self.doingRequest = false;
                }).catch(function (error) {
                    new Noty({
                        theme: 'mint',
                        text: error.message,
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;
                });
            },
            updateRequest(idInstaTarget, activate) {
                const self = this;
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                let active = false;
                if (activate === 'ativar') {
                    active = true;
                }

                axios.post('https://insta.brian.place/api/requests/add', {
                        idInstaTarget: idInstaTarget,
                        type: 'follow',
                        points: self.points[idInstaTarget],
                        activate: active }, config).then(function () {
                    self.doingRequest = false;
                    self.buscarContas();
                }).catch(function (error) {
                    new Noty({
                        theme: 'mint',
                        text: error.message,
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;
                });
            }
        }
    }

</script>
