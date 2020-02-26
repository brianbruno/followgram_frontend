<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h5 class="card-title">Adicionar Conta</h5>

                <div class="row">
                    <div class="col-md-6" v-if="fase === 1">
                        <b-form-group id="inputusername" prepend="@"  label-for="username_insta" description=" ">
                            <b-form-input id="username_insta" type="email" required v-model="usernameInsta" placeholder="Nome de usuário IG (Sem @)">
                            </b-form-input>
                            <small class="form-text text-muted">Sua conta não pode ser privada.</small>
                        </b-form-group>

                        <h3>Como funciona?</h3>
                        <br>
                        <h5><strong>1. </strong>Você adiciona sua conta no Instagram</h5>
                        <h5><strong>2. </strong>Realiza a confirmação</h5>
                        <h5><strong>3. </strong>Adiciona as publicações que você deseja promover (na aba Promover Conta)</h5>
                        <h5><strong>4. </strong>Ganha pontos (na aba Ganhar pontos)</h5>
                        <h5><strong>5. </strong>Aguarda a confirmação (até 3 minutos)</h5>
                        <h5><strong>6. </strong>Recebe novos seguidores e/ou curtidas</h5>
                        <br>
                        <br>
                        <h5>Caso precise de ajuda mande um direct para <strong>@marketingfollowgram.</strong></h5>

                        <b-button class="mr-2 mb-2 btn-hover-shine btn-transition float-right" variant="info" v-on:click="avancarFase1" :disabled="doingRequest">Próximo</b-button>
                    </div>
                    <div class="col-md-6" v-if="fase === 2">

                        <div class="row">
                            <div class="col-md-12">
                                <h3>Estamos quase lá!</h3>
                                <h4>
                                    Siga a seguinte conta para confirmar sua conta:
                                </h4>
                                <h6>
                                    Iremos conferir se quem está cadastrando é realmente o dono da conta. Isso é importante pois <strong>não</strong> permitimos bots no sistema.
                                </h6>
                                <h6 class="text-black-50">
                                    Caso você já siga, deixe de seguir e siga novamente para que o sistema contabilize.
                                </h6>
                                <br>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div class="widget-content-left mr-3">
                                                    <img width="100" class="rounded-circle" src="https://instagram.fymy1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/83043130_268846050754095_2388778716030304256_n.jpg?_nc_ht=instagram.fymy1-1.fna.fbcdn.net&_nc_ohc=OxjWzslBVF8AX_KuPHW&oh=347a79fcaa414f6f679a76ecc61972ab&oe=5EF7DC6C" alt="request.target_user_insta.full_name">
                                                </div>
                                                <div class="widget-content-left">
                                                    <div class="text-black-50">1- Acesse o perfil @marketingfollowgram.</div>
                                                    <div class="text-black-50">2- Clique em seguir.</div>
                                                    <div class="text-black-50">3- Você pode deixar de seguir após confirmar sua conta!</div>
                                                    <br>
                                                </div>

                                            </div>
                                            <div class="text-center">
                                                <a class="btn" href="https://instagram.com/marketingfollowgram" target="_blank">
                                                    <b-button block class="mr-2 mb-2" variant="light" size="lg" role="button">
                                                        <span class="font-weight-bold">Acessar Perfil</span>
                                                    </b-button>
                                                </a>
                                                <br>
                                                <h4>Seguir utilizando a conta: <strong>{{ usernameInsta }}</strong></h4>
                                                <span class="text-black-50">O sistema irá verificar se você realmente seguiu, ok?</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <b-button class="2 mb-2 btn-hover-shine btn-transition float-right" variant="focus" :disabled="doingRequest || secondsWaiting > 0" v-on:click="avancarFase2"><span v-if="secondsWaiting > 0">Aguarde ({{ secondsWaiting }})</span><span v-if="secondsWaiting === 0">Confirmar</span></b-button>
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
                                <b-button class="2 mb-2 btn-hover-shine btn-transition text-white float-right" variant="warning" :disabled="doingRequest" v-on:click="reiniciarProcesso">Cadastrar nova conta</b-button>
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
            tries: 0,
            usernameInsta: '',
            secondsWaiting: 0,
            doingRequest: false,
        }),
        mounted() {
            setInterval(() => {
                if (this.secondsWaiting > 0) {
                    this.secondsWaiting--;
                }
            }, 1000)
        },
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

                        if (response.data.success) {
                            self.fase = 2;
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

                if (self.secondsWaiting === 0) {

                    self.doingRequest = true;
                    self.tries++;

                    let config = {
                        headers: {
                            Authorization: window.localStorage.getItem('access_token'),
                        }
                    };

                    axios.post('https://insta.brian.place/api/insta/confirm2', {
                        username: self.usernameInsta,
                    }, config).then(function (response) {
                        if (response.data.success) {
                            self.fase = 3;
                        } else {
                            self.secondsWaiting = self.tries * 10;
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
                } else {
                    new Noty({
                        theme: 'mint',
                        text: 'Aguarde ' + self.secondsWaiting + ' segundos para tentar novamente',
                        timeout: 1500,
                        layout: 'topRight',
                        type: 'warning',
                    }).show();
                }


            },
            reiniciarProcesso() {
                this.fase = 1;
                this.usernameInsta = '';
            },
            voltarFase1() {
                const self = this;
                self.fase = 1;
            }
        }
    }

</script>
