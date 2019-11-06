let nome;
let cpf;
let matricula;
let emailFunc;
let usernameFunc;
let passwordFunc;
let selectedTurno;
let adm;
let ativoFunc;

var funcionarios = [];
var funcionario;

function findFuncionarios() {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios';

    MobileUI.ajax.get(url).end(resultAjaxFuncionarios);
}

function resultAjaxFuncionarios(err, res) {
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            funcionarios = []
            res.body.forEach(function (f) {             
                funcionarios.push(f);
            })
        } 
    }
}

function clearFormFunc() {
    MobileUI.clearForm('formCadFuncionario');
}

function limparFunc() {
    funcionario = undefined;
}

function saveFuncionario() {
    nome = document.getElementById('nome').value;
    cpf = document.getElementById('cpf').value;
    matricula = document.getElementById('matricula').value;
    emailFunc = document.getElementById('emailFunc').value;
    usernameFunc = document.getElementById('usernameFunc').value;
    passwordFunc = document.getElementById('passwordFunc').value;
    selectedTurno = document.getElementById('turnosFunc').value;
    adm = document.getElementById('adm').checked;
    ativoFunc = document.getElementById('ativoFunc').checked;

    if (selectedTurno == '' || selectedTurno == undefined) {
        alert('Selecione um turno para o funcionário!');
        return;
    }
    
    var urlPost = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios';
    if (funcionario == undefined) {
        MobileUI.ajax.post(urlPost).send({
            nome: nome,
            cpf: cpf,
            matricula: matricula,
            email: emailFunc,
            username: usernameFunc,
            password: passwordFunc,
            empresa: {
                "id": empresa.id
            },
            turno: {
                "id": selectedTurno
            },
            ativo: ativoFunc,
            administrador: adm
        }).end(returnApiFunc)
    } else {
        var urlPut = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios/' + funcionario.id;
        MobileUI.ajax.put(urlPut).send({
            id: funcionario.id,
            nome: nome,
            cpf: cpf,
            matricula: matricula,
            email: emailFunc,
            username: usernameFunc,
            password: passwordFunc,
            empresa: {
                "id": empresa.id
            },
            turno: {
                "id": selectedTurno
            },
            ativo: ativoFunc,
            administrador: adm
        }).end(returnApiFunc)
    }

    funcionario = undefined;
}

function returnApiFunc(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }

    clearFormFunc();
    findFuncionarios();
    backPage();
    alert("Funcionário salvo com sucesso!");
}

function deleteFuncionario(id) {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios/' + id;
    MobileUI.ajax.get(url).end(function(err, res) {
        if(err) {
            alert('Houve um problema na conexão, tente novamente!');
        } else {
            let func = res.body;
            if (func.username == username) {
                alert('Não é possível remover o seu próprio usuário!');
                return;
            } else {
                MobileUI.ajax.delete(url).end(returnAPiDeleteFunc);
            }
        }
    });      
}

function returnAPiDeleteFunc(err) {
    if (err) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(err);
    }

    findFuncionarios();
    alert('Funcionário removido com sucesso!')
}

function updateFuncionario(id) {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/funcionarios/' + id;

    MobileUI.ajax.get(url).end(resultAjaxUpdateFunc);
}

function resultAjaxUpdateFunc(err, res){
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            funcionario = res.body;
            document.getElementById('nome').value = funcionario.nome;
            document.getElementById('cpf').value = funcionario.cpf;
            document.getElementById('matricula').value = funcionario.matricula;
            document.getElementById('emailFunc').value = funcionario.email;
            document.getElementById('usernameFunc').value = funcionario.username;
            document.getElementById('passwordFunc').value = funcionario.password;
            document.getElementById('turnosFunc').value = funcionario.turno;
            document.getElementById('adm').checked = funcionario.administrador;
            document.getElementById('ativoFunc').checked = funcionario.ativo;
        } 
    }
}