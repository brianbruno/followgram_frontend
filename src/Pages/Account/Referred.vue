<template>
    <div>
        <vue-element-loading :active="doingRequest" spinner="bar-fade-scale"/>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <h3 class="card-title">Referidos</h3>

                <div class="row responsive-center" >
                    <div class="col-md-6">
                        <br><br><br>
                        <h4>Indique utilizando o link abaixo para ganhar diamantes!</h4>
                        <h5>Ganhe <i class="diamante icon-gradient bg-love-kiss pe-7s-diamond"></i> 50 para cada pessoa que se cadastrar utilizando seu link!</h5>
                        <input type="hidden" id="testing-code" :value="urlRefer">
                        <div class="input-group">
                            <input type="text" id="urlReferInput" class="form-control" v-model="urlRefer" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-primary" v-on:click="copy"><i class="pe-7s-copy-file"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="https://gerenciagram.com.br/blog/wp-content/uploads/2019/02/biografia-no-instagram.jpg" class="table-responsive">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import PageTitle from "../../Layout/Components/PageTitle.vue";
    const Noty = require('noty');

    export default {
        components: {
            PageTitle,
        },
        data: () => ({
            urlRefer: 'https://ganheseguidores.com/r/',
            doingRequest: false,
        }),
        created: function () {
            const id = localStorage.getItem('user.id');

            this.urlRefer = this.urlRefer + id;
        },
        methods: {
            copy () {
                let testingCodeToCopy = document.querySelector('#testing-code');
                testingCodeToCopy.setAttribute('type', 'text');
                testingCodeToCopy.select();

                try {
                    const successful = document.execCommand('copy');
                    const msg = successful ? 'Copiado.' : 'Não copiado.';

                    new Noty({
                        theme: 'mint',
                        text: msg,
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'info',
                    }).show();

                } catch (err) {
                    new Noty({
                        theme: 'mint',
                        text: 'Erro',
                        timeout: 2500,
                        layout: 'topRight',
                        type: 'error',
                    }).show();
                }

                /* unselect the range */
                testingCodeToCopy.setAttribute('type', 'hidden');
                window.getSelection().removeAllRanges()
            }
        }
    }

</script>
