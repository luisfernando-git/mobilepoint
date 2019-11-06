var latitudeUser;
var longitudeUser;
let tipoPonto;

function insertPontoEntrada() {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/pontos';
    var horarioAtualPonto = new Date();
    var h = horarioAtualPonto.toLocaleDateString() + " " + horarioAtualPonto.toLocaleTimeString();
    var horarioPonto = moment.utc(h).format("YYYY-MM-DDTkk:mm:ss");

    MobileUI.ajax.post(url).send({
        chegada: horarioPonto,
        intervalo: null,
        saida: null,
        tipoPonto: 'Entrada',
        latitude: latitudeUser,
        longitude: longitudeUser,
        funcionario: {
            "id": usuarioLogado.id
        }
    }).end(returnApiPontoEntrada)
}

function returnApiPontoEntrada(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }

    alert("Entrada realizada com sucesso!");
}

function insertPontoIntervalo() {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/pontos';
    var horarioAtualPonto = new Date();
    var h = horarioAtualPonto.toLocaleDateString() + " " + horarioAtualPonto.toLocaleTimeString();
    var horarioPonto = moment.utc(h).format("YYYY-MM-DDTkk:mm:ss");

    MobileUI.ajax.post(url).send({
        chegada: null,
        intervalo: horarioPonto,
        saida: null,
        tipoPonto: 'Intervalo',
        latitude: latitudeUser,
        longitude: longitudeUser,
        funcionario: {
            "id": usuarioLogado.id
        }
    }).end(returnApiPontoIntervalo)
}

function returnApiPontoIntervalo(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }

    alert("Intervalo realizado com sucesso!");
}

function insertPontoSaida() {
    var url = 'http://10.1.15.19:9091/api/mobilepoint/pontos';
    var horarioAtualPonto = new Date();
    var h = horarioAtualPonto.toLocaleDateString() + " " + horarioAtualPonto.toLocaleTimeString();
    var horarioPonto = moment.utc(h).format("YYYY-MM-DDTkk:mm:ss");

    MobileUI.ajax.post(url).send({
        chegada: null,
        intervalo: null,
        saida: horarioPonto,
        tipoPonto: 'Saída',
        latitude: latitudeUser,
        longitude: longitudeUser,
        funcionario: {
            "id": usuarioLogado.id
        }
    }).end(returnApiPontoSaida)
}

function returnApiPontoSaida(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }

    alert("Saída realizada com sucesso!");
}

function localizacao(tipo) {
    let config = {
        enableHighAccuracy: true
    }
    
    tipoPonto = tipo;
    navigator.geolocation.getCurrentPosition(onSuccess, onError, config);
}

function onSuccess(position) {               
    latitudeUser = position.coords.latitude;
    longitudeUser = position.coords.longitude;

    if (tipoPonto == 'entrada') {
        insertPontoEntrada();
    } else if (tipoPonto == 'intervalo') {
        insertPontoIntervalo();
    } else if (tipoPonto == 'saida') {
        insertPontoSaida();
    }
    
}

function onError(error) {
    alert({
        id: 'alertError',
        title: 'Aviso',
        message: error.message,
        buttons: [
            {
                label: 'OK',
                onclick: function() {
                    closeAlert('alertMapError')
                }
            }
        ] 
    })
}