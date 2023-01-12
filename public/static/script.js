
function mobileAgentsChecking() {
    var scrollHeight = window.innerHeight;
    document.getElementsByClassName('panel')[0].classList.add('active');
    document.getElementsByClassName('familia')[0].classList.add('clicked');
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
            if (document.getElementById("mega-menu2").style.display === "grid"){
                close("esprrow","mega-menu2","droped2","espaços");
            }else if (document.getElementById("product-menu").style.display === "flex"){
                close("prodarrow","product-menu","droped-product","produtos");
            }break;
        case 'expespaços':
            if (document.getElementById("mega-menu").style.display === "grid"){
                close("noviarrow","mega-menu","droped","novidades");
            }else if(document.getElementById("product-menu").style.display === "flex"){
                close("prodarrow","product-menu","droped-product","produtos");
            }break;
        case 'expprodutos':
            if (document.getElementById("mega-menu").style.display === "grid"){
                close("noviarrow","mega-menu","droped","novidades");
            }else if(document.getElementById("mega-menu2").style.display === "grid"){
                close("esprrow","mega-menu2","droped2","espaços");
            }break;
        default:
            if (document.getElementById("mega-menu").style.display === "grid"){
                close("noviarrow","mega-menu","droped","novidades");
            }else if (document.getElementById("mega-menu2").style.display === "grid"){
                close("esprrow","mega-menu2","droped2","espaços");
            }else if (document.getElementById("product-menu").style.display === "flex"){
                close("prodarrow","product-menu","droped-product","produtos");
            }
      }
}

document.getElementById("novidades").onclick = function() {
    touchHandler("expnovidades");
    OpenCloseMenu("mega-menu","droped","noviarrow","grid","block","novidades");
}

document.getElementById("espaços").onclick = function() {
    touchHandler('expespaços');
    OpenCloseMenu("mega-menu2","droped2","esprrow","grid","block","espaços");
}

document.getElementById("produtos").onclick = function() {
    touchHandler('expprodutos');
    OpenCloseMenu("product-menu","droped-product","prodarrow","flex","flex","produtos");
}

document.getElementById("header").addEventListener('click', touchHandler, false);

