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
    document.getElementById('ativo').checked = false;
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
        var urlPut = 'http://localhost:9091/api/mobilepoint/turnos/' + turno.id;
        MobileUI.ajax.put(urlPut).send({
            id: turno.id,
            descricao: descricao,
            horarioInicio: horarioInicio,
            horarioTermino: horarioTermino,
            intervalo: intervalo,
            tempoTolerancia: tempoTolerancia,
            ativo: ativo
        }).end(returnApi)
    }

    turno = undefined;
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

function deleteTurno(id) {
    var url = 'http://localhost:9091/api/mobilepoint/turnos/' + id;
    MobileUI.ajax.get(url).end(function(err, res) {
        if(err) {
            alert('Houve um problema na conexão, tente novamente!');
        } else {
            let turno = res.body;
            var urlFunc = 'http://localhost:9091/api/mobilepoint/funcionarios/byTurno/' + turno.id;
            MobileUI.ajax.get(urlFunc).end(function(err, res) {
                if (err) {
                    alert('Houve um problema na conexão, tente novamente!');
                } else {
                    let funcionarios = res.body;
                    if (funcionarios.length > 0) {
                        alert('Não é possível remover este turno, há funcionários vinculados a ele!');
                        return;
                    } else {
                        MobileUI.ajax.delete(url).end(returnApiDeleteTurno);
                    }
                }
            });
        }
    });      
}

function returnApiDeleteTurno(err) {
    if (err) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(err);
    }

    findTurnos();
    alert('Turno removido com sucesso!');
}

function updateTurno(id) {
    var url = 'http://localhost:9091/api/mobilepoint/turnos/' + id;

    MobileUI.ajax.get(url).end(resultAjaxUpdateTurno);
}

function resultAjaxUpdateTurno(err, res){
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            turno = res.body;

            let dataIniString = turno.horarioInicio.split("+")[0];
            let horaInicio = new Date(dataIniString).toLocaleTimeString();

            let dataFimString = turno.horarioTermino.split("+")[0];
            let horaTermino = new Date(dataFimString).toLocaleTimeString(); 

            let intervaloString = turno.intervalo.split("+")[0];
            let intervaloFormat = new Date(intervaloString).toLocaleTimeString(); 

            document.getElementById('descricao').value = turno.descricao;
            document.getElementById('horarioInicio').value = horaInicio;
            document.getElementById('horarioTermino').value = horaTermino;
            document.getElementById('intervalo').value = intervaloFormat;
            document.getElementById('tempoTolerancia').value = turno.tempoTolerancia;
            document.getElementById('ativo').checked = turno.ativo;
        } 
    }
}