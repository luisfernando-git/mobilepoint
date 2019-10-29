function login() { 
    loadingElement('btnLogin', 'Authenticating...')
    /*var url = 'https://myphotos.rfsolutionit.com.br/services/login'

    MobileUI.ajax.post(url).send({
        username: username.value,
        password: password.value
    }).end(returnApi)*/

    openPage('home')
    closeLoading('btnLogin')
}