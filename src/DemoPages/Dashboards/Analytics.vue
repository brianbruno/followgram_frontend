<template>
    <div>

        <div class="mb-3 card">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i> Estatísticas
                </div>
            </div>
            <div class="no-gutters row">
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-10 bg-success"></div>
                            <i class="pe-7s-users text-white opacity-8"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Novos Seguidores</div>
                            <div class="widget-numbers">+{{new_followers}}</div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-6 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-warning"></div>
                            <i class="pe-7s-speaker text-white"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Novos comentários</div>
                            <div class="widget-numbers"><span>+{{new_comments}}</span></div>
                            <div class="widget-description opacity-8 text-focus">
                            </div>
                        </div>
                    </div>
                    <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-4">
                    <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                        <div class="icon-wrapper rounded-circle">
                            <div class="icon-wrapper-bg opacity-9 bg-danger"></div>
                            <i class="pe-7s-like text-white"></i></div>
                        <div class="widget-chart-content">
                            <div class="widget-subheading">Novos likes</div>
                            <div class="widget-numbers"><span>+{{new_likes}}</span></div>
                            <div class="widget-description text-focus">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"> </i> Estatísticas - Seguidores
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">
                                    <div class="widget-chart-content widget-chart-content-lg pb-0">
                                        <div class="widget-chart-flex">
                                            <div class="widget-title opacity-5 text-muted text-uppercase">Seguidores
                                            </div>
                                        </div>
                                        <div class="widget-numbers">
                                            <div class="widget-chart-flex">
                                                <div>
                                                    <span class="text-warning">34</span>
                                                </div>
                                                <div class="widget-title ml-2 font-size-lg font-weight-normal text-dark">
                                                    <span class="opacity-5 text-muted pl-2 pr-1">5%</span> a mais que ontem
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                        <chart1 :height="145" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 class="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                            Evolução de Seguidores</h6>
                    </div>
                </div>
            </div>

            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"> </i> Estatísticas - Likes
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">
                                    <div class="widget-chart-content widget-chart-content-lg pb-0">
                                        <div class="widget-chart-flex">
                                            <div class="widget-title opacity-5 text-muted text-uppercase">Likes
                                            </div>
                                        </div>
                                        <div class="widget-numbers">
                                            <div class="widget-chart-flex">
                                                <div>
                                                    <span class="text-warning">78</span>
                                                </div>
                                                <div class="widget-title ml-2 font-size-lg font-weight-normal text-dark">
                                                    <span class="opacity-5 text-muted pl-2 pr-1">76%</span> a mais que ontem
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                        <chart1 :height="145"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 class="text-muted text-uppercase font-size-md opacity-5 pl-3 pr-3 pb-1 font-weight-normal">
                            Evolução dos Likes</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import PageTitle from "../../Layout/Components/PageTitle.vue";
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    import chart1 from './Analytics/chart1';
    import chart2 from './Analytics/chart2';
    import chart3 from './Analytics/chart3';

    import {
        library
    }
    from '@fortawesome/fontawesome-svg-core'
    import {
        faTrashAlt,
        faCheck,
        faCalendarAlt,
        faAngleDown,
        faAngleUp,
        faTh,
    }
    from '@fortawesome/free-solid-svg-icons'
    import {
        FontAwesomeIcon
    }
    from '@fortawesome/vue-fontawesome'

    library.add(
        faTrashAlt,
        faCheck,
        faAngleDown,
        faAngleUp,
        faTh,
        faCalendarAlt,
    );

    export default {
        components: {
            PageTitle,
            VuePerfectScrollbar,
            'font-awesome-icon': FontAwesomeIcon,
            chart1,
            chart2,
            chart3,

        },
        data: () => ({
            heading: 'Analytics Dashboard',
            subheading: 'This is an example dashboard created using build-in elements and components.',
            icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
            new_followers: 0,
            new_comments: 0,
            new_likes: 0,
        }),
        created: function () {
            this.new_followers = localStorage.getItem('user.new_followers');
            this.new_comments = localStorage.getItem('user.new_comments');
            this.new_likes = localStorage.getItem('user.new_likes');
        },
        methods: {

        },

    }
</script>