let des = document.getElementById('desenho').getContext('2d')
let estado = 'jogo'


// --------------- Objetos na cena ---------------
let estrelas = [
    new Estrela(1912, 57, 5, 5, 'white'),
    new Estrela(1704, 172, 5, 5, 'white'),
    new Estrela(1288, 403, 5, 5, 'white'),
    new Estrela(872, 864, 5, 5, 'white'),
    new Estrela(1080, 518, 5, 5, 'white'),
    new Estrela(248, 288, 5, 5, 'white'),
    new Estrela(664, 749, 5, 5, 'white'),
    new Estrela(456, 634, 5, 5, 'white'),
    new Estrela(1496, 979, 5, 5, 'white'),
    new Estrela(40, 1094, 5, 5, 'white')
]


let player = new Nave(20, 485, 138, 180, './img/player/player_parado.png')

let inimigos = []

let balas = []



// --------------- Texto ---------------
let textVida = new Text()
let textPonto = new Text()



// --------------- Teclas ---------------
let keysAtivas = {
    // Movimentação
    W : false,
    A : false,
    S : false,
    D : false,

    // Arma
    J : false
}

document.addEventListener('keydown', (e)=>{
    let key = e.key.toLowerCase()
    //  ----- Movimentação -----
    if(key == 'w'){  
        keysAtivas.W = true
    }else if(key == 'a'){
        keysAtivas.A = true
    }else if(key == 's'){
        keysAtivas.S = true
    }else if(key == 'd'){
        keysAtivas.D = true

    //  ----- Arma -----
    }else if(key == 'j'){
        keysAtivas.J = true 
    }
})

document.addEventListener('keyup', (e)=>{
    let key = e.key.toLowerCase()
    // ----- Movimentação -----
    if(key == 'w'){
        keysAtivas.W = false
    }else if(key == 'a'){
        keysAtivas.A = false
    }else if(key == 's'){
        keysAtivas.S = false
    }else if(key == 'd'){
        keysAtivas.D = false

    //  ----- Arma -----
    }else if(key == 'j'){
        keysAtivas.J = false
    }
})



// -------------------- Funções principais --------------------


// ----- Detectar colisões na tela -----
function colisao(){
    for(i=0;i<inimigos.length;i++){
        if(player.colisao(inimigos[i])){
            player.vida -= 1
            console.log(`VIDA: ${player.vida}`) 
            inimigos.splice(i, 1)
            player.pontos -= 5
        }
        for(j=0;j<balas.length;j++){
            if(balas[j].colid(inimigos[i]) && player.vida > 0){
                player.pontos += 5
                console.log(`PONTOS: ${player.pontos}`)
                inimigos.splice(i, 1)
                balas.splice(j, 1)
            }
        }
    }
    
}


// ----- Desenhar objetos na tela -----
function desenha(){

    // Estrelas
    for(i=0;i<estrelas.length;i++){
        estrelas[i].des_quad()
    }

    // Inimigos
    for(i=0;i<inimigos.length;i++){
        inimigos[i].des_quad()
    }

    // Balas
    for(i=0;i<balas.length;i++){
        balas[i].des_quad()
    }

    // Player
    player.des_nave()

    // Texto
    textVida.des_text('Vida: ' + player.vida, 40, 40, 'white', '26px Arial')
    textPonto.des_text('Pontuação: ' + player.pontos, 870, 40, 'white', '26px Arial')

}



// ----- Mover objetos na tela -----
function atualiza(){
    // Player
    player.mov_car(keysAtivas)
    player.anim(`player_frente/player_frente_`)
    player.atirar(keysAtivas)

    // Balas
    for(i=0; i < balas.length; i++){
        balas[i].mov_bala()
    }
    

    // Inimigos
    player.spawnInimigo()
    for(i=0;i<inimigos.length;i++){
        inimigos[i].mov_car()
        if(inimigos[i].x == 1970 && player.vida > 0){
            player.pontos += 5
            console.log(`PONTOS: ${player.pontos}`)
        }
    }


    // Estrelas
    for(i=0;i<estrelas.length;i++){
        estrelas[i].mov_est()
    }

    colisao()
}



// -------------------- Principal --------------------

let frameCount = 0
let fps = 60
let intervalo = 1000/fps
let antes = Date.now()
let agora, passado


function main(){

    agora = Date.now()
    passado = agora - antes

    if(passado > intervalo) {
        antes = agora - (passado % intervalo)

        if(estado == 'jogo'){
            des.clearRect(0,0,2920,1080)
            desenha()
            atualiza()
        }
    }

    requestAnimationFrame(main)
}

main()