var horarioAtual;
var dataAtual;

function timer() {
    horarioAtual = new Date();
    document.getElementById('horario').innerHTML = horarioAtual.toLocaleTimeString();
    
    dataAtual = new Date();
    document.getElementById('data').innerHTML = dataAtual.toLocaleDateString();
    setTimeout('timer()', 1000);
}

document.addEventListener('openPage', function() {
    timer();
})