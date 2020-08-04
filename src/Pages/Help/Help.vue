<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title text-center">Pedir Ajuda</h5>

                <div class="row">
                    <div class="col-md-3">

                    </div>
                    <div class="col-md-6">
                        <h6>Nós queremos muito te ajudar. Explique como podemos te ajudar que iremos entrar em contato através do <strong>Instagram</strong>.</h6>
                        <h6>Verifique a sua caixa de mensagens do Insta, iremos dar o retorno do seu chamado através de lá.</h6>
                        <h6>Se quiser dar alguma sugestão, ou fazer algum elogio, fale por aqui! :)</h6>
                        <br>
                        <b-form-group id="inputusername" prepend="@"  label-for="username_insta" description=" ">
                            <b-form-textarea id="username_insta" required v-model="pedidoAjuda" placeholder="Descreva bem o seu problema" rows="5">
                            </b-form-textarea>
                            <small class="text-black-50" v-if="pedidoAjuda.length < minimoCaracteres">Restando {{ minimoCaracteres - pedidoAjuda.length}} caracteres.</small>
                            <small class="form-text text-muted">Sua conta não pode ser privada.</small>
                        </b-form-group>

                        <b-button class="mr-2 mb-2 btn-hover-shine btn-transition float-right" variant="warning" v-on:click="enviarPedido" :disabled="doingRequest">Enviar Pedido</b-button>
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
            pedidoAjuda: '',
            usernameInsta: '',
            confirmKey: '',
            doingRequest: false,
            minimoCaracteres: 25
        }),

        methods: {
            enviarPedido() {
                const self = this;

                if (self.pedidoAjuda !== '') {

                    if (self.pedidoAjuda.length > self.minimoCaracteres) {
                        self.doingRequest = true;
                        let config = {
                            headers: {
                                Authorization: window.localStorage.getItem('access_token'),
                            }
                        };
                        axios.post(process.env.VUE_APP_HOST + '/api/help/add', {
                            textHelp: self.pedidoAjuda,
                        }, config).then(function (response) {

                            new Noty({
                                theme: 'mint',
                                text: response.data.message,
                                timeout: 2500,
                                layout: 'topRight',
                                type: response.data.status === true ? 'success' : 'error',
                            }).show();

                            self.doingRequest = false;
                            response.data.status ? self.reiniciarProcesso() : '';
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
                    } else {
                        new Noty({
                            theme: 'mint',
                            text: 'Você precisa escrever mais para enviar o pedido de ajuda!',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    }


                } else {
                    new Noty({
                        theme: 'mint',
                        text: 'Preencha o pedido de ajuda antes de pedir ajuda!',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                }

            },
            reiniciarProcesso() {
                this.pedidoAjuda = '';
            }
        }
    }

</script>
