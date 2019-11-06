let descricaoAtv;
let horarioInicioAtv;
let horarioFimAtv;
let tempoToleranciaAtv;
let observacoes;
let latitudeAtv;
let longitudeAtv;

var atividades = [];
var atividade;

function findAtividades() {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/atividades';

    MobileUI.ajax.get(url).end(resultAjaxAtividades);
}

function resultAjaxAtividades(err, res) {
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            atividades = [];
            res.body.forEach(function (a) {   
                if (a.horarioInicio != null) {
                    let dataIniString = a.horarioInicio.split("+")[0];
                    let horaInicio = new Date(dataIniString).toLocaleTimeString();
                    let dataInicio = new Date(dataIniString).toLocaleDateString();
                    a.horarioInicio = dataInicio + " " + horaInicio;
                }
                atividades.push(a);
            })
        } 
    }
}

function clearFormAtv() {
    MobileUI.clearForm('formCadAtividade');
}

function limparAtv() {
    atividade = undefined;
}

function saveAtividade() {
    descricaoAtv = document.getElementById('descricaoAtv').value;
    horarioInicioAtv = document.getElementById('horarioInicioAtv').value;
    horarioFimAtv = document.getElementById('horarioFimAtv').value;
    tempoToleranciaAtv = document.getElementById('tempoToleranciaAtv').value;
    observacoes = document.getElementById('observacoes').value;
    
    var urlPost = 'http://10.1.15.19:9091/api/mobilepoint/atividades';
    if (atividade == undefined) {
        MobileUI.ajax.post(urlPost).send({
            descricao: descricaoAtv,
            horarioInicio: horarioInicioAtv,
            horarioFim: horarioFimAtv,
            tempoTolerancia: tempoToleranciaAtv,
            observacoes: observacoes
        }).end(returnApiAtv)
    } else {
        var urlPut = 'http://10.1.15.19:9091/api/mobilepoint/atividades/' + atividade.id;
        MobileUI.ajax.put(urlPut).send({
            id: atividade.id,
            descricao: descricaoAtv,
            horarioInicio: horarioInicioAtv,
            horarioFim: horarioFimAtv,
            tempoTolerancia: tempoToleranciaAtv,
            observacoes: observacoes
        }).end(returnApiAtv)
    }

    atividade = undefined;
}

function returnApiAtv(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }
    atividade = undefined;
    clearFormAtv();
    findAtividades();
    backPage();
    alert("Atividade salva com sucesso!");
}

function deleteAtividade(id) {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/atividades/' + id;
    
    MobileUI.ajax.delete(url).end(returnAPiDeleteAtv);
}

function returnAPiDeleteAtv(err) {
    if (err) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(err);
    }

    findAtividades();
    alert('Atividade removida com sucesso!')
}

function updateAtividade(id) {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/atividades/' + id;

    MobileUI.ajax.get(url).end(resultAjaxUpdateAtv);
}

function resultAjaxUpdateAtv(err, res){
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            atividade = res.body;

            document.getElementById('descricaoAtv').value = atividade.descricao;
            document.getElementById('horarioInicioAtv').value = moment.utc(atividade.horarioInicio).format("YYYY-MM-DDTkk:mm");
            document.getElementById('horarioFimAtv').value = moment.utc(atividade.horarioFim).format("YYYY-MM-DDTkk:mm");
            document.getElementById('tempoToleranciaAtv').value = atividade.tempoTolerancia;
            document.getElementById('observacoes').value = atividade.observacoes;
        } 
    }
}