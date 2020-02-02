<template>
    <div>
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
                                                  placeholder="Email...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup12"
                                              label-for="exampleInput12">
                                    <b-form-input id="exampleInput12"
                                                  type="text"
                                                  required
                                                  placeholder="Nome de  usuário...">
                                    </b-form-input>
                                </b-form-group>
                                <div class="row">
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Senha...">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Repita sua senha...">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                                <b-form-checkbox name="check" id="exampleCheck">
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
                                <router-link :to="{ path:  '/home'}">
                                <b-button color="primary" class="btn-wide btn-pill btn-shadow btn-hover-shine"
                                          size="lg">Criar conta
                                </b-button></router-link>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; ArchitectUI 2019
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        data: function () {
            return {
                email: '',
                password: '',
                remember_me: ''
            }
        },
        methods: {
            register: function () {
                const self = this;

                axios.post('https://insta.brian.place/api/auth/login', {
                    email: self.email,
                    password: self.password,
                    remember_me: self.remember_me
                })
                    .then(function (response) {
                        window.localStorage.setItem('access_token', response.data.token_type + ' ' + response.data.access_token);
                        self.$router.push('/home');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }

    }
</script>