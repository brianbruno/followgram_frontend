<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="6" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <div class="modal-dialog w-100">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="h5 modal-title">
                                    Recuperação da Senha
                                    <h6 class="mt-1 mb-0 opacity-8">
                                        <span>Cadastre uma nova senha.</span>
                                    </h6>
                                </div>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <b-form-group id="inputGroup1"
                                                  label-for="exampleInput1"
                                                  description="Digite seu e-mail cadastrado para confirmarmos que é você.">
                                        <b-form-input id="email"
                                                      type="email"
                                                      required
                                                      placeholder="Email..."
                                                      v-model="email">
                                        </b-form-input>
                                    </b-form-group>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <b-form-group id="inputGroup2"
                                                          label-for="exampleInput2">
                                                <b-form-input id="password"
                                                              type="password"
                                                              required
                                                              placeholder="Senha..."
                                                              v-model="password">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-md-6">
                                            <b-form-group id="inputGroup3"
                                                          label-for="exampleInput2">
                                                <b-form-input id="password_confirmation"
                                                              type="password"
                                                              required
                                                              placeholder="Repita sua senha..."
                                                              v-model="password_confirmation">
                                                </b-form-input>
                                            </b-form-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-right">
                                    <b-button variant="primary" size="lg" v-on:click="reset" :disabled="doingRequest">Enviar</b-button>
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
                password_confirmation: '',
                token: '',
                doingRequest: false,
            }
        },
        mounted() {
            const self = this;
            self.token = this.$route.params.token;
        },
        methods: {
            reset: function () {
                const self = this;
                self.doingRequest = true;

                if (self.email && self.password && (self.password === self.password_confirmation)) {
                    axios.post('https://insta.brian.place/api/password/reset', {
                        email: self.email,
                        password: self.password,
                        password_confirmation: self.password_confirmation,
                        token: self.token
                    }).then(function (response) {
                            self.doingRequest = false;
                            new Noty({
                                theme: 'mint',
                                text: 'Deu tudo certo! Agora faça o login. :)',
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'info',
                            }).show();

                            self.$router.push('/')
                    })
                        .catch(function () {
                            self.doingRequest = false;
                            new Noty({
                                theme: 'mint',
                                text: 'Ocorreu um erro. Pode ser que seu token não esteja mais válido.',
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'error',
                            }).show();
                        });
                } else {
                    if (self.password === self.password_confirmation) {
                        new Noty({
                            theme: 'mint',
                            text: 'As senhas não são iguais.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                        self.doingRequest = false;
                    }

                    if (self.email && self.password && self.password_confirmation) {
                        self.doingRequest = false;
                        new Noty({
                            theme: 'mint',
                            text: 'Preencha todos os campos.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    }

                }
            }
        }

    }
</script>
