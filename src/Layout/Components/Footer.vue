<template>
    <div class="app-footer">
        <div class="app-footer__inner text-center">
            Copyright 2020 - Ganhe Seguidores - Precisa de ajuda? Mande direct para o IG: @marketingfollowgram.
        </div>
    </div>
</template>

<script>

    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faEllipsisV,
    } from '@fortawesome/free-solid-svg-icons'
    import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

    library.add(
        faEllipsisV,
    );
    export default {
        name: "Footer",
        components: {
        }
    };
</script>
