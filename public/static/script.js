
function mobileAgentsChecking() {
    var scrollHeight = window.innerHeight;
    if (document.getElementsByTagName("html")[0].offsetHeight > scrollHeight) {
        if(navigator.userAgent.toLowerCase().search('mobile') === -1){
            return '15px'
        }else{
        return '0px'}
    }else{
        return '0px'
    }
}

var panelBtn = document.getElementsByClassName('familia');

function myScript(){
    alert('marche')
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function OpenCloseMenu(nameMenu,nameTab,nameArrow,display,display2,bntName) {
    if (document.getElementById(nameMenu).style.display === display){
        document.getElementById(bntName).style.fontWeight = '400';
        document.getElementById(nameTab).style.maxHeight = '0%'
        document.getElementById(nameTab).style.transition = 'max-height .3s ease-out'
        document.getElementById(nameArrow).style.WebkitTransitionDuration='.3s';
        document.getElementById(nameArrow).style.transform  = 'rotate(270deg)';
        setTimeout(() => {
            document.getElementById(nameMenu).style.display = "none";
            document.getElementById(nameTab).style.display = "none";
            document.getElementsByTagName("html")[0].classList.remove('no-scroll');
            document.getElementById('fixed').style.paddingRight = '';
            document.getElementsByTagName("html")[0].style.paddingRight = '';
          }, "300")
    }else{
        document.getElementById(bntName).style.fontWeight = 'bold';
        document.getElementById(nameTab).style.display = display2;
        document.getElementById(nameMenu).style.display = display;
        document.getElementsByTagName("html")[0].classList.add('no-scroll');
        document.getElementById('fixed').style.paddingRight = mobileAgentsChecking();
        document.getElementsByTagName("html")[0].style.paddingRight = mobileAgentsChecking();
        document.getElementById(nameArrow).style.WebkitTransitionDuration='.3s';
        document.getElementById(nameArrow).style.transform  = 'rotate(90deg)';
        setTimeout(() => {
            document.getElementById(nameTab).style.maxHeight = '100%'
            document.getElementById(nameTab).style.transition = 'max-height .3s ease-in'
          }, "0")
    }
}

function close(nameArrow,nameMenu,nameTab,bntName) {
    document.getElementById(nameMenu).style.display = "none";
    document.getElementById(nameTab).style.display = "none";
    document.getElementsByTagName("html")[0].classList.remove('no-scroll');
    document.getElementById('fixed').style.paddingRight = '';
    document.getElementsByTagName("html")[0].style.paddingRight = '';
    document.getElementById(bntName).style.fontWeight = '400';
    document.getElementById(nameArrow).style.WebkitTransitionDuration='.3s';
    document.getElementById(nameArrow).style.transform  = 'rotate(270deg)';
}

function touchHandler(expr) {
    switch (expr) {
        case 'expnovidades':
            if (document.getElementById("mega-menu2").style.display === "flex"){
                close("esprrow","mega-menu2","droped2","espaços");
            }else if (document.getElementById("product-menu").style.display === "flex"){
                close("elctromoveisarrow","product-menu","droped-product","elcetromoveis");
            }break;
        case 'expespaços':
            if (document.getElementById("product-menu2").style.display === "grid"){
                close("moveisarrow","product-menu2","droped-product-moveis","moveis");
            }else if(document.getElementById("product-menu").style.display === "flex"){
                close("elctromoveisarrow","product-menu","droped-product","elcetromoveis");
            }break;
        case 'expprodutos':
            if (document.getElementById("product-menu2").style.display === "grid"){
                close("moveisarrow","product-menu2","droped-product-moveis","moveis");
            }else if(document.getElementById("mega-menu2").style.display === "grid"){
                close("esprrow","mega-menu2","droped2","espaços");
            }break;
        default:
            if (document.getElementById("product-menu2").style.display === "grid"){
                close("moveisarrow","product-menu2","droped-product-moveis","moveis");
            }else if (document.getElementById("mega-menu2").style.display === "grid"){
                close("esprrow","mega-menu2","droped2","espaços");
            }else if (document.getElementById("product-menu").style.display === "flex"){
                close("elctromoveisarrow","product-menu","droped-product","elcetromoveis");
            }
      }
}

document.getElementById("moveis").onclick = function() {
    touchHandler("expnovidades");
    OpenCloseMenu("product-menu2","droped-product-moveis","moveisarrow","grid","block","moveis");
}

document.getElementById("espaços").onclick = function() {
    touchHandler('expespaços');
    OpenCloseMenu("mega-menu2","droped2","esprrow","grid","block","espaços");
}

document.getElementById("elcetromoveis").onclick = function() {
    touchHandler('expprodutos');
    OpenCloseMenu("product-menu","droped-product","elctromoveisarrow","flex","flex","elcetromoveis");
}

document.getElementById("header").addEventListener('click', touchHandler, false);

var range = document.getElementById('range-preco');
var field = document.getElementById('input-preco');
var range2 = document.getElementById('range-preco2');
var field2 = document.getElementById('input-preco2');

if (range && field && range2 && field2){
    range.addEventListener('input', function (e) {
        if(parseFloat(e.target.value) < parseFloat(range2.value)){
            e.target.value = range2.value + 1
            e.preventDefault();
            field.value = e.target.value;
            return false;
        }
        field.value = e.target.value;
        return true;  
    });


    field.addEventListener('input', function (e) {
        if (e.target.value > parseFloat(range.max)){
            e.target.value = parseFloat(range.max);
            e.preventDefault();
            range.value = e.target.value;
            return false;
        }
        if(e.target.value < field2.value){
            e.target.value = field2.value + 1
            e.preventDefault();
            range.value = e.target.value;
            return false;
        }
        range.value = e.target.value;
        return true;
        
    });



    range2.addEventListener('input', function (e) {
        if(parseFloat(e.target.value) > parseFloat(range.value)){
            e.target.value = range.value + 1
            e.preventDefault();
            field2.value = e.target.value;
            return false;
        }
        field2.value = e.target.value;
        return true;  
    });

    field2.addEventListener('input', function (e) {
        if (e.target.value > parseFloat(range.value)){
            e.target.value = parseFloat(range.value);
            e.preventDefault();
            range2.value = e.target.value;
            return false;
        }
        if (e.target.value < parseFloat(e.target.min)){
            e.target.value = parseFloat(e.target.min);
            e.preventDefault();
            range2.value = e.target.value;
            return false;
        }
        range2.value = e.target.value;
        return true;  
    });
}