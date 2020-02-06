<template>
    <div>
        <div class="content">
            <div class="row">
                <div class="col-md-4" v-bind:key="request.id" v-for="request in requests">
                    <div class="main-card mb-3 card">
                        <div class="card-header" v-if="request.type == 'follow'"><h5>Seguir @{{request.target_user_insta.username}}</h5></div>
                        <div class="card-header" v-if="request.type == 'like'"><h5>Curtir foto de @{{request.target_user_insta.username}}</h5></div>
                        <div class="card-header" v-if="request.type == 'comment'"><h5>Comentar</h5></div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" v-if="show.includes(request.id)">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img v-if="request.type === 'follow'" width="100" class="rounded-circle" :src="request.target_user_insta.profile_pic_url" alt="request.target_user_insta.full_name">
                                                <img v-if="request.type === 'like'" width="100" class="rounded-circle" :src="request.post_img" alt="request.target_user_insta.full_name">
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">{{ request.target_user_insta.full_name}}</div>
                                                <div class="widget-subheading">{{ request.points }} Pontos</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div role="group" class="btn-group-sm btn-group">
                                                    <button v-if="request.type === 'follow'" type="button" v-on:click="ganharPontos(request.id, 'https://instagram.com/'+request.target_user_insta.username)" class="btn-shadow btn btn-primary">Ganhe Pontos</button>
                                                    <button v-if="request.type === 'like'" type="button" v-on:click="ganharPontos(request.id, request.post_url)" class="btn-shadow btn btn-primary">Ganhe Pontos</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item" v-if="!show.includes(request.id)">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img v-if="request.type === 'follow'" width="100" class="rounded-circle" :src="request.target_user_insta.profile_pic_url" alt="request.target_user_insta.full_name">
                                                <img v-if="request.type === 'like'" width="100" class="rounded-circle" :src="request.post_img" alt="request.target_user_insta.full_name">
                                            </div>
                                            <div class="widget-content-left">
                                                <h3 class="widget-heading"><i class="diamante icon-gradient bg-love-kiss pe-2x pe-7s-diamond"></i> {{ request.points }} pontos</h3>
                                                <div>1- Acesse o perfil @{{request.target_user_insta.username}}.</div>
                                                <div v-if="request.type === 'follow'">2- Clique em seguir.</div>
                                                <div v-if="request.type === 'follow'">Clique <a :href="'https://instagram.com/'+request.target_user_insta.username" target="_blank">aqui</a> para acessar o perfil</div>
                                                <div v-if="request.type === 'like'">2- Clique em <i class="pe-7s-like"></i>.</div>
                                                <div v-if="request.type === 'like'">Clique <a :href="request.post_url" target="_blank">aqui</a> para acessar a foto</div>
                                            </div>
                                        </div>
                                        <br>
                                        <div>
                                            <b-form>
                                                <label>Completar ação utilizando a conta: </label>
                                                <div class="col-md-12">
                                                    <b-form-select v-model="idInstaFollowing" class="form-control-sm" size="sm">
                                                        <option v-bind:key="account.id" v-for="account in accounts" :value="account.id">{{ account.username }}</option>
                                                    </b-form-select>
                                                </div>
                                            </b-form>
                                            <br>
                                            <button v-on:click="confirmQuestFollow(request.id, request.insta_target)" v-if="request.type === 'follow'" class="btn-shadow btn btn-primary float-right" :disabled="doingRequest">Confirmar</button>
                                            <button v-on:click="confirmQuestLike(request.id)" v-if="request.type === 'like'" class="btn-shadow btn btn-primary float-right" :disabled="doingRequest">Confirmar</button>
                                            <b-button v-on:click="voltar(request.id)" class="mr-2 mb-2 border-0 btn-transition float-right" variant="outline-danger" :disabled="doingRequest">Voltar</b-button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="requests.length === 0" class="text-center">
                    <div class="main-card card">
                        <div class="card-body">
                            <h2>
                                Parece que não temos nenhuma interação disponível para você.
                            </h2>
                            <h2>
                                Que tal chamar seus amigos?
                            </h2>
                        </div>
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
            heading: 'Cards',
            subheading: 'Wide selection of cards with multiple styles, borders, actions and hover effects.',
            icon: 'pe-7s-stopwatch icon-gradient bg-amy-crisp',
            show: [],
            doingRequest: false,
            requests: [],
            idInstaFollowing: '',
            accounts: []
        }),
        mounted() {
            const self = this;
            self.getRequesters();
            self.getAccounts();
        },
        methods: {
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

                    if (self.accounts.length === 0) {
                        new Noty({
                            theme: 'mint',
                            text: "Você não possui nenhuma conta cadastrada! Adicione sua conta para ganhar pontos.",
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    } else {
                        self.idInstaFollowing = self.accounts[self.accounts.length-1].id
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
            ganharPontos(id, url){
                const self = this;
                const bkp = self.show;
                self.show = [];

                bkp.forEach(function (requestId) {
                    if (requestId !== id) {
                        self.show.push(requestId);
                    }
                });

                const win = window.open(url, '_blank');
                win.focus();

            },
            voltar(id){
                this.show.push(id);
            },
            getRequesters() {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/requests/get', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    const requests = response.data.data;
                    self.show = [];
                    self.requests = [];
                    requests.forEach(function (request) {
                        self.show.push(request.id);
                        self.requests.push(request)
                    });
                    self.doingRequest = false;

                    if (self.requests.length === 0) {
                        new Noty({
                            theme: 'mint',
                            text: 'Não foi encontrada nenhuma interação. :(',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
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
            removeQuest(idQuest){
                const self = this;

                const bkp = self.requests;
                self.requests = [];

                bkp.forEach(function (request) {
                    if (request.id !== idQuest) {
                        self.requests.push(request);
                    }
                });

                if (self.requests.length === 0) {
                    self.getRequesters();
                }
            },
            confirmQuestFollow(idQuest, idFollowTarget) {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/follow/addfollow', {
                    idQuest: idQuest,
                    idInstaFollowing: self.idInstaFollowing,
                    idFollowTarget: idFollowTarget
                }, config).then(function (response) {

                    if (response.data.success) {
                        new Noty({
                            theme: 'mint',
                            text: 'Tudo certo! Em breve seus pontos serão contabilizados caso você tenha realizado a tarefa.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'info',
                        }).show();

                        self.removeQuest(idQuest);
                    } else {
                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
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
            confirmQuestLike(idQuest) {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/photolike/photolike', {
                    idQuest: idQuest,
                    idInstaLiking: self.idInstaFollowing
                }, config).then(function (response) {

                    if (response.data.success) {
                        new Noty({
                            theme: 'mint',
                            text: 'Tudo certo! Em breve seus pontos serão contabilizados caso você tenha realizado a tarefa.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'info',
                        }).show();
                        self.removeQuest(idQuest);
                    } else {
                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
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
            }
        }
    }
</script>
