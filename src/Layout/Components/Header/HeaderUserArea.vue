<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <span id="points" class="font-size-lg fsize-3">
                            <span v-if="user.user.is_vip"><i class="pe-7s-star pe-2x icon-gradient bg-sunny-morning"> </i> VIP  </span>
                            <span><i class="pe-7s-diamond pe-2x icon-gradient bg-love-kiss"> </i> </span>{{ user.user.points}}
                            <i class="pe-7s-lock pe-2x icon-gradient bg-love-kiss"> </i> {{ user.user.pending_points }}
                        </span>
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img v-if="user.user.insta_picture_active" width="42" class="rounded-circle" :src="user.user.insta_picture_active" alt="">
                                </div>
                            </span>
                            <button type="button" tabindex="0" v-on:click="trocarPerfil" class="dropdown-item">Trocar perfil</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0"  v-on:click="buttonLogout" class="dropdown-item">Sair</button>
                        </b-dropdown>
                    </div>
                    <div class="widget-content-left  ml-3 header-user-info">
                        <div class="widget-heading">{{ user.user.name }}</div>
                        <div class="widget-subheading" v-if="user.user.username_active">{{ user.user.username_active}}</div>
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
    import { mapActions, mapState } from 'vuex'

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
    
        computed: {
            ...mapState(['user']),
        },
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
            this.update();

            this.name = localStorage.getItem('user.name');
            this.points = localStorage.getItem('user.points');
            this.pending_points = localStorage.getItem('user.pending_points');

            const self = this;

            if (self.user.logged) {
                setInterval(function () {
                    self.update();
                }, 10000);
            }


        },
        methods: {
            ...mapActions(['logout', 'update']),
            buttonLogout() {
                const self = this;
                
                self.logout().then(() => {
                    self.$router.push('/');
                });
            },
            trocarPerfil() {
                this.$router.push('/ganharpontos');
            }
        }
    }


</script>
