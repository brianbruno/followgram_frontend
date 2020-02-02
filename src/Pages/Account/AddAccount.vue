<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Adicionar Conta</h5>

                <div class="row">
                    <div class="col-md-6" v-if="fase === 1">
                        <b-form-group id="inputusername" label-for="username_insta" description=" ">
                            <b-form-input id="username_insta" type="email" required v-model="usernameInsta" placeholder="Nome de usuário IG">
                            </b-form-input>
                            <small class="form-text text-muted">Sua conta não pode ser privada.</small>
                        </b-form-group>

                        <b-button class="mr-2 mb-2 btn-hover-shine btn-transition float-right" variant="info" v-on:click="avancarFase1" :disabled="doingRequest">Próximo</b-button>
                    </div>
                    <div class="col-md-6" v-if="fase === 2">

                        <div class="row">
                            <div class="col-md-12">
                                <h3>Quase lá!</h3>
                                <h4>
                                    Copie e cole o código a seguir nos comentários da sua última foto:
                                </h4>
                                <h6>
                                    {{ confirmKey }}
                                </h6>
                                <h5>
                                    Você pode apagar o comentário logo após
                                </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <b-button class="2 mb-2 btn-hover-shine btn-transition float-right" variant="focus" :disabled="doingRequest" v-on:click="avancarFase2">Confirmar</b-button>
                                <b-button class="mr-2 mb-2 border-0 btn-transition float-right" variant="outline-secondary" v-on:click="voltarFase1" :disabled="doingRequest">Voltar</b-button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" v-if="fase === 3">

                        <div class="row">
                            <div class="col-md-12">
                                <h3>Deu tudo certo!</h3>
                                <h4>
                                    Agora é só começar a ganhar seguidores.
                                </h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <router-link :to="{ path:  '/home'}">
                                    <b-button class="2 mb-2 btn-hover-shine btn-transition float-right" variant="success" :disabled="doingRequest">Começar!</b-button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="https://gerenciagram.com.br/blog/wp-content/uploads/2019/02/biografia-no-instagram.jpg" class="table-responsive">
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
            confirmKey: '',
            doingRequest: false,
        }),

        methods: {
            avancarFase1() {
                const self = this;

                if (self.usernameInsta && self.usernameInsta.length >= 3) {
                    self.doingRequest = true;
                    let config = {
                        headers: {
                            Authorization: window.localStorage.getItem('access_token'),
                        }
                    };
                    axios.post('https://insta.brian.place/api/insta/adduser', {
                        username: self.usernameInsta,
                    }, config).then(function (response) {
                        self.confirmKey = response.data.confirmKey;
                        self.fase = 2;
                        self.doingRequest = false;
                    }).catch(function () {
                        new Noty({
                            theme: 'mint',
                            text: 'Usuário ou senha inválidos',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                        self.doingRequest = false;
                    });

                } else {
                    new Noty({
                        theme: 'mint',
                        text: 'Digite uma conta do IG válida.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                }

            },
            avancarFase2() {
                const self = this;

                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/insta/confirm', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    if (response.data.success) {
                        self.fase = 3;
                    } else {
                        new Noty({
                            theme: 'mint',
                            text: 'Ainda não conseguimos verificar sua conta! Confirme o código e tente novamente.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    }

                    self.doingRequest = false;
                }).catch(function () {
                    new Noty({
                        theme: 'mint',
                        text: 'Usuário ou senha inválidos',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;
                });
            },
            voltarFase1() {
                const self = this;
                self.fase = 1;
            }
        }
    }

</script>
