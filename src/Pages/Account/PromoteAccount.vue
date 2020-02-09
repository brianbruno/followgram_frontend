<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="row">
            <div class="col-md-12">
                <div class="main-card mb-3 card">
                    <div class="card-body" v-if="accounts.length > 0">
                        <h5>Suas contas:</h5>
                        <div class="row">
                            <div class="col-md-12">
                                <img v-bind:key="account.id" v-for="(account, index) in accounts" v-on:click="selectAccount(index)" width="60" class="rounded-circle " :src="account.profile_pic_url" :alt="account.username">
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
                                                <img width="100" class="rounded-circle" :src="accounts[selectedAccountIndex].profile_pic_url" alt="">
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
                                                                id="pointsFollow"
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
                                                    <!--<b-form-checkbox class="float-right" v-model="accounts[selectedAccountIndex].is_request_like" name="check-button" switch size="lg" />-->
                                                </h5>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex justify-content-between" v-if="accounts[selectedAccountIndex].instagram_requests.filter((item) => { return item.type === 'like'}).length > 0">
                                                            <h5 class="mb-1">Posts promovidos</h5>
                                                        </div>
                                                        <ul class="list-group list-group-flush">
                                                            <li class="list-group-item" v-bind:key="post.id" v-for="post in accounts[selectedAccountIndex].instagram_requests.filter((item) => { return item.type === 'like'})">
                                                                <div class="widget-content p-0">
                                                                    <div class="widget-content-wrapper">
                                                                        <div class="widget-content-left mr-3">
                                                                            <img width="42" class="rounded-circle" :src="post.post_img" alt="">
                                                                        </div>
                                                                        <div class="widget-content-left">
                                                                            <div class="widget-heading"><i class="pe-7s-diamond icon-gradient bg-love-kiss"> </i> {{ post.points }}</div>
                                                                        </div>
                                                                        <div class="widget-content-right">
                                                                            <div role="group" class="btn-group-sm btn-group">
                                                                                <b-button class="border-0 btn-transition" variant="outline-danger" :disabled="doingRequest" v-on:click="deleteLikeRequest(post.id)"><i class="pe-7s-trash    "> </i></b-button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex justify-content-between">
                                                            <h5 class="mb-1">Adicionar Post</h5>
                                                        </div>

                                                        <img v-bind:key="post.id" v-for="(post, index) in postsAccount" width="60" class="rounded-circle " :src="post.imgUrl" v-on:click="selectPost(index)">
                                                    </div>
                                                </div>
                                                <br>
                                                <!-- Mostra apenas se for selecionar um novo post -->
                                                <div v-if="postSelectedIndex !== -1">
                                                    <div class="row">
                                                        <div class="col-sm-12">
                                                            <img width="60" class="rounded-circle " :src="postsAccount[postSelectedIndex].imgUrl">
                                                            {{ postsAccount[postSelectedIndex].caption.slice(0, 20) }}...
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-8">
                                                            <b-form-group label="Ganhar likes:">
                                                                <b-form-radio-group
                                                                    id="pointsLike"
                                                                    v-model="pointsLike"
                                                                    :options="optionsLike"
                                                                    name="pointsLike"
                                                                    stacked/>
                                                            </b-form-group>
                                                        </div>
                                                        <div class="col-sm-4 align-self-md-auto" v-if="pointsLike">
                                                            <span class="float-right"><i class="pe-7s-diamond icon-gradient bg-love-kiss"> </i> {{ pointsLike }} </span>
                                                        </div>
                                                    </div>
                                                    <button :disabled="doingRequest" v-on:click="createLikes" class="btn btn-primary mt-2">Salvar</button>
                                                </div>
                                            </div>
                                            <div class="col-md-4 mb-3 card card-body">
                                                <h5 class="card-title">Boost - Comentários</h5>
                                                Em breve.
                                                <button :disabled="doingRequest" class="btn btn-primary mt-2">Salvar</button>
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
            postsAccount: [],
            doingRequest: false,
            selectedAccountIndex: -1,
            postSelectedIndex: -1,
            points: {},
            selected: 'first',
            pointsFollow: null,
            pointsLike: null,
            modalShow: false,
            addPost: true,
            optionsLike: [
                { text: 'Muito devagar', value: 6 },
                { text: 'Devagar', value: 8 },
                { text: 'Normal', value: 10 },
                { text: 'Rápido', value: 12 },
                { text: 'Ultra Rápido', value: 14 },
            ],
            options: [
                { text: 'Muito devagar', value: 10 },
                { text: 'Devagar', value: 15 },
                { text: 'Normal', value: 20 },
                { text: 'Rápido', value: 25 },
                { text: 'Ultra Rápido', value: 30 }
            ]
        }),
        mounted() {
            const self = this;
            self.getAccounts(true);
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
                    username: self.accounts[self.selectedAccountIndex].username,
                }, config).then(function (response) {
                    const postAccount = response.data.data;
                    self.postsAccount = [];
                    postAccount.forEach(function (account) {
                        self.postsAccount.push(account)
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
            getAccounts(selectAccount) {
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

                    if (selectAccount) {
                        // Seleciona a última conta
                        if (self.accounts.length > 0 && self.postSelectedIndex === -1) {
                            self.selectAccount(self.accounts.length - 1)
                        }
                    }

                    self.doingRequest = false;

                    self.getPosts();
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
                const idInstaTarget = self.accounts[self.selectedAccountIndex].id
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
                                self.getAccounts(false);
                                new Noty({
                                    theme: 'mint',
                                    text: response.data.message,
                                    timeout: 2500,
                                    layout: 'topRight',
                                    type: 'success',
                                }).show();
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
                this.postsAccount = []

                if (this.accounts[accountIndex].instagram_requests[0]) {
                    this.pointsFollow = this.accounts[accountIndex].instagram_requests[0].points
                } else {
                    this.pointsFollow = "15";
                }
                this.pointsLike = "15";
                this.getPosts();
                this.selectPost(-1);

            },
            createLikes() {
                const self = this;
                const idInstaTarget = self.accounts[self.selectedAccountIndex].id;
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                //const active = self.accounts[self.selectedAccountIndex].is_request_like;
                const active = true;

                axios.post('https://insta.brian.place/api/requests/add', {
                    idInstaTarget: idInstaTarget,
                    type: 'like',
                    post_url: self.postsAccount[self.postSelectedIndex].link,
                    post_img: self.postsAccount[self.postSelectedIndex].imgUrl,
                    points: self.pointsLike,
                    activate: active }, config).then(function (response) {

                    if (response.data.success) {
                        self.doingRequest = false;
                        self.postSelectedIndex = -1;
                        self.getAccounts(false);
                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'success',
                        }).show();
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
            selectPost(indexSelectedPost) {
                this.postSelectedIndex = indexSelectedPost;
            },
            deleteLikeRequest(id) {
                const self = this;

                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/requests/deletelikerequest', { idRequest: id }, config).then(function (response) {

                    if (response.data.success) {
                        self.doingRequest = false;
                        self.getAccounts(false);

                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'success',
                        }).show();
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
            }
        }
    }

</script>
