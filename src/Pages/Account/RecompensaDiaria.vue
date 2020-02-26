<template>
    <div class="text-center">
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h1 class="card-title">Recompensa Diária</h1>
                <div class="row">
                    <div class="offset-md-3 col-md-6 col-sm-12" v-if="!collected">
                        <div class="text-center">
                            <b-card class="small" widht="400">
                                <h3>{{ recompensas[day-1].nome }}</h3>
                                <hr>
                                <b-img :src="recompensas[day-1].imagem" fluid class="sm" width="200"></b-img>
                                <br>
                                <h3>{{ recompensas[day-1].premio }}</h3>
                                <br><br>
                                <b-row>
                                    <b-col class="botao">
                                        <b-button class="mr-2" variant="secondary" v-on:click="getReward">
                                            <span style="color: white;">Coletar</span></b-button>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </div>
                    <div class="offset-md-3 col-md-6 col-sm-12" v-if="collected">
                        <div v-bind:key="recompensa.dia" v-for="(recompensa, index) in recompensas">
                            <div v-show="selectedIndex === index" class="text-center">
                                <b-card class="small" widht="400">
                                    <h3>{{ recompensa.nome }}</h3>
                                    <hr>
                                    <b-img :src="recompensa.imagem" fluid class="sm" width="200"></b-img>
                                    <br>
                                    <b-img v-if="recompensa.tipo === 'vip'" :src="recompensa.sub_imagem" fluid class="sm" width="65"></b-img>
                                    <h3 v-else>{{ recompensa.premio }}</h3>
                                    <br>
                                    <div v-if="recompensa.tipo === 'vip'">
                                        <br>
                                        <br>
                                    </div>
                                    <b-button class="mr-2 mb-2" variant="outline-focus" v-on:click="selectedIndex--" :disabled="selectedIndex === 0">
                                        <font-awesome-icon icon="arrow-left"/>
                                    </b-button>
                                    <b-button class="mr-2 mb-2" variant="outline-focus" v-on:click="selectedIndex++" :disabled="selectedIndex === recompensas.length-1">
                                        <font-awesome-icon icon="arrow-right"/>
                                    </b-button>
                                </b-card>
                            </div>
                        </div>
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
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faArrowRight,
        faArrowLeft
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    library.add(
        faArrowRight,
        faArrowLeft
    );

    export default {
        components: {
            PageTitle,
            'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({
            heading: 'Chart Boxes III',
            subheading: 'Highly configurable boxes best used for showing numbers in an user friendly way.',
            icon: 'pe-7s-wallet icon-gradient bg-plum-plate',
            day: 0,
            doingRequest: false,
            collected: false,
            selectedIndex: 0,
            recompensas: [
                {
                    tipo: 'diamantes',
                    nome: 'Primeiro dia',
                    premio: '15 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'diamantes',
                    nome: 'Segundo dia',
                    premio: '60 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'diamantes',
                    nome: 'Terceiro dia',
                    premio: '80 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'diamantes',
                    nome: 'Quarto dia',
                    premio: '100 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'diamantes',
                    nome: 'Quinto dia',
                    premio: '150 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'diamantes',
                    nome: 'Sexto dia',
                    premio: '180 diamantes',
                    imagem: 'https://i.imgur.com/Z4Jh8Gq.png'
                },
                {
                    tipo: 'vip',
                    nome: 'Sétimo dia',
                    imagem: 'https://i.imgur.com/3Emh30E.png',
                    sub_imagem: 'https://i.imgur.com/VqrHNuY.png'
                },
            ]
        }),
        mounted() {
            setInterval(() => {
                if (this.secondsWaiting > 0) {
                    this.secondsWaiting--;
                }
            }, 1000);
            this.getDayReward();
        },
        methods: {
            getReward() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                axios.post('https://insta.brian.place/api/reward/getreward', {}, config).then(function (response) {
                    self.getDayReward();
                    if (response.data.success) {
                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'success',
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
            },
            getDayReward() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                axios.post('https://insta.brian.place/api/reward/getdayreward', {}, config).then(function (response) {

                    if (response.data.success) {
                        self.day = response.data.day;
                        self.collected = response.data.collected;

                        if (self.collected) {
                            self.selectedIndex = self.day-1;
                        }
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

            },

        }
    }

</script>
