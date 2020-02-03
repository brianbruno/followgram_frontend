<template>
    <div>
        <div class="content">
            <div class="row">
                <div class="col-md-4" v-bind:key="request.id" v-for="request in requests">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Seguir</div>
                        <div class="card-body">
                            <div v-if="show.includes(request.id)">
                                <img class="imagemperfil" :src="request.target_user_insta.profile_pic_url" style="width:100px;height:100px;" align="left" ><h5 class="card-title">{{ request.points }} Pontos</h5> {{ request.target_user_insta.full_name}}.
                                <div>
                                    <button v-on:click="ganharPontos(request.id)" class="mr-2 btn btn-success">Ganhe Pontos</button>
                                </div>
                            </div>
                            <div v-if="!show.includes(request.id)">
                                <div>
                                    <h5 class="pontos">{{ request.points }}</h5>
                                    <i class="diamante icon-gradient bg-love-kiss pe-2x pe-7s-diamond"></i>
                                    <h5 class="frase1">1- Acesse o perfil @{{request.target_user_insta.username}}.</h5>
                                    <h5 class="frase2">2- Clique em <i class="pe-7s-like"></i>.</h5>
                                    <div>
                                        Seguir usando:
                                        <select v-model="idInstaFollowing" class="form-control-sm">
                                            <option v-bind:key="account.id" v-for="account in accounts" :value="account.id">{{ account.username }}</option>
                                        </select>
                                    </div>
                                    <hr>
                                    <div class="botoes">
                                        <button v-on:click="voltar(request.id)" class="botao mr-2 btn btn-success" :disabled="doingRequest">Voltar</button>
                                        <button v-on:click="confirmQuest(request.id, request.insta_target)" class="mr-2 btn btn-success" :disabled="doingRequest">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .botao{
        background-color: rgb(166, 175, 172);
    }

    .diamante{
        position: fixed;
        height: 300px;
    }

    .pontos{
        position: absolute;
        left: 0mm;

    }
    .frase1{
        position: relative;
        left: 15mm;
        color: gray;
        font-size: 3mm;
    }
    .frase2{
        position: relative;
        left: 15mm;
        color: gray;
        font-size: 3mm;
    }

    .botoes{
        position: relative;
        left: 22mm;
    }

    .card-footer{
        color: rgb(169, 173, 175);
    }

    .card-body{
        position: relative;
        left: 40px;
    }

    .imagemperfil{
        position: relative;
        right: 20px;
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
            ganharPontos(id){
                const self = this;
                const bkp = self.show;
                self.show = [];

                bkp.forEach(function (requestId) {
                    if (requestId !== id) {
                        self.show.push(requestId);
                    }
                });

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
            confirmQuest(idQuest, idFollowTarget) {
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
