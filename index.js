let des = document.getElementById('desenho').getContext('2d')
let estado = 'menu'

let fase = new Fase()


// --------------- Objetos na cena ---------------
let estrelas = [
    new Estrela(1912, 57, 10, 10, 'white'),
    new Estrela(1704, 172, 10, 10, 'white'),
    new Estrela(1288, 403, 10, 10, 'white'),
    new Estrela(872, 864, 10, 10, 'white'),
    new Estrela(1080, 518, 10, 10, 'white'),
    new Estrela(248, 288, 5, 5, 'white'),
    new Estrela(664, 749, 5, 5, 'white'),
    new Estrela(456, 634, 5, 5, 'white'),
    new Estrela(1496, 979, 5, 5, 'white'),
    new Estrela(40, 1094, 5, 5, 'white')
]

let players = [
    new Nave(20, 785, 138, 180, './img/player/player_parado.png'),
    new Nave2(20, 485, 138, 180, './img/player/player2_parado.png')
]

let inimigos = []

let balas = []

let powerups = []

let efeitos = []

let particulas = []


// --------------- Texto ---------------
let textVida = new Text()
let textPonto = new Text()
let textFase = new Text()

let tituloJogo = new Image()
tituloJogo.src = './img/texto/spaceinvasion.png'


// --------------- Áudio ---------------
let powerupSfx = new Som('./sfx/powerup.mp3', 6)
let laserSfx = new Som('./sfx/laser.mp3', 20)
let foguete = new Audio('./sfx/foguete.mp3')
foguete.loop = true
foguete.volume = 0.22


// --------------- Fundo ---------------
let fundo = new Image()
fundo.src = fase.a
let carregou = false


// --------------- Teclas ---------------
let keysAtivas = {
    // Movimentação P1
    W: false,
    A: false,
    S: false,
    D: false,
    // Movimentação P@
    Up: false,
    Left: false,
    Down: false,
    Right: false,

    // Arma P1
    H: false,
    // Arma P2
    L: false,
}

document.addEventListener('keydown', (e)=>{
    let key = e.key.toLowerCase()
    // ----- Movimentação P1 -----
    if(key == 'w'){  
        keysAtivas.W = true
    }else if(key == 'a'){
        keysAtivas.A = true
    }else if(key == 's'){
        keysAtivas.S = true
    }else if(key == 'd'){
        keysAtivas.D = true
    // ----- Movimentação P2 -----
    }else if(key == 'arrowup'){
        keysAtivas.Up = true
    }else if(key == 'arrowleft'){
        keysAtivas.Left = true
    }else if(key == 'arrowdown'){
        keysAtivas.Down = true
    }else if(key == 'arrowright'){
        keysAtivas.Right = true
    
    // ----- Arma P1 -----
    }else if(key == 'h'){
        keysAtivas.H = true 
    // ----- Arma P2
    }else if(key == 'l'){
        keysAtivas.L = true 
    }
})

document.addEventListener('keyup', (e)=>{
    let key = e.key.toLowerCase()
    // ----- Movimentação P1 -----
    if(key == 'w'){  
        keysAtivas.W = false
    }else if(key == 'a'){
        keysAtivas.A = false
    }else if(key == 's'){
        keysAtivas.S = false
    }else if(key == 'd'){
        keysAtivas.D = false
    // ----- Movimentação P2 -----
    }else if(key == 'arrowup'){
        keysAtivas.Up = false
    }else if(key == 'arrowleft'){
        keysAtivas.Left = false
    }else if(key == 'arrowdown'){
        keysAtivas.Down = false
    }else if(key == 'arrowright'){
        keysAtivas.Right = false
    
    // ----- Arma P1 -----
    }else if(key == 'h'){
        keysAtivas.H = false 
    // ----- Arma P2
    }else if(key == 'l'){
        keysAtivas.L = false 
    }
})



// -------------------- Funções principais --------------------


// ----- Detectar colisões na tela -----
function colisao(){
    for(i=0;i<inimigos.length;i++){
        for(p=0;p<players.length;p++){
            if(players[p].colisao(inimigos[i])){
                players[0].vida -= 1
                inimigos.splice(i, 1)
                players[0].pontos -= 5
                if(players[0].vida == 0){
                    estado = 'derrota'
                }
            }
        }
        for(j=0;j<balas.length;j++){
            if(balas[j].colid(inimigos[i])){
                efeitos.push(new Efeito(balas[j].x + balas[j].w - 24, balas[j].y + balas[j].h/2 - 24, 48, 48, './img/efeitos/bala_efeito/bala_efeito_0.png', 'ImpactoBala'))
                inimigos[i].vida -= players[0].dano
                if(inimigos[i].vida <= 0){

                    // Spawnar power-up
                    let powerup = new Powerup(inimigos[i].x, inimigos[i].y, 80, 80, null, null)
                    powerup.raridade()
                    powerups.push(powerup)

                    for(let k=0;k<powerups.length;k++){
                        if(powerups[k].tipo === null){
                            powerups.shift(k, 1)
                        }
                    }

                    inimigos.splice(i, 1)
                    players[0].pontos += 5
                }
                balas.splice(j, 1)
            }
        }
    }
    
    for(p=0;p<players.length;p++){
        for(i=0;i<powerups.length;i++){
            if(players[p].colid(powerups[i])){
                powerups[i].powerup()
                powerups.splice(i, 1)
            }
        }
    }
}



// ----- Desenhar objetos na tela -----
function desenha(){
    if(estado == 'jogo'){ // -------------------- EM JOGO --------------------
    
    // Fundo
    
    fase.definirFundo()
    fundo.src = fase.a
    des.drawImage(fundo, 0, 0, 1920, 1080)

    // Estrelas
    for(i=0;i<estrelas.length;i++){
        estrelas[i].des_quad()
    }

    // Powerups
    for(i=0;i<powerups.length;i++){
        powerups[i].des_obj()
    }

    // Inimigos
    for(i=0;i<inimigos.length;i++){
        inimigos[i].des_obj()
        inimigos[i].criarParticula()
    }

    // Partículas
    for(i+0;i<particulas.length;i++){
        particulas[i].des_quad()
    }

    // Balas
    for(i=0;i<balas.length;i++){
        balas[i].des_quad()
    }

    // Efeitos
    for(i=0;i<efeitos.length;i++){
        efeitos[i].des_obj()
    }

    // Players
    for(p=0;p<players.length;p++){
        players[p].des_obj()
        players[p].criarParticula()
    }


    // Texto
    textVida.des_text('Vida: ' + players[0].vida, 40, 40, 'white', '26px Arial')
    textPonto.des_text('Pontuação: ' + players[0].pontos, 870, 40, 'white', '26px Arial')
    textFase.des_text('Fase: ' + fase.fase, 1800, 40, 'white', '26px Arial')
    }
}



// ----- Atualizar elementos na tela -----
function atualiza(){

    if(estado == 'jogo'){ // -------------------- EM JOGO --------------------

        // Fundo
        fase.animarBackground()
    
        // Player
        for(p=0;p<players.length;p++){
            players[p].mov_nav()
            players[p].anim()
            players[p].atirar()
        }
    
        // Balas
        for(i=0; i < balas.length; i++){
            balas[i].mov_bala()
        }
        
        // Efeitos
        for(i=0;i<efeitos.length;i++){
            efeitos[i].anim()
        }
    
        // Powerups
        for(i=0;i<powerups.length;i++){
            powerups[i].mov_pow()
        }
    
        // Inimigos
        fase.spawnInimigo()
        for(i=0;i<inimigos.length;i++){
            inimigos[i].mov_nav()
        }
    
        // Partículas dos inimigos
        for(i=0;i<particulas.length;i++){
            particulas[i].mov_part()
        }
    
        // Estrelas
        for(i=0;i<estrelas.length;i++){
            estrelas[i].mov_est()
        }
    
    
        colisao()

    }else if(estado == 'derrota'){ // -------------------- DERROTADO --------------------

        // Sons
        foguete.pause()


        // Tela
        jogo.style.display = 'none'
        derrota.style.display = 'block'
        document.querySelector('#derrota #pontuacao').innerHTML = `Pontuação: ${players[0].pontos}`

    }else if(estado == 'fim'){ // -------------------- FIM DE JOGO --------------------

        // Sons
        foguete.pause()

        // Tela
        jogo.style.display = 'none'
        vitoria.style.display = 'block'
        document.querySelector('#vitoria #pontuacao').innerHTML = `Pontuação: ${players[0].pontos}`
        document.querySelector('#vitoria #vidas').innerHTML = `Vidas restantes: ${players[0].vida} (+${players[0].vida*100})`
        document.querySelector('#vitoria #total').innerHTML = `Pontuação total: ${players[0].pontos + players[0].vida*100}`
    }
}



// -------------------- Principal --------------------

let fps = 60
let intervalo = 1000/fps
let antes = Date.now()
let agora, passado
let contagem = 0


function main(){

    agora = Date.now()
    passado = agora - antes

    if(passado > intervalo) {
        antes = agora - (passado % intervalo)

        des.clearRect(-500,-400,2920,1880)

        if(estado == 'jogo'){
            contagem++
            if(contagem < 2000){
                fase.mudarFase(1)
            }else if(contagem < 4000){
                fase.mudarFase(2)
            }else if(contagem < 6000){
                fase.mudarFase(3)
            }else{
                estado = 'fim'
            }
        }
        desenha()
        atualiza()
    }

    requestAnimationFrame(main)
}

main()