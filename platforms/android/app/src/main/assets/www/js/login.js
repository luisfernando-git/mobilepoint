var username;
var password;
var usuarioLogado;

function login() { 
    loadingElement('btnLogin', 'Authenticating...')

    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    if (username != '') {
        var url = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios/byUsername/' + username;
        MobileUI.ajax.get(url).end(resultAjaxFuncionario);    
    } else {
        alert('Usuário e senha devem ser informados!');
    }
    closeLoading('btnLogin')
}

function resultAjaxFuncionario(err, res) {
    if(err) {
        alert(err);
    } else {
        usuarioLogado = res.body;
        if (usuarioLogado != undefined && password == usuarioLogado.password) {
            if (!usuarioLogado.ativo) {
                alert('Funcionário não está ativo na empresa!');
                return;
            }
            openPage('home');
        } else {
            alert('Usuário e/ou senha incorretos!');
        }
    }
}