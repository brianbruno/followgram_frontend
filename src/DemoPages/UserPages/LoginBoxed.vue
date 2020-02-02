<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="app-logo-inverse mx-auto mb-3"/>

                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Bem-Vindo</div>
                                        <span>Faça seu login para continuar.</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description=" ">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  placeholder="Email...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  placeholder="Senha...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox name="check" id="exampleCheck">
                                    Manter-me logado
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Não possui uma conta?
                                    <router-link :to="{ path:  '/pages/register-boxed'}">
                                    <span class="text-primary">Registre-se agora</span>
                                    </router-link>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <router-link :to="{ path:  '/pages/forgot-password-boxed'}">
                                    <a  class="btn-lg btn btn-link">Esqueci a senha</a></router-link>
                                </div>
                                <div class="float-right">
                                    <router-link :to="{ path:  '/home'}">
                                    <b-button variant="primary" size="lg">Login</b-button></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center text-white opacity-8 mt-3">
                        Copyright &copy; ArchitectUI 2019
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>
