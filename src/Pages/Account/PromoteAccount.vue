<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-body" v-if="accounts.length > 0">
                        <h5>Suas contas:</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <img v-bind:key="account.id" v-for="(account, index) in accounts" v-on:click="selectAccount(index)" width="60" class="rounded-circle profile-icon" :src="account.profile_pic_url" :alt="account.username">
                            </div>
                        </div>
                        <br><br>
                        <div class="row">
                            <div class="col-md-12">
                            <ul class="list-group list-group-flush" v-if="selectedAccountIndex !== -1">
                                <li class="list-group-item">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img width="42" class="rounded-circle" :src="accounts[selectedAccountIndex].profile_pic_url" alt="">
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">{{ accounts[selectedAccountIndex].username }}</div>
                                                <div class="widget-subheading">{{ accounts[selectedAccountIndex].biography }}</div>
                                            </div>
                                        </div>
                                        <br><br>
                                        <div class="row">
                                            <div class="col-md-4 mb-3 card card-body">
                                                <div class="card-title">
                                                    <h5>
                                                        Boost - Seguidores
                                                        <b-form-checkbox class="float-right" v-model="accounts[selectedAccountIndex].is_request_follow" name="check-button" switch size="lg" />
                                                    </h5>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-8">
                                                        <b-form-group label="Ganhar seguidores:">
                                                            <b-form-radio-group
                                                                v-model="pointsFollow"
                                                                :options="options"
                                                                name="radios-stacked"
                                                                stacked/>
                                                        </b-form-group>
                                                    </div>
                                                    <div class="col-sm-4 align-self-md-auto" v-if="pointsFollow">
                                                        <span class="float-right"><i class="pe-7s-diamond icon-gradient bg-love-kiss"> </i> {{ pointsFollow }} </span>
                                                    </div>
                                                </div>
                                                <button :disabled="doingRequest" class="btn btn-primary mt-2" v-on:click="updateRequest()">Salvar</button>
                                            </div>
                                            <div class="col-md-4 mb-3 card card-body">
                                                <h5 class="card-title">
                                                    Boost - Curtidas
                                                    <b-form-checkbox class="float-right" v-model="accounts[selectedAccountIndex].is_request_follow" name="check-button" switch size="lg" />
                                                </h5>
                                                <b-list-group v-if="addPost">
                                                    <b-list-group-item href="#" disabled class="flex-column align-items-start">
                                                        <div class="d-flex justify-content-between">
                                                            <h5 class="mb-1">Adicionar Post</h5>
                                                        </div>

                                                        <p class="mb-1">
                                                            <b-img rounded alt="Rounded image"></b-img>
                                                        </p>

                                                    </b-list-group-item>
                                                </b-list-group>
                                                <button class="btn btn-primary mt-2">Salvar</button>
                                            </div>
                                            <div class="col-md-4 mb-3 card card-body">
                                                <h5 class="card-title">DBoost - Comentários</h5>
                                                Em breve.
                                                <button class="btn btn-primary mt-2">Salvar</button>
                                            </div>

                                        </div>

                                    </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        Você já cadastrou suas contas?
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile-icon{
        padding-right: 1%;
    }
</style>

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
            accounts: [],
            doingRequest: false,
            selectedAccountIndex: -1,
            points: {},
            selected: 'first',
            pointsFollow: null,
            modalShow: false,
            addPost: true,
            options: [
                { text: 'Muito devagar', value: 10 },
                { text: 'Devagar', value: 15 },
                { text: 'Normal', value: 20 },
                { text: 'Rápido', value: 25 }
            ]
        }),
        mounted() {
            const self = this;
            self.getAccounts();
            self.getPosts();
        },
        methods: {
            getPosts() {
                const self = this;
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/insta/getPosts', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    console.log(response)

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
            getAccounts() {
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
                        self.accounts.push(account)
                    });

                    // Seleciona a última conta
                    if (self.accounts.length > 0) {
                        self.selectAccount(self.accounts.length - 1)
                    }

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
            updateRequest() {
                const self = this;
                const idInstaTarget = self.selectedAccountIndex
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                const active = self.accounts[self.selectedAccountIndex].is_request_follow;

                axios.post('https://insta.brian.place/api/requests/add', {
                        idInstaTarget: idInstaTarget,
                        type: 'follow',
                        points: self.pointsFollow,
                        activate: active }, config).then(function (response) {

                            if (response.data.success) {
                                self.doingRequest = false;
                                self.getAccounts();
                            } else {
                                new Noty({
                                    theme: 'mint',
                                    text: response.data.message,
                                    timeout: 2500,
                                    layout: 'topRight',
                                    type: 'error',
                                }).show();
                                self.doingRequest = false;
                            }

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
            selectAccount(accountIndex) {
                this.selectedAccountIndex = accountIndex;

                if (this.accounts[accountIndex].instagram_requests[0]) {
                    this.pointsFollow = this.accounts[accountIndex].instagram_requests[0].points
                } else {
                    this.pointsFollow = "15";
                }

            }
        }
    }

</script>
