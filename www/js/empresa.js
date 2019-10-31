let razaoSocial;
let cnpj;
let email;
let latitude;
let longitude;
let empresa;

function clearForm() {
    MobileUI.clearForm('formCadEmpresa');
    limparMessages();
}

function saveEmpresa() {
    razaoSocial = document.getElementById('nomeRazaoSocial').value;
    cnpj = document.getElementById('cnpj').value;
    email = document.getElementById('email').value;
    latitude = document.getElementById('latitude').value;
    longitude = document.getElementById('longitude').value;
    
    limparMessages();
    if (razaoSocial == undefined || razaoSocial == '') {
        MobileUI.show('validationName');
        return;
    }
    
    if (cnpj == undefined || cnpj == '') {
        MobileUI.show('validationCNPJ');
        return;
    }

    if (latitude == undefined || latitude == '' ||
        longitude == undefined || longitude == '') {
        MobileUI.show('validationCoord');
        return;
    }

    var urlPost = 'http://localhost:9091/api/mobilepoint/empresas';
    if (empresa == undefined) {
        MobileUI.ajax.post(urlPost).send({
            nomeRazaoSocial: razaoSocial,
            cnpj: cnpj,
            email: email,
            latitude: latitude,
            longitude: longitude
        }).end(returnApi)
    } else {
        var urlPut = 'http://localhost:9091/api/mobilepoint/empresas/' + empresa.id;
        MobileUI.ajax.put(urlPut).send({
            id: empresa.id,
            nomeRazaoSocial: razaoSocial,
            cnpj: cnpj,
            email: email,
            latitude: latitude,
            longitude: longitude
        }).end(returnApi)
    }
}

function returnApi(error, res) {
    if (error) {
        alert('Houve um problema na conexão, tente novamente!');
        return console.log(res.error)
    }
    
    alert("Empresa salva com sucesso!");
}

function findEmpresa() {
    var url = 'http://localhost:9091/api/mobilepoint/empresas';

    MobileUI.ajax.get(url).end(resultAjaxEmpresa);
}

function resultAjaxEmpresa(err, res){
    if(err) {
        alert('Houve um problema na conexão, tente novamente!');
    } else {
        if (res.body != null) {
            empresa = res.body;
            document.getElementById('nomeRazaoSocial').value = empresa.nomeRazaoSocial;
            document.getElementById('cnpj').value = empresa.cnpj;
            document.getElementById('email').value = empresa.email;
            document.getElementById('latitude').value = empresa.latitude;
            document.getElementById('longitude').value = empresa.longitude;
        } 
    }
}

function limparMessages() {
    MobileUI.hide('validationName');
    MobileUI.hide('validationCNPJ');
    MobileUI.hide('validationCoord');
}