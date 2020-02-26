<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <span id="points" class="font-size-lg fsize-3">
                            <span v-if="is_vip"><i class="pe-7s-star pe-2x icon-gradient bg-sunny-morning"> </i> VIP  </span>
                            <span><i class="pe-7s-diamond pe-2x icon-gradient bg-love-kiss"> </i> </span>{{ points}}
                            <i class="pe-7s-lock pe-2x icon-gradient bg-love-kiss"> </i> {{ pending_points }}
                        </span>
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img v-if="picture_active" width="42" class="rounded-circle" :src="picture_active" alt="">
                                </div>
                            </span>
                            <button type="button" tabindex="0" v-on:click="trocarPerfil" class="dropdown-item">Trocar perfil</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0"  v-on:click="logout" class="dropdown-item">Sair</button>
                        </b-dropdown>
                    </div>
                    <div class="widget-content-left  ml-3 header-user-info">
                        <div class="widget-heading">{{ name }}</div>
                        <div class="widget-subheading" v-if="username_active">{{ username_active}}</div>
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
            is_vip: false,
            username_active: false,
            picture_active: false
        }),
        created: function () {
            this.updatePoints();

            this.name = localStorage.getItem('user.name');
            this.points = localStorage.getItem('user.points');
            this.pending_points = localStorage.getItem('user.pending_points');

            const self = this;

            if (localStorage.getItem('access_token')) {
                setInterval(function () {
                    self.updatePoints();
                }, 10000);
            }


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
                        window.localStorage.removeItem('user.insta_id_active');
                        window.localStorage.removeItem('user.is_vip');
                        window.localStorage.removeItem('user.is_admin');
                        window.localStorage.removeItem('user.insta_username_active');
                        window.localStorage.removeItem('user.insta_picture_active');
                        self.$router.push('/');
                    })
                    .catch(function () {
                        window.localStorage.removeItem('access_token');
                        window.localStorage.removeItem('user.id');
                        window.localStorage.removeItem('user.name');
                        window.localStorage.removeItem('user.new_followers');
                        window.localStorage.removeItem('user.new_comments');
                        window.localStorage.removeItem('user.new_likes');
                        window.localStorage.removeItem('user.points');
                        window.localStorage.removeItem('user.pending_points');
                        window.localStorage.removeItem('user.insta_id_active');
                        window.localStorage.removeItem('user.is_vip');
                        window.localStorage.removeItem('user.is_admin');
                        window.localStorage.removeItem('user.insta_username_active');
                        window.localStorage.removeItem('user.insta_picture_active');
                        self.$router.push('/');
                    });
            },
            updatePoints() {
                const self = this;
                // user.name
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/auth/user', {}, config)
                    .then(function (response) {
                        window.localStorage.setItem('user.id', response.data.id);
                        window.localStorage.setItem('user.points', response.data.points);
                        window.localStorage.setItem('user.pending_points', response.data.pending_points);
                        window.localStorage.setItem('user.new_followers', response.data.new_followers);
                        window.localStorage.setItem('user.new_comments', response.data.new_comments);
                        window.localStorage.setItem('user.new_likes', response.data.new_likes);
                        window.localStorage.setItem('user.insta_id_active', response.data.insta_id_active);
                        window.localStorage.setItem('user.insta_username_active', response.data.insta_username_active);
                        window.localStorage.setItem('user.insta_picture_active', response.data.insta_picture_active);
                        window.localStorage.setItem('user.is_vip', response.data.is_vip);
                        window.localStorage.setItem('user.is_admin', response.data.is_admin);
                        self.points = response.data.points;
                        self.pending_points = response.data.pending_points;
                        self.is_vip = response.data.is_vip;

                        self.username_active = response.data.insta_username_active;
                        self.picture_active = response.data.insta_picture_active;
                    });
            },
            trocarPerfil() {
                this.$router.push('/ganharpontos');
            }
        }
    }


</script>
