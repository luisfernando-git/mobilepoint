let descricao;
let horarioInicio;
let horarioTermino;
let intervalo;
let tempoTolerancia;
let ativo;
let turno;
var turnos = [];

function findTurnos() {
    var url = 'http://localhost:9091/api/mobilepoint/turnos';

    MobileUI.ajax.get(url).end(resultAjaxTurnos);
}

function resultAjaxTurnos(err, res) {
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            turnos = []
            res.body.forEach(function (t) {
                var turno = {}
                let dataIniString = t.horarioInicio.split("+")[0];
                let horaInicio = new Date(dataIniString).toLocaleTimeString();

                let dataFimString = t.horarioTermino.split("+")[0];
                let horaTermino = new Date(dataFimString).toLocaleTimeString();                

                turno.id = t.id;
                turno.descricao = t.descricao;
                turno.horarioInicio = horaInicio;
                turno.horarioTermino = horaTermino;
                turno.intervalo = t.intervalo;
                turno.tempoTolerancia = t.tempoTolerancia;
                turno.ativo = t.ativo;                
                turnos.push(turno)
            })
        } 
    }
}

function clearForm() {
    MobileUI.clearForm('formCadTurno');
    document.getElementById('ativo').value = false;
}

function saveTurno() {
    descricao = document.getElementById('descricao').value;
    horarioInicio = document.getElementById('horarioInicio').value;
    horarioTermino = document.getElementById('horarioTermino').value;
    intervalo = document.getElementById('intervalo').value;
    tempoTolerancia = document.getElementById('tempoTolerancia').value;
    ativo = document.getElementById('ativo').value;

    var urlPost = 'http://localhost:9091/api/mobilepoint/turnos';
    if (turno == undefined) {
        MobileUI.ajax.post(urlPost).send({
            descricao: descricao,
            horarioInicio: horarioInicio,
            horarioTermino: horarioTermino,
            intervalo: intervalo,
            tempoTolerancia: tempoTolerancia,
            ativo: ativo
        }).end(returnApi)
    } else {
        var urlPost = 'http://localhost:9091/api/mobilepoint/turnos' + turno.id;
        MobileUI.ajax.put(urlPut).send({
            turno: turno.id,
            descricao: descricao,
            horarioInicio: horarioInicio,
            horarioTermino: horarioTermino,
            intervalo: intervalo,
            tempoTolerancia: tempoTolerancia,
            ativo: ativo
        }).end(returnApi)
    }
}

function returnApi(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }
    
    alert("Turno salvo com sucesso!");
    clearForm();
    findTurnos();
    openPage('listTurnos');
}