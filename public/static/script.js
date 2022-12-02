
function mobileAgentsChecking() {
    if(navigator.userAgent.toLowerCase().search('mobile') === -1){
        return '15px'
    }else{
    return '0px'}
}

document.getElementById("novidades").onclick = function() {
    touchHandler("expnovidades")
    if (document.getElementById("mega-menu").style.display === "grid"){
        document.getElementById("droped").style.maxHeight = '0%'
        document.getElementById("droped").style.transition = 'max-height .3s ease-out'
        document.getElementById("noviarrow").style.WebkitTransitionDuration='.3s';
        document.getElementById("noviarrow").style.transform  = 'rotate(270deg)';
        setTimeout(() => {
            document.getElementById("mega-menu").style.display = "none";
            document.getElementById("droped").style.display = "none";
            document.getElementById('html').classList.remove('no-scroll');
            document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
          }, "300")
        
    }else{
        document.getElementById("droped").style.display = "block";
        document.getElementById("mega-menu").style.display = "grid";
        document.getElementById('html').classList.add('no-scroll');
        document.getElementById('fixed').style.paddingRight = mobileAgentsChecking();
        document.getElementById('html').style.paddingRight = mobileAgentsChecking();
        document.getElementById("noviarrow").style.WebkitTransitionDuration='.3s';
        document.getElementById("noviarrow").style.transform  = 'rotate(90deg)';
        setTimeout(() => {
            document.getElementById("droped").style.maxHeight = '100%'
            document.getElementById("droped").style.transition = 'max-height .3s ease-in'
          }, "0")
    }
}


document.getElementById("espaços").onclick = function() {
    touchHandler('expespaços')
    if (document.getElementById("mega-menu2").style.display === "grid"){
        document.getElementById("droped2").style.maxHeight = '0%'
        document.getElementById("droped2").style.transition = 'max-height .3s ease-out'
        document.getElementById("esprrow").style.WebkitTransitionDuration='.3s';
        document.getElementById("esprrow").style.transform  = 'rotate(270deg)';
        setTimeout(() => {
            document.getElementById("mega-menu2").style.display = "none";
            document.getElementById("droped2").style.display = "none";
            document.getElementById('html').classList.remove('no-scroll');
            document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
          }, "300")
    }else{
        document.getElementById("droped2").style.display = "block";
        document.getElementById("mega-menu2").style.display = "grid";
        document.getElementById('html').classList.add('no-scroll');
        document.getElementById('fixed').style.paddingRight = mobileAgentsChecking();
        document.getElementById('html').style.paddingRight = mobileAgentsChecking();
        document.getElementById("esprrow").style.WebkitTransitionDuration='.3s';
        document.getElementById("esprrow").style.transform  = 'rotate(90deg)';
        setTimeout(() => {
            document.getElementById("droped2").style.maxHeight = '100%'
            document.getElementById("droped2").style.transition = 'max-height .3s ease-in'
          }, "0")
    }
}

document.getElementById("header").addEventListener('click', touchHandler, false);

function touchHandler(expr) {
    switch (expr) {
        case 'expnovidades':
            if (document.getElementById("mega-menu2").style.display === "grid"){
                document.getElementById("mega-menu2").style.display = "none";
                document.getElementById("droped2").style.display = "none";
                document.getElementById('html').classList.remove('no-scroll');
                document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
                document.getElementById("esprrow").style.WebkitTransitionDuration='.3s';
                document.getElementById("esprrow").style.transform  = 'rotate(270deg)';
            }
            break;
        case 'expespaços':
            if (document.getElementById("mega-menu").style.display === "grid"){
                document.getElementById("mega-menu").style.display = "none";
                document.getElementById("droped").style.display = "none";
                document.getElementById('html').classList.remove('no-scroll');
                document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
                document.getElementById("noviarrow").style.WebkitTransitionDuration='.3s';
                document.getElementById("noviarrow").style.transform  = 'rotate(270deg)';
            }
            break;
        default:
            if (document.getElementById("mega-menu").style.display === "grid"){
                document.getElementById("mega-menu").style.display = "none";
                document.getElementById("droped").style.display = "none";
                document.getElementById('html').classList.remove('no-scroll');
                document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
                document.getElementById("noviarrow").style.WebkitTransitionDuration='.3s';
                document.getElementById("noviarrow").style.transform  = 'rotate(270deg)';
            }else if (document.getElementById("mega-menu2").style.display === "grid"){
                document.getElementById("mega-menu2").style.display = "none";
                document.getElementById("droped2").style.display = "none";
                document.getElementById('html').classList.remove('no-scroll');
                document.getElementById('fixed').style.paddingRight = '';
            document.getElementById('html').style.paddingRight = '';
                document.getElementById("esprrow").style.WebkitTransitionDuration='.3s';
                document.getElementById("esprrow").style.transform  = 'rotate(270deg)';
            }
      }
}