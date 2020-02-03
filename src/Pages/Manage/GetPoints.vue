<template>
    <div>
        <div class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Seguir</div>
                        <div class="card-body">
                            <div v-if="ganhar">
                                <img class="imagemperfil" src="https://img.freepik.com/fotos-gratis/gotas-de-oleo-na-imagem-abstrata-padrao-psicodelico-de-agua_23-2148290141.jpg" style="width:100px;height:100px;" align="left" ><h5 class="card-title">21 Pontos</h5>Brian.
                                <div>
                                    <button v-on:click="ganharPontos" class="mr-2 btn btn-success">Ganhe Pontos</button>
                                </div>
                            </div>
                            <div v-if="continuarganhando">
                                <div>
                                    <h5 class="pontos">21</h5>
                                    <i class="diamante icon-gradient bg-love-kiss pe-2x pe-7s-diamond"></i>
                                    <h5 class="frase1">1- Acesse o perfil com @instagram.</h5>
                                    <h5 class="frase2">2- Clique em <i class="pe-7s-like"></i>.</h5>
                                    <div class="botoes">
                                        <button v-on:click="voltar" class="botao mr-2 btn btn-success">Voltar</button>
                                        <button  class="mr-2 btn btn-success">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer"><i class="pe-7s-stopwatch"></i> 4 minutos para essa oferta acabar.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .botao{
        background-color: rgb(166, 175, 172);
    }

    .diamante{
        position: fixed;
        height: 300px;
    }

    .pontos{
        position: absolute;
        left: 0mm;

    }
    .frase1{
        position: relative;
        left: 15mm;
        color: gray;
        font-size: 3mm;
    }
    .frase2{
        position: relative;
        left: 15mm;
        color: gray;
        font-size: 3mm;
    }

    .botoes{
        position: relative;
        left: 22mm;
    }

    .card-footer{
        color: rgb(169, 173, 175);
    }

    .card-body{
        position: relative;
        left: 40px;
    }

    .imagemperfil{
        position: relative;
        right: 20px;
    }
</style>

<script>

    import PageTitle from "../../Layout/Components/PageTitle.vue";

    export default {
        components: {
            PageTitle,

        },
        data: () => ({
            heading: 'Cards',
            subheading: 'Wide selection of cards with multiple styles, borders, actions and hover effects.',
            icon: 'pe-7s-stopwatch icon-gradient bg-amy-crisp',
            ganhar: true,
            continuarganhando: false
        }),


        methods: {
            ganharPontos(){
                this.ganhar=false
                this.continuarganhando=true
            },
            voltar(){
                this.ganhar=true
                this.continuarganhando=false
            }
        }
    }
</script>
