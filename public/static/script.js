document.getElementById("novidades").onclick = function() {
    if (document.getElementById("mega-menu").style.display === "grid"){
        document.getElementById("mega-menu").style.display = "none";
        document.getElementById("droped").style.display = "none";
        document.getElementById('html').classList.remove('no-scroll');
    }else{
        document.getElementById("droped").style.display = "block";
        document.getElementById("mega-menu").style.display = "grid";
        document.getElementById('html').classList.add('no-scroll');
    }
}
