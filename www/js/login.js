var username;
var password;
var usuarioLogado;

function login() { 
    loadingElement('btnLogin', 'Authenticating...')

    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    if (username != '') {
        var url = 'http://localhost:9091/api/mobilepoint/funcionarios/byUsername/' + username;
        MobileUI.ajax.get(url).end(resultAjaxFuncionario);    
    } else {
        alert('Usuário/Senha devem ser informados!');
    }
    closeLoading('btnLogin')
}

function resultAjaxFuncionario(err, res) {
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        usuarioLogado = res.body;
        if (usuarioLogado != undefined && password == usuarioLogado.password) {
            openPage('home')
        } else {
            alert('Usuário/Senha incorretos!');
        }
    }
}