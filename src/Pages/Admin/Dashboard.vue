<template>
    <div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h3 class="card-title">Painel - Admin</h3>

                <div class="row responsive-center" >
                    <div class="col-md-6 col-sm-12">
                        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
                        <b-table striped hover
                                 :items="getPointsData"
                                 :busy.sync="doingRequest"
                                 :current-page="currentPage"
                                 :per-page="perPage">
                        </b-table>
                        <b-col sm="12" md="12" class="center">
                            <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="fill"
                                    size="sm"
                                    class="my-0"
                            ></b-pagination>
                        </b-col>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <TaskDay :height="250"></TaskDay>
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
            points: [],
            doingRequest: false,
            perPage: 15,
            totalRows: 0,
            currentPage: 1
        }),
        created: function () {

            // this.getPointsData();
        },
        methods: {
            getPointsData(ctx) {
                const self = this;

                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                self.currentPage = ctx.currentPage;

                return axios.get('https://insta.brian.place/api/admin/getpointsdata?page='+ctx.currentPage, config).then((response) => {
                    self.doingRequest = false;
                    self.totalRows = response.data.data.total

                    return response.data.data.data;
                }).catch(() => {
                    new Noty({
                        theme: 'mint',
                        text: 'Ocorreu um erro para buscar os dados de pontos.',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                    self.doingRequest = false;

                    return [];
                });

            }
        }
    }

</script>
