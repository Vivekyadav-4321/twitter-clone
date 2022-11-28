var themecolorcounter = 0
var fontstylecounter = 0

function fontcolorcount(){
if(fontstylecounter >= 6){
    fontstylecounter = 0
}
}
function themecounter (){
    if (themecolorcounter >= 8) {
        themecolorcounter = 0
    }
}

function changethemecolor() {
    themecolorcounter++

    if (themecolorcounter == 1) {
        document.getElementById("themecolor").content = "#ff00ac"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#ff00ac"
        }
    }
    if (themecolorcounter == 2) {
        document.getElementById("themecolor").content = "#fe4001"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#fe4001"
        }
    }
    if (themecolorcounter == 3) {
        document.getElementById("themecolor").content = "#ffd100"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#ffd100"
        }
    }
    if (themecolorcounter == 4) {
        document.getElementById("themecolor").content = "#00ff33"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#00ff33"
        }
    }
    if (themecolorcounter == 5) {
        document.getElementById("themecolor").content = "#00c2ff"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#00c2ff"
        }
    }
    if (themecolorcounter == 6) {
        document.getElementById("themecolor").content = "#ff002c"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "#ff002c"
        }
    }
    if (themecolorcounter == 7) {
        document.getElementById("themecolor").content = "black"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "black"
        }
    }
    if (themecolorcounter == 8) {
        document.getElementById("themecolor").content = "white"
        var optionbuttons = document.getElementsByClassName("iconbutton")
        for (var optionbuttonsl = 0; optionbuttonsl <= optionbuttons.length; optionbuttonsl++) {
            optionbuttons[optionbuttonsl].style.color = "black"
        }
 
    }

}

function copyquotebutton(e) {
    e.classList.remove("fa-copy");
    e.classList.add("fa-check")
}


function changeheartcolor(e) {
    e.classList.remove("fa-heart-o")
    e.classList.add("fa-heart")
    e.setAttribute("disabled", (true))

}

function chanefontstyle() {
    fontstylecounter++
    setInterval(() => {
        if (fontstylecounter == 1) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Special Elite"
            }
        }
        if (fontstylecounter == 2) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Rubik Moonrocks"
            }
        }
        if (fontstylecounter == 3) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Rubik Glitch'"
            }
        }
        if (fontstylecounter == 4) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Send Flowers"
            }
        }
        if (fontstylecounter == 5) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Orbitron"
            }
        }
        if (fontstylecounter == 6) {
            var p = document.getElementsByClassName("quote")
            for (var fontstylecounterl = 0; fontstylecounterl <= p.length; fontstylecounterl++) {
                p[fontstylecounterl].style.fontFamily = "Quicksand"
            }
        }

    }, 100);

}


window.onscroll = function () {
    if (window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight) * 0.80) {
        document.getElementById("optionbar").style.display = "none"
    }
    if (window.scrollY + window.innerHeight <= (document.documentElement.scrollHeight) * 0.95) {
        document.getElementById("optionbar").style.display = "block"
    }
}



function chceklikeordislike(){
    navigator.vibrate(10)
}