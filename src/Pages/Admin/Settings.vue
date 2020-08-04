<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h3 class="card-title">Configurações - Admin</h3>

                <div class="form-row">
                    <div class="col-md-6 col-sm-12">
                        <div class="position-relative form-group">
                            <label for="bot_username" class="">
                                Username - Instagram
                            </label>
                            <input name="bot_username" v-model="settings.bot_username" id="bot_username" placeholder="Bot Username" type="text" class="form-control">
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="position-relative form-group">
                            <label for="bot_password" class="">
                                Password - Instagram
                            </label>
                            <input name="bot_password" v-model="settings.bot_password" id="bot_password" placeholder="Bot Password" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 col-sm-12">
                        <div class="position-relative form-group">
                            <label for="site_url" class="">
                                Site URL
                            </label>
                            <input name="site_url" v-model="settings.site_url" id="site_url" placeholder="Bot Username" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="float-right">
                    <b-button v-on:click="saveSettings" color="danger" class="mr-2 mb-2" size="lg">
                        Salvar
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import PageTitle from "../../Layout/Components/PageTitle.vue";
    const Noty = require('noty');
    const axios = require('axios');

    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faTrashAlt,
        faCheck
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
    import TaskDay from './Charts/TasksDay'

    library.add(
        faTrashAlt,
        faCheck
    );

    export default {
        components: {
            PageTitle,
            VuePerfectScrollbar,
            'font-awesome-icon': FontAwesomeIcon,
            TaskDay
        },
        data: () => ({
            settings: {},
            doingRequest: false,
            perPage: 15,
            totalRows: 0,
            currentPage: 1
        }),
        created: function () {

            this.getSettingsData();
        },
        methods: {
            getSettingsData() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post(process.env.VUE_APP_HOST + '/api/admin/getsettings', {}, config).then((response) => {

                    self.doingRequest = false;

                    if (response.data.success) {
                        self.settings = response.data.data;
                    } else {
                        new Noty({
                            theme: 'mint',
                            text: response.data.message,
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    }
                }).catch(() => {
                    new Noty({
                        theme: 'mint',
                        text: 'Ocorreu um erro para buscar os dados de pontos.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;
                });

            },
            saveSettings() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post(process.env.VUE_APP_HOST + '/api/admin/savesettings', {
                    settings: self.settings
                }, config).then((response) => {
                    self.doingRequest = false;

                    if (response.data.success) {
                        self.getSettingsData();

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


                }).catch(() => {
                    new Noty({
                        theme: 'mint',
                        text: 'Ocorreu um erro para buscar os dados de pontos.',
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
