<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div v-if="isVip === false" class="card-body">
                <h3 class="card-title">Ganhe Seguidores - VIP</h3>

                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h6>Confira os benefícios para quem é VIP</h6>

                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                1. Apareça entre os primeiros perfis promovidos
                                <b-badge variant="warning" pill>VIP</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                2. Ganhe 3 pontos a mais para cada tarefa que completar
                                <b-badge variant="warning" pill>VIP</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                3. Sua conta receberá detalhes de contas VIP
                                <b-badge variant="warning" pill>VIP</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                4. Obter de volta os pontos dados a pessoas que te deram unfollow
                                <b-badge variant="warning" pill>VIP</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                5. Promover até 10 posts simultâneamente
                                <b-badge variant="warning" pill>VIP</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                        <br><br>
                        <div class="text-center">
                            <h3>
                                Custo <i class="diamante icon-gradient bg-love-kiss pe-2x pe-7s-diamond"></i> 1000
                            </h3>
                            <h3>
                                Duração <strong>7 dias</strong>
                            </h3>

                            <b-button class="mr-2 mb-2 btn-hover-shine btn-transition" variant="focus" v-on:click="adquirirVIP">
                                Adquirir VIP por 1000 Diamantes
                            </b-button>
                        </div>
                        <br><br>

                    </div>
                    <div class="col-md-6 col-sm-12">
                        <img src="@/assets/images/V.I.P.jpg" class="table-responsive">
                    </div>


                </div>
            </div>
            <div v-if="isVip" class="card-body">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <b-button class="mr-2 mb-2 btn-hover-shine btn-transition" variant="focus" v-on:click="punirUnfollow">
                            Obter de volta os pontos dados a pessoas que te deram unfollow
                        </b-button>
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
            extract: [],
            doingRequest: false,
            isVip: false,
        }),
        created: function () {
            this.isVip = window.localStorage.getItem('user.is_vip')
            this.isVip = this.isVip === 'true';
        },
        methods: {
            adquirirVIP() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                axios.post(process.env.VUE_APP_HOST+'/api/vip/buyvip', {}, config).then(function (response) {

                    if (response.data.success) {
                        self.isVip = true;
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
            punirUnfollow() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                axios.post(process.env.VUE_APP_HOST+'/api/vip/punirunfollow', {}, config).then(function (response) {

                    if (response.data.success) {
                        self.isVip = true;
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
            }
        }
    }

</script>
