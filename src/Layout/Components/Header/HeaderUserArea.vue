<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <h4>
                            <span id="points">
                                <span><i class="pe-7s-diamond pe-2x icon-gradient bg-love-kiss"> </i> </span>{{ points}}
                                <i class="pe-7s-lock pe-2x icon-gradient bg-love-kiss"> </i> {{ pending_points }}
                            </span>
                        </h4>
                    </div>
                    <div class="widget-content-left  ml-3 header-user-info">
                        <div class="widget-heading">{{ name }}</div>
                    </div>
                    <div class="widget-content-left">
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">

                                </div>
                            </span>
                            <button type="button" tabindex="0" class="dropdown-item">Trocar perfil</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0"  v-on:click="logout" class="dropdown-item">Sair</button>
                        </b-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #points {
        padding-right: 10px;
    }
</style>
<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    const axios = require('axios');

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faAngleDown,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
    );

    export default {
        components: {
            VuePerfectScrollbar,
            'font-awesome-icon': FontAwesomeIcon,
        },
        data: () => ({
            name: '',
            points: 0,
            pending_points: 0,
        }),
        created: function () {
            this.name = localStorage.getItem('user.name');
            this.points = localStorage.getItem('user.points');
            this.pending_points = localStorage.getItem('user.pending_points');
        },
        methods: {
            logout() {
                const self = this;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.get('https://insta.brian.place/api/auth/logout', config)
                    .then(function () {
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem('user.id');
                        window.localStorage.removeItem('user.name');
                        window.localStorage.removeItem('user.new_followers');
                        window.localStorage.removeItem('user.new_comments');
                        window.localStorage.removeItem('user.new_likes');
                        window.localStorage.removeItem('user.points');
                        window.localStorage.removeItem('user.pending_points');
                        self.$router.push('/');
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        }
    }


</script>
