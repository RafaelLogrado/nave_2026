let des = document.getElementById('desenho').getContext('2d')


// ---------- Constantes ----------
const armaCooldown = 6



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

let player = new Carro(20, 625, 115, 115, 'red')

let inimigos = [
    new CarroInimigo(1808, 325, 75, 75, 'green'),
    new CarroInimigo(1488, 325, 75, 75, 'orange'),
    new CarroInimigo(848, 325, 75, 75, 'blue'),
    new CarroInimigo(528, 325, 75, 75, 'purple')
]

let balas = [

]



// ---------- Teclas ----------
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



// ---------- Funções principais ----------
function colisao(){
    for(i=0;i<inimigos.length;i++){
        if(player.colid(inimigos[i])){
            player.vida -= 1
            console.log(`VIDA: ${player.vida}`)
            inimigos[i].y = 1270
        }
    }
    
}

function desenha(){
    for(i=0;i<estrelas.length;i++){
        estrelas[i].des_quad()
    }

    for(i=0;i<inimigos.length;i++){
        inimigos[i].des_quad()
    }

    player.des_quad()
   
}

function atualiza(){
    player.mov_car(keysAtivas)

    for(i=0;i<inimigos.length;i++){
        inimigos[i].mov_car()
        if(inimigos[i].x == 1970 && player.vida > 0){
            player.pontos += 5
            console.log(`PONTOS: ${player.pontos}`)
        }
    }

    for(i=0;i<estrelas.length;i++){
        estrelas[i].mov_est()
    }

    colisao()
}

function bala(){
    let tempoCooldown = 6
    if(keysAtivas.J == true){
        tempoCooldown++
        if(tempoCooldown)
    }else{
        tempoCooldown = 6
    }
}



// ---------- Principal ----------
function main(){
    des.clearRect(0,0,1920,1080)
    desenha()
    atualiza()
    bala()
}

main()

setInterval(main, 16.667)