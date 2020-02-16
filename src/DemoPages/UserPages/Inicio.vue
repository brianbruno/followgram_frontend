<template>
    <div>
        <b-container fluid>
            <b-row align-v="center">
                <b-col md="4" lg="6" class="text-right justify-content-sm-center d-none d-sm-none d-md-block">
                    <b-img src="https://i.imgur.com/Qk7jVNe.jpg" fluid class="sm"></b-img>
                </b-col>
                <b-col md="6" class="text-right justify-content-sm-center d-none d-sm-block d-md-none">
                    <div class="logo-title">
                        <b-img src="../../assets/images/logo-inverse.png" fluid class="sm"></b-img>
                    </div>
                </b-col>
                <b-col sm="12" md="8" lg="6">
                    <p class="texto"> Ganhe <span style="color: palevioletred;">SEGUIDORES</span> no Instagram.</p>
                    <p class="texto1">Nossa plataforma é totalmente <span style="color: palevioletred;">GRATUITA</span>,</p>
                    <p class="texto1">se você quer ganhar <span style="color: palevioletred;">likes</span> e <span style="color: palevioletred;">seguidores</span>, junte-se a nós.</p>
                    <p class="texto1">Faça seu <span style="color: palevioletred;">Login</span> no site, mas se ainda não possui uma conta,</p>
                    <p><span style="color: palevioletred;">Registre-se</span> agora mesmo clicando no botão "Registrar-se" abaixo.</p>
                    <br>
                    <b-row>
                        <b-col class="text-left">
                            <router-link :to="{ path:  '/'}"><b-button class="login mr-2"><span style="color: white;">Logar</span></b-button></router-link>
                            <router-link :to="{ path:  '/pages/register-boxed'}"><b-button class="login"><span style="color: white;">Registrar-se</span></b-button></router-link>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="text-center">
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
.texto2{
    font-size: 30px;
}
.logo-title {
    background: url('../../assets/images/logo-inverse.png');
}

</style>

<script>



</script>
