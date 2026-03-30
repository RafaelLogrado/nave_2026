let btnJogar = document.getElementById('btnJogar')
let btnSobre = document.getElementById('btnSobre')
let btnManual = document.getElementById('btnManual')
let btnVoltarSobre = document.getElementById('btnVoltarSobre')
let btnVoltarManual = document.getElementById('btnVoltarManual')

const jogo = document.getElementById('desenho')
const menu = document.getElementById('menu')
const sobre = document.getElementById('sobre')
const manual = document.getElementById('manual')
const derrota = document.getElementById('derrota')

btnJogar.addEventListener('click', () => {
    estado = 'jogo'
    jogo.style.display = 'block'
    menu.style.display = 'none'
    foguete.play()
})

btnSobre.addEventListener('click', () => {
    menu.style.display = 'none'
    sobre.style.display = 'block'
})

btnVoltarSobre.addEventListener('click', () =>{
    menu.style.display = 'block'
    sobre.style.display = 'none'
})

btnManual.addEventListener('click', () => {
    manual.style.display = 'block'
    menu.style.display = 'none'
})

btnVoltarManual.addEventListener('click', () =>{
    menu.style.display = 'block'
    manual.style.display = 'none'
})

// --------------- Pre-carregar elementos ---------------

function precarregarImagens(imagens){
    for(let i=0;i<imagens.length;i++){
        let img = new Image()
        img.src = imagens[i]
    }
}

