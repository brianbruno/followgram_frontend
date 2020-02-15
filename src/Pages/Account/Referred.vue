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
                        <b-form-group id="urlRefer" prepend="@"  label-for="input_urlRefer" description=" ">
                            <b-form-input id="input_urlRefer" type="email" disabled v-model="urlRefer"></b-form-input>
                        </b-form-group>
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
        }
    }

</script>
