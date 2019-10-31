function timer() {
    var h = new Date();
    document.getElementById('horario').innerHTML = h.toLocaleTimeString();
    
    var d = new Date();
    document.getElementById('data').innerHTML = d.toLocaleDateString();
    setTimeout('timer()', 1000);
}

document.addEventListener('openPage', function() {
    timer();
})