<template>
    <div>
        <b-container fluid>
            <b-col class="logo d-none d-md-block text-center">
                <br>
                <b-img src="https://i.imgur.com/Ml0JOcN.png" fluid class="sm" width="200px" ></b-img>
                <br>
                <hr>
            </b-col>
            <b-row align-v="center">
                <b-col md="4" lg="6" class="text-right justify-content-sm-center d-none d-sm-none d-md-block">
                    <b-img src="https://i.imgur.com/Qk7jVNe.jpg" fluid class="sm" width="500px"></b-img>
                </b-col>
                <b-col md="6" class="text-right justify-content-sm-center d-none d-sm-block d-md-none">
                    <div class="logo-title">
                        <b-img src="../../assets/images/logo-inverse.png" fluid class="sm"></b-img>
                    </div>
                </b-col>
                <b-col sm="12" md="8" lg="6" class="text-center">
                    <br>
                    <b-col class="logo d-block d-md-none">
                        <b-img src="https://i.imgur.com/Ml0JOcN.png" fluid class="sm" width="200px" ></b-img>
                        <br>
                        <hr>
                    </b-col>
                    <br>
                    <p class="texto"> Ganhe <span style="color: palevioletred;">SEGUIDORES</span> no Instagram.</p>
                    <b-col class="texto d-none d-md-block">
                        <p class="texto1">Nossa plataforma é totalmente <span style="color: palevioletred;">GRATUITA</span>,</p>
                        <p class="texto1">se você quer ganhar <span style="color: palevioletred;">likes</span> e <span style="color: palevioletred;">seguidores</span>, junte-se a nós.</p>
                    </b-col>
                    <p>Faça seu <span style="color: palevioletred;">Login</span> no site, mas se ainda não possui uma conta, <span style="color: palevioletred;">Registre-se</span> agora mesmo clicando no botão "Registrar-se" abaixo.</p>
                    <br>
                    <b-row>
                        <b-col class="d-block d-md-none">
                                <router-link :to="{ path:  '/login'}">
                                    <b-button block class="mr-2 mb-2" variant="secondary" size="lg">
                                    <span style="color: white;">Login</span></b-button>
                                </router-link>
                                <router-link :to="{ path:  '/registro'}">
                                    <b-button block class="mr-2 mb-2" variant="secondary" size="lg">
                                    <span style="color: white;">Registrar-se</span>
                                </b-button></router-link>
                        </b-col>
                        <b-col class="d-none d-md-block">
                            <router-link :to="{ path:  '/login'}">
                                <b-button class="mr-2" variant="secondary">
                                <span style="color: white;">Login</span></b-button>
                            </router-link>
                            <router-link :to="{ path:  '/registro'}">
                                <b-button class="mr-2" variant="secondary">
                                <span style="color: white;">Registre-se</span></b-button>
                            </router-link>

                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
                    <br><br><br>
                    <p> Copyright &copy; Ganhe Seguidores 2020</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style scoped>
.texto{
    font-size: 1cm;
}
.texto1{
    font-size: 25px;
}
.logo-title {
    background: url('../../assets/images/logo-inverse.png');
}

</style>

<script>



</script>
