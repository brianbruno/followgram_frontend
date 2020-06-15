<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>
                    
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Bem-vindo (a),</div>
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
                                                  v-on:keyup.enter="button_login"
                                                  placeholder="Senha...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox name="check" id="exampleCheck" v-model="remember_me">
                                    Manter-me logado
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Não possui uma conta?
                                    <router-link :to="{ path:  '/registro'}">
                                        <span class="text-primary">Registre-se agora</span>
                                    </router-link>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <router-link :to="{ path:  '/esquecisenha'}">
                                        <a class="btn-lg btn btn-link" :disabled="doingRequest">Esqueci a senha</a>
                                    </router-link>
                                </div>
                                <div class="float-right">
                                    <b-button variant="primary" size="lg" :disabled="doingRequest" v-on:click="button_login">
                                        Login
                                    </b-button>
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
    // import {mapActions, mapState, mapMutations} from 'vuex'
    import { mapActions } from 'vuex'
    
    const Noty = require('noty')
    
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
            ...mapActions(['login']),
            button_login: function () {
                
                const self = this
                self.doingRequest = true
                
                if (self.email && self.password) {
                    
                    const request = {
                        email: self.email,
                        password: self.password,
                        remember_me: !!self.remember_me,
                    }
                    
                    self.login(request).then(function () {
                        self.doingRequest = false
                        self.$router.push('/home')
                    }).catch(function () {
                        self.doingRequest = false
                        new Noty({
                            theme: 'mint',
                            text: 'Usuário ou senha inválidos',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show()
                    });
                    
                } else {
                    self.doingRequest = false
                    new Noty({
                        theme: 'mint',
                        text: 'Digite o e-mail e a senha.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show()
                }
            },
        },
        
    }
</script>
