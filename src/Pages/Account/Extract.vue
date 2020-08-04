<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h3 class="card-title">Extrato - Últimos 30 registros</h3>

                <div class="row responsive-center" >
                    <div class="col-md-6">
                        <ul class="todo-list-wrapper list-group list-group-flush">
                            <li class="list-group-item" v-for="itemExtract in extract" v-bind:key="itemExtract.id">
                                <div class="widget-content p-0">
                                    <div class="widget-content-wrapper">
                                        <div class="widget-content-left flex2">
                                            <div class="widget-heading">{{ itemExtract.description }}</div>
                                            <div class="widget-subheading">{{ itemExtract.created_at }}</div>
                                        </div>
                                        <div class="widget-content-right">
                                            <div class="badge mr-2" v-bind:class="[itemExtract.type === 'positive' ? 'badge-success' : 'badge-warning']">
                                                <span v-if="itemExtract.type === 'positive'">Ganhou </span>
                                                <span v-else>Perdeu </span>
                                                {{ itemExtract.points }} pontos
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
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

    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faTrashAlt,
        faCheck
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faTrashAlt,
        faCheck
    );

    export default {
        components: {
            PageTitle,
            VuePerfectScrollbar,
            'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({
            extract: [],
            doingRequest: false,
        }),
        created: function () {
            this.getExtract();
        },
        methods: {
            getExtract() {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };
                axios.post(process.env.VUE_APP_HOST+'/api/auth/extract', {}, config).then(function (response) {
                    self.extract = response.data.data;

                    self.doingRequest = false;
                }).catch(function () {
                    new Noty({
                        theme: 'mint',
                        text: 'Ocorreu um erro para buscar seu extrato.',
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
