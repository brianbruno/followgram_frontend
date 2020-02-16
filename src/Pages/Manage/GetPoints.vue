<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="content">
            <div class="row">
                <div class="col-md-12" v-if="requests.length !== 0">
                    <b-button type="button" v-on:click="getRequesters()" class="mr-2 mb-2 btn-hover-shine btn-transition float-right" variant="dark">Atualizar Tarefas</b-button>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-4" v-bind:key="request.id" v-for="request in requests">
                    <div class="main-card shadow p-3 mb-5 bg-white rounded card">
                        <div class="card-header" v-if="request.type === 'follow'"><h5>Seguir @{{request.target_user_insta.username}} <div class="float-right"><i class="diamante icon-gradient bg-love-kiss pe-7s-diamond"></i> {{ request.points }}</div> </h5></div>
                        <div class="card-header" v-if="request.type === 'like'"><h5>Curtir foto de @{{request.target_user_insta.username}} <div class="float-right"><i class="diamante icon-gradient bg-love-kiss pe-7s-diamond"></i> {{ request.points }}</div></h5></div>
                        <div class="card-header" v-if="request.type === 'comment'"><h5>Comentar</h5> <div class="float-right"><i class="diamante icon-gradient bg-love-kiss pe-7s-diamond"></i> {{ request.points }}</div> </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" v-if="show.includes(request.id)">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img v-if="request.type === 'follow'" width="100" class="rounded-circle" :src="request.target_user_insta.profile_pic_url" alt="request.target_user_insta.full_name">
                                                <img v-if="request.type === 'like'" width="100" class="rounded-circle" :src="request.post_img" alt="request.target_user_insta.full_name">
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">{{ request.target_user_insta.full_name}}</div>
                                                <div class="widget-subheading">{{ request.points }} Pontos</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div role="group" class="btn-group-sm btn-group">
                                                    <button v-if="request.type === 'follow'" type="button" v-on:click="ganharPontos(request.id, 'https://instagram.com/'+request.target_user_insta.username)" class="btn-shadow btn btn-primary">Seguir</button>
                                                    <button v-if="request.type === 'like'" type="button" v-on:click="ganharPontos(request.id, request.post_url)" class="btn-shadow btn btn-primary">Curtir</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item" v-if="!show.includes(request.id)">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img v-if="request.type === 'follow'" width="100" class="rounded-circle" :src="request.target_user_insta.profile_pic_url" alt="request.target_user_insta.full_name">
                                                <img v-if="request.type === 'like'" width="100" class="rounded-circle" :src="request.post_img" alt="request.target_user_insta.full_name">
                                            </div>
                                            <div class="widget-content-left">
                                                <h3 class="widget-heading"><i class="diamante icon-gradient bg-love-kiss pe-2x pe-7s-diamond"></i> {{ request.points }} pontos</h3>
                                                <div>1- Acesse o perfil @{{request.target_user_insta.username}}.</div>
                                                <div v-if="request.type === 'follow'">2- Clique em seguir.</div>
                                                <div v-if="request.type === 'follow'">Clique <a :href="'https://instagram.com/'+request.target_user_insta.username" target="_blank">aqui</a> para acessar o perfil</div>
                                                <div v-if="request.type === 'like'">2- Clique em <i class="pe-7s-like"></i>.</div>
                                                <div v-if="request.type === 'like'">Clique <a :href="request.post_url" target="_blank">aqui</a> para acessar a foto</div>
                                            </div>
                                        </div>
                                        <br>
                                        <div>
                                            <b-form>
                                                <label>Completar ação utilizando a conta: </label>
                                                <div class="col-md-12">
                                                    <b-form-select v-model="idInstaFollowing" class="form-control-sm" size="sm">
                                                        <option v-bind:key="account.id" v-for="account in accounts" :value="account.id">{{ account.username }}</option>
                                                    </b-form-select>
                                                </div>
                                            </b-form>
                                            <br>
                                            <button v-on:click="confirmQuestFollow(request.id, request.insta_target)" v-if="request.type === 'follow'" class="btn-shadow btn btn-primary float-right" :disabled="doingRequest">Confirmar</button>
                                            <button v-on:click="confirmQuestLike(request.id)" v-if="request.type === 'like'" class="btn-shadow btn btn-primary float-right" :disabled="doingRequest">Confirmar</button>
                                            <b-button v-on:click="voltar(request.id)" class="mr-2 mb-2 border-0 btn-transition float-right" variant="outline-danger" :disabled="doingRequest">Voltar</b-button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="requests.length === 0 && !doingRequest">
                    <div class="main-card card">
                        <div class="card-body text-center">
                            <h2>
                                Parece que não temos nenhuma interação disponível para você.
                            </h2>
                            <h2>
                                Que tal chamar seus amigos?
                            </h2>
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

    export default {
        components: {
            PageTitle,
        },
        data: () => ({
            heading: 'Cards',
            subheading: 'Wide selection of cards with multiple styles, borders, actions and hover effects.',
            icon: 'pe-7s-stopwatch icon-gradient bg-amy-crisp',
            show: [],
            doingRequest: false,
            requests: [],
            idInstaFollowing: '',
            accounts: [],
            openedPage: null,
        }),
        mounted() {
            const self = this;
            window.mobilecheck = function() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            };

            self.getRequesters();
            self.getAccounts();
        },
        methods: {
            getAccounts() {
                const self = this;
                self.doingRequest = true;

                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/insta/getAccounts', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    const accounts = response.data.data;
                    self.accounts = [];
                    accounts.forEach(function (account) {
                        self.accounts.push(account)
                    });

                    if (self.accounts.length === 0) {
                        new Noty({
                            theme: 'mint',
                            text: "Você não possui nenhuma conta cadastrada! Adicione sua conta para ganhar pontos.",
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                        self.$router.push('/adicionarconta')
                    } else {
                        self.idInstaFollowing = self.accounts[self.accounts.length-1].id
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
            ganharPontos(id, url){
                const self = this;
                const bkp = self.show;
                self.show = [];

                bkp.forEach(function (requestId) {
                    if (requestId !== id) {
                        self.show.push(requestId);
                    }
                });

                if (!window.mobilecheck()) {
                    self.openedPage = window.open(url, '_blank');
                    self.openedPage.focus();
                } else {
                    window.open(url, '_blank');
                    new Noty({
                        theme: 'mint',
                        text: 'Não se esqueça de confirmar a realização da ação. :)',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'info',
                    }).show();
                    self.doingRequest = false;
                }
            },
            voltar(id){
                this.show.push(id);
            },
            getRequesters() {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/requests/get', {
                    username: self.usernameInsta,
                }, config).then(function (response) {
                    const requests = response.data.data;
                    self.show = [];
                    self.requests = [];
                    requests.sort(() => Math.random() - 0.5);
                    requests.forEach(function (request) {

                        if (self.requests.length < 6) {
                            self.show.push(request.id);
                            self.requests.push(request)
                        }
                    });
                    self.doingRequest = false;

                    if (self.requests.length === 0) {
                        new Noty({
                            theme: 'mint',
                            text: 'Não foi encontrada nenhuma interação. :(',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'error',
                        }).show();
                    }
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
            removeQuest(idQuest){
                const self = this;

                const bkp = self.requests;
                self.requests = [];

                bkp.forEach(function (request) {
                    if (request.id !== idQuest) {
                        self.requests.push(request);
                    }
                });

                if (self.requests.length === 0) {
                    self.getRequesters();
                }
            },
            confirmQuestFollow(idQuest, idFollowTarget) {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/follow/addfollow', {
                    idQuest: idQuest,
                    idInstaFollowing: self.idInstaFollowing,
                    idFollowTarget: idFollowTarget
                }, config).then(function (response) {

                    if (response.data.success) {
                        new Noty({
                            theme: 'mint',
                            text: 'Tudo certo! Em breve seus pontos serão contabilizados caso você tenha realizado a tarefa.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'info',
                        }).show();

                        self.removeQuest(idQuest);
                        if (self.openedPage) {
                            self.openedPage.close();
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
            confirmQuestLike(idQuest) {
                const self = this;
                self.doingRequest = true;
                let config = {
                    headers: {
                        Authorization: window.localStorage.getItem('access_token'),
                    }
                };

                axios.post('https://insta.brian.place/api/photolike/photolike', {
                    idQuest: idQuest,
                    idInstaLiking: self.idInstaFollowing
                }, config).then(function (response) {

                    if (response.data.success) {
                        new Noty({
                            theme: 'mint',
                            text: 'Tudo certo! Em breve seus pontos serão contabilizados caso você tenha realizado a tarefa.',
                            timeout: 2500,
                            layout: 'topRight',
                            type: 'info',
                        }).show();
                        self.removeQuest(idQuest);
                        if (self.openedPage) {
                            self.openedPage.close();
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
            }
        }
    }
</script>
