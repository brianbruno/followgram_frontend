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
                                    Esqueceu sua senha?
                                    <h6 class="mt-1 mb-0 opacity-8">
                                        <span>Use seu email para recuperá-la.</span>
                                    </h6>
                                </div>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <Form>
                                        <b-row form>
                                            <b-col md="12">
                                                <b-form-group>
                                                    <Label for="exampleEmail">Email</Label>
                                                    <b-form-input type="email" v-model="email" name="email" id="exampleEmail"
                                                                  placeholder="Email..."/>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </Form>
                                </div>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    <router-link :to="{ path: '/login'}">
                                    <a class="text-primary">Entrar com uma conta existente</a></router-link>
                                </h6>
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
                doingRequest: false,
            }
        },
        methods: {
            reset: function () {
                const self = this;
                self.doingRequest = true;

                if (self.email) {
                    axios.post('https://insta.brian.place/api/password/create', {
                        email: self.email
                    }).then(function (response) {
                            self.doingRequest = false;
                            new Noty({
                                theme: 'mint',
                                text: response.data.message,
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'info',
                            }).show();
                        })
                        .catch(function () {
                            self.doingRequest = false;
                            new Noty({
                                theme: 'mint',
                                text: 'E-mail não cadastrado.',
                                timeout: 2500,
                                layout: 'topRight',
                                type: 'error',
                            }).show();
                        });
                } else {
                    self.doingRequest = false;
                    new Noty({
                        theme: 'mint',
                        text: 'Digite o e-mail.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                }
            }
        }

    }
</script>
