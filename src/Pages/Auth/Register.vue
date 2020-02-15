<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="h-100 bg-premium-dark">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <div class="modal-dialog w-100">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h5 class="modal-title">
                                    <h4 class="mt-2">
                                        <div>Bem-Vindo,</div>
                                        <span>Crie agora sua conta e comece a ganhar seguidores:</span>
                                    </h4>
                                </h5>
                                <div class="divider"/>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description=" ">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  placeholder="Email..."
                                                  v-model="email">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup12"
                                              label-for="exampleInput12">
                                    <b-form-input id="exampleInput12"
                                                  type="text"
                                                  required
                                                  placeholder="Nome..."
                                                  v-model="name"  >
                                    </b-form-input>
                                </b-form-group>
                                <div class="row">
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Senha..."
                                                          v-model="password">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Repita sua senha..."
                                                          v-model="password_confirmation">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                                <b-form-checkbox name="check" id="exampleCheck"  v-model="termos">
                                    Aceito os <a href="javascript:void(0);">Termos e Condições</a>.
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Já possui uma conta?
                                    <router-link :to="{ path:  '/'}">
                                    <span href="javascript:void(0);" class="text-primary">Login</span></router-link>
                                    <a>  |</a>
                                    <router-link :to="{ path:  '/pages/forgot-password-boxed'}">
                                    <span class="text-primary"> Esqueci a senha </span></router-link>
                                </h6>
                            </div>
                            <div class="modal-footer d-block text-center">
                                <b-button v-on:click="register" color="primary" class="btn-wide btn-pill btn-shadow btn-hover-shine"
                                          size="lg">Criar conta
                                </b-button>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; Ganhe Seguidores 2020
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');
    const Noty = require('noty');

    export default {
        data: function () {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                termos: '',
                doingRequest: false,
                refferId: '',
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.refferId = this.$route.params.id;
            }

        },
        methods: {
            register: function () {
                const self = this;
                self.doingRequest = true;

                if (self.name && self.email && self.password && self.password_confirmation) {

                    if (!!self.termos) {
                        if (self.password !== self.password_confirmation) {
                            new Noty({
                                theme: 'mint',
                                text: 'As senhas digitadas não são iguais.',
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'error',
                            }).show();
                            self.doingRequest = false;
                        } else {

                            axios.post('https://insta.brian.place/api/auth/signup', {
                                name: self.name,
                                email: self.email,
                                password: self.password,
                                password_confirmation: self.password_confirmation,
                                reffer_id: self.refferId ? self.refferId : false
                            })
                                .then(function (response) {
                                    window.localStorage.setItem('access_token', response.data.token_type + ' ' + response.data.access_token);
                                    self.doingRequest = false;
                                    self.login();
                                })
                                .catch(function (error) {
                                    self.doingRequest = false;

                                    const keys = Object.keys(error.response.data.errors);

                                    keys.forEach(function (key) {
                                        const errosReported = error.response.data.errors[key];

                                        errosReported.forEach(function (message) {
                                            new Noty({
                                                theme: 'mint',
                                                text: message,
                                                timeout: 2500,
                                                layout: 'topRight',
                                                type: 'error',
                                            }).show();
                                        });


                                    });


                                });
                        }

                    } else {
                        new Noty({
                            theme: 'mint',
                            text: 'É necessário aceitar os termos e condições.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                        self.doingRequest = false;
                    }

                } else {
                    new Noty({
                        theme: 'mint',
                        text: 'Preencha todos os campos.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;
                }
            },
            login: function () {
                const self = this;

                self.doingRequest = true;

                if (self.email && self.password) {
                    axios.post('https://insta.brian.place/api/auth/login', {
                        email: self.email,
                        password: self.password,
                        remember_me: !!self.remember_me
                    })
                        .then(function (response) {
                            window.localStorage.setItem('access_token', response.data.token_type + ' ' + response.data.access_token);
                            self.doingRequest = false;
                            self.userInfo();
                        })
                        .catch(function () {
                            self.doingRequest = false;
                            new Noty({
                                theme: 'mint',
                                text: 'Usuário ou senha inválidos',
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'error',
                            }).show();
                        });
                } else {
                    self.doingRequest = false;
                    new Noty({
                        theme: 'mint',
                        text: 'Digie o e-mail e a senha.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                }
            },
            userInfo: function () {
                const self = this;
                // user.name
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                self.doingRequest = true;
                axios.post('https://insta.brian.place/api/auth/user', {}, config)
                    .then(function (response) {
                        window.localStorage.setItem('user.id', response.data.id);
                        window.localStorage.setItem('user.name', response.data.name);
                        window.localStorage.setItem('user.new_followers', response.data.new_followers);
                        window.localStorage.setItem('user.new_comments', response.data.new_comments);
                        window.localStorage.setItem('user.new_likes', response.data.new_likes);
                        window.localStorage.setItem('user.points', response.data.points);
                        window.localStorage.setItem('user.pending_points', response.data.pending_points);
                        self.$router.push('/adicionarconta');
                        self.doingRequest = false;
                    })
                    .catch(function (error) {
                        self.doingRequest = false;
                        new Noty({
                            theme: 'mint',
                            text: error.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    });
            }

        }

    }
</script>
