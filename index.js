let des = document.getElementById('desenho').getContext('2d')


let estrelas = [
    new Estrela(1195, 36, 5, 5, 'white'),
    new Estrela(1065, 108, 5, 5, 'white'),
    new Estrela(805, 252, 5, 5, 'white'),
    new Estrela(545, 540, 5, 5, 'white'),
    new Estrela(675, 324, 5, 5, 'white'),
    new Estrela(155, 180, 5, 5, 'white'),
    new Estrela(415, 468, 5, 5, 'white'),
    new Estrela(285, 396, 5, 5, 'white'),
    new Estrela(935, 612, 5, 5, 'white'),
    new Estrela(25, 684, 5, 5, 'white')
]

let player = new Carro(20, 625, 115, 115, 'red')

let inimigos = [
    new CarroInimigo(1130, 325, 75, 75, 'green'),
    new CarroInimigo(930, 325, 75, 75, 'orange'),
    new CarroInimigo(530, 325, 75, 75, 'blue'),
    new CarroInimigo(330, 325, 75, 75, 'purple')
]


let keysAtivas = {
    W : false,
    A : false,
    S : false,
    D : false
}

document.addEventListener('keydown', (e)=>{
    let key = e.key.toLowerCase()
    if(key == 'w'){
        keysAtivas.W = true
    }else if(key == 'a'){
        keysAtivas.A = true
    }else if(key == 's'){
        keysAtivas.S = true
    }else if(key == 'd'){
        keysAtivas.D = true
    }
})

document.addEventListener('keyup', (e)=>{
    let key = e.key.toLowerCase()
    if(key == 'w'){
        keysAtivas.W = false
    }else if(key == 'a'){
        keysAtivas.A = false
    }else if(key == 's'){
        keysAtivas.S = false
    }else if(key == 'd'){
        keysAtivas.D = false
    }
})

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
        if(inimigos[i].x == 1300 && player.vida > 0){
            player.pontos += 5
            console.log(`PONTOS: ${player.pontos}`)
        }
    }

    for(i=0;i<estrelas.length;i++){
        estrelas[i].mov_est()
    }

    colisao()
}

function main(){
    des.clearRect(0,0,1200,700)
    desenha()
    atualiza()
}

main()

setInterval(main, 1000/60)