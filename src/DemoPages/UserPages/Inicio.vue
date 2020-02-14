<template>
    <div>
            <div class="container" custom="">
                <br>
                <br><br><br>
                <img src="https://i.imgur.com/Qk7jVNe.jpg"  width="450" align="left" >
                <br><br><br><br><br><br><br><br>
                <p class="texto"> Ganhe <span style="color: palevioletred;">SEGUIDORES</span> no Instagram.</p>
                <p class="texto1">Nossa plataforma é totalmente <span style="color: palevioletred;">GRATUITA</span>,</p>
                <p class="texto1">se você quer ganhar <span style="color: palevioletred;">likes</span> e <span style="color: palevioletred;">seguidores</span>, junte-se a nós.</p>
                <p class="texto1">Faça seu <span style="color: palevioletred;">Login</span> no site, mas se ainda não possui uma conta,</p>
                <p><span style="color: palevioletred;">Registre-se</span> agora mesmo clicando no botão "Registrar-se" abaixo.</p>
                <br>
                <router-link :to="{ path:  '/'}"><b-button class="login mr-2"><span style="color: white;">Logar</span></b-button></router-link> 
                <router-link :to="{ path:  '/pages/register-boxed'}"><b-button class="login"><span style="color: white;">Registrar-se</span></b-button></router-link>
            </div>

        <div align="center">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <p> Copyright &copy; Ganhe Seguidores 2020</p>
        </div>
    </div>
</template>

<style scoped>
.texto{
    font-size: 1cm;  
};
.texto1{
    font-size: 25px;
};
.texto2{
    font-size: 30px;
};
.login{
    background-color: palevioletred;
    border-color: gray;
}

</style>

<script>
    
    
   
</script>
