let des = document.getElementById('desenho').getContext('2d')


// ---------- Constantes ----------
const ARMA_COOLDOWN = 5
const FREQUENCIA_INIMIGO = 12



// ---------- Objetos na cena ----------
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

let player = new Nave(20, 485, 138, 180, 'red')

let inimigos = []

let balas = []



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

// ---------- Utilidades ----------
function numAleatorio(min, max){
    return Math.random() * (max - min) + min
}



// ----- Detectar colisões na tela -----
function colisao(){
    for(i=0;i<inimigos.length;i++){
        if(player.colid(inimigos[i])){
            player.vida -= 1
            console.log(`VIDA: ${player.vida}`)
            inimigos[i].y = 1270
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

    player.des_quad()
}



// ----- Mover objetos na tela -----
function atualiza(){
    // Player
    player.mov_car(keysAtivas)

    // Balas
    for(i=0; i < balas.length; i++){
        balas[i].mov_bala()
    }

    // Inimigos
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



// ----- Sistema das balas -----
let tempoCooldown = ARMA_COOLDOWN
function bala(){

    // ----- Tiro -----
    if(keysAtivas.J == true){
        tempoCooldown++
        if(tempoCooldown == ARMA_COOLDOWN+1){
            tempoCooldown = 1
            balas.push(new Bala(player.x+100,player.y+80, 50, 20, 'aquamarine'))
            console.log(balas)
        }
    }else{
        tempoCooldown = ARMA_COOLDOWN
    }

    // ----- Remover balas -----
    if(balas[0] !== undefined){
        if(balas[0].x > 2200){
            balas.shift()
        }
    }
}



// ----- Sistema dos inimigos -----
function spawnInimigo(){
    inimigos.push(new Inimigo(2200, numAleatorio(50, 955), 75, 75, 'yellow'))

    // ----- Remover inimigos -----
    if(inimigos[0] !== undefined){
        if(inimigos[0].x < -100){
            inimigos.shift
        }
    }
}
    



// -------------------- Principal --------------------
function main(){
    des.clearRect(0,0,2920,1080)
    desenha()
    atualiza()
}

main()
bala()
spawnInimigo()

setInterval(main, 16.667)
setInterval(bala, 16.667*ARMA_COOLDOWN/2)
setInterval(spawnInimigo, 12000/FREQUENCIA_INIMIGO)