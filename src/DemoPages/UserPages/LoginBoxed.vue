<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Bem-Vindo</div>
                                        <span>Faça seu login para continuar.</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description=" ">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  v-model="email"
                                                  placeholder="Email...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  v-model="password"
                                                  placeholder="Senha...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox name="check" id="exampleCheck" v-model="remember_me">
                                    Manter-me logado
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Não possui uma conta?
                                    <router-link :to="{ path:  '/pages/register-boxed'}">
                                    <span class="text-primary">Registre-se agora</span>
                                    </router-link>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <router-link :to="{ path:  '/pages/forgot-password-boxed'}">
                                    <a  class="btn-lg btn btn-link">Esqueci a senha</a></router-link>
                                </div>
                                <div class="float-right">
                                    <b-button variant="primary" size="lg" :disabled="doingRequest" v-on:click="login">Login</b-button>
                                </div>
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
            email: '',
            password: '',
            remember_me: '',
            doingRequest: false,
        }
    },
    methods: {
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
                        self.doingRequest = false;
                        window.localStorage.setItem('access_token', response.data.token_type + ' ' + response.data.access_token);
                        self.userInfo()
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
            self.doingRequest = true;
            // user.name
            let config = {
                headers: {
                    Authorization: window.localStorage.getItem('access_token'),
                }
            };

            axios.post('https://insta.brian.place/api/auth/user', {}, config)
                .then(function (response) {
                    self.doingRequest = false;
                    window.localStorage.setItem('user.id', response.data.id);
                    window.localStorage.setItem('user.name', response.data.name);
                    window.localStorage.setItem('user.new_followers', response.data.new_followers);
                    window.localStorage.setItem('user.new_comments', response.data.new_comments);
                    window.localStorage.setItem('user.new_likes', response.data.new_likes);
                    window.localStorage.setItem('user.points', response.data.points);
                    window.localStorage.setItem('user.pending_points', response.data.pending_points);
                    self.$router.push('/home');
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
        }
    }

}
</script>
