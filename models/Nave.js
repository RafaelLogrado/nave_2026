function numAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    framePart = 0

    des_quad(){
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }

    des_nave(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    colid(objeto){
        if(objeto !== undefined){
            if(objeto == player){
                if(this.x < objeto.x + objeto.hitboxW &&
                    this.x + this.w > objeto.x &&
                    this.y < objeto.y + objeto.h &&
                    this.y + this.h > objeto.y){
                    return true
                }else{
                    return false
                }
            }else{
                if(this.x < objeto.x + objeto.w &&
                    this.x + this.w > objeto.x &&
                    this.y < objeto.y + objeto.h &&
                    this.y + this.h > objeto.y){
                    return true
                }else{
                    return false
                }
            }
            
        }
    }
}

class Nave extends Obj{

    hitboxW = this.w*0.8 
    
    dirY = 0
    dirX = 0

    vida = 3
    pontos = 0
    velocidade = 8
    armaCooldown = 14
    tempoCooldown = this.armaCooldown
    frame = 1
    tempo = 0




    // --------------- Movimentação ---------------
    mov_nav(){

        // ----- MOVIMENTAÇÃO DO EIXO Y -----
        if(keysAtivas.W == true && keysAtivas.S == false){
            this.dirY = -this.velocidade
        }else if(keysAtivas.W == false && keysAtivas.S == true){
            this.dirY = this.velocidade
        }else{
            this.dirY = 0
        }

        this.y += this.dirY
        if(this.y < 15){
            this.y = 15
        }else if(this.y > 885){
            this.y = 885
        }

        // ----- MOVIMENTAÇÃO DO EIXO X -----
        if(keysAtivas.A == true && keysAtivas.D == false){
            this.dirX = -this.velocidade
        }else if(keysAtivas.A == false && keysAtivas.D == true){
            this.dirX = this.velocidade
        }else{
            this.dirX = 0
        }

        this.x += this.dirX
        if(this.x < 20){
            this.x = 20
        }else if(this.x > 1790){
            this.x = 1790
        }
    }



    // --------------- Sistema de atirar ---------------
    atirar(){
        // ----- Tiro -----
        if(keysAtivas.J == true){
            this.tempoCooldown++
            if(this.tempoCooldown == this.armaCooldown+1){
                this.tempoCooldown = 1
                balas.push(new Bala(this.x+100,this.y+80, 50, 20, 'aquamarine'))
            }
        }else{
            this.tempoCooldown = this.armaCooldown
        }

        // ----- Remover balas -----
        if(balas[0] !== undefined){
            if(balas[0].x > 2200){
                balas.shift()
            }
        }
    }


    // ---------- Animação ----------
    anim(){
        this.tempo++
        if(this.tempo > 12){
            this.tempo = 0
            this.frame++
        }
        if(this.frame > 2){
            this.frame = 0
        }

        if(this.dirX < -1){
            this.a = './img/player/player_parado.png'
        }else{
            this.a = './img/player/player_frente/player_frente_'+this.frame+'.png'
        }
    }


    // ---------- Sistema de Partículas ----------
    partCores = [`brown`, `coral`, `darkred`, `lightsalmon`, `peachpuff`]

    criarParticula(){
        if(particulas.length>=(inimigos.length * 6 + 6)){
            particulas.shift()
        }

        if(particulas[0] != undefined){
            if(particulas[0].x < -100){
                particulas.shift()
            }
        }

        if(this.framePart<=4){
            this.framePart++
        }else{
            this.framePart = 1
            if(keysAtivas.A == false){
                particulas.push(new Particula(this.x+10, this.y+86+(Math.random()*10-5), 12, 12, this.partCores[numAleatorio(0, this.partCores.length-1)], `Player`))
            }
        }
    }


    // ---------- Colisão com hitbox ----------
    colisao(objeto){
        if(this.x < objeto.x + objeto.w &&
            this.x + this.hitboxW > objeto.x &&
            this.y < objeto.y + objeto.h &&
            this.y + this.h > objeto.y){
            return true
        }else{
            return false
        }
    }
}

class Bala extends Obj{
    mov_bala(){
        this.x += 24
    }
}

class Efeito extends Obj{

    constructor(x,y,w,h,a,tipo){
        super(x,y,w,h,a)

        this.tipo = tipo
    }
    
    frame = 1
    tempo = 0
    
    anim(){
        this.tempo++
        switch(this.tipo){
            case 'ImpactoBala':
                if(this.tempo > 4){
                    this.tempo = 0
                    this.frame++
                }
                if(this.frame > 3){
                    let debounce = true
                    for(i=0;i<efeitos.length;i++){
                        if(efeitos[i].tipo = 'ImpactoBala'){
                            efeitos.splice(i, 1)
                        }
                    }
                }
        
                this.a = './img/efeitos/bala_efeito/bala_efeito_'+this.frame+'.png'
                break
        }
        
    }
}

class InimigoBasico extends Obj{
    
    vida = 3


    mov_nav(){
        this.x -= 8
    }


    // ---------- Sistema de Partículas ----------
    
    partCores = ['aquamarine', 'darkturquoise', 'azure']

    criarParticula(){
        if(particulas.length>=(inimigos.length * 6 + 6)){
            particulas.shift()
        }

        if(particulas[0] != undefined){
            if(particulas[0].x < -100){
                particulas.shift()
            }
        }

        if(this.framePart<=6){
            this.framePart++
        }else{
            this.framePart = 1
            particulas.push(new Particula(this.x+110, this.y+56, 8, 8, this.partCores[numAleatorio(0, this.partCores.length-1)], `InimigoBasico`))
        }

    }
}

class InimigoOnda extends Obj{

    vida = 2

    yInicial = this.y

    mov_nav(){
        this.x -= 7
        this.y = this.yInicial + Math.sin(this.x / 150) * 300
    }


    // ---------- Sistema de Partículas ----------

    criarParticula(){

    }
}

class Particula extends Obj{
    constructor(x,y,w,h,a,tipo){
        super(x,y,w,h,a)

        this.tipo = tipo
    }

    dirX = 0
    dirY = 0

    debounce = true

    mov_part(){
        if(this.debounce===true){
            // ---------- Movimentação das partículas
            switch(this.tipo){
                case `InimigoBasico`:
                    this.debounce = false
                    this.dirX = -7 + Math.random()
                    this.dirY = (Math.random()-0.5)*1.5
                    break;
                case `Player`:
                    this.debounce = false
                    if(keysAtivas.D == true){
                        this.dirX = -7 + Math.random()
                    }else{
                        this.dirX = -5 - Math.random()
                    }
                    this.dirY = (Math.random()-0.5)*3
                    break;
            }
        }
        
        this.x += this.dirX
        this.y += this.dirY
    }
}

class Estrela extends Obj{
    mov_est(){
        this.x -= this.w/15
        if(this.x < -50){
            this.x = 1970
        }
    }
}

class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}

class Fase{
    // --------------- Spawn de inimigos ---------------
    frequencia = 0.6
    intervalo = 1000/this.frequencia
    antes = Date.now()
    agora
    passado

    padraoCont = 1

    padrao1 = {
        1: {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
        2: {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
        3: {
            temp: 500,
            tipo: 'InimigoOnda'
        },
        4: {
            temp: 3000,
            tipo: 'InimigoBasico'
        },
        5: {
            temp: 2000,
            tipo: 'InimigoOnda'
        },
        6: {
            temp: 500,
            tipo: 'InimigoOnda'
        },
    }

    spawnInimigo(){ // Faz inimigos aparecerem
        this.agora = Date.now()
        this.passado = this.agora - this.antes

        let tempo = this.padrao1[this.padraoCont].temp
        let padrao1Array = Object.keys(this.padrao1)

        console.log(tempo)
        console.log(this.padraoCont)

        if(inimigos[0] !== undefined){
            if(inimigos[0].x < -100){
                inimigos.shift()
                player.pontos -= 10
            }
        }
        
        if(this.passado > tempo/this.frequencia){
            this.antes = this.agora - (this.passado % tempo)

            switch(this.padrao1[this.padraoCont].tipo){
                case 'InimigoBasico':
                    inimigos.push(new InimigoBasico(2200, numAleatorio(50, 955), 120, 120, './img/inimigos/inimigo_basico.png'))
                    break
                case 'InimigoOnda':
                    inimigos.push(new InimigoOnda(2200, numAleatorio(50, 955), 120, 120, './img/inimigos/inimigo_onda.png'))
                    break
            }
            this.padraoCont++
            if(this.padraoCont>padrao1Array.length){
                this.padraoCont = 1
            }

            // -- Remover inimigos --
        }   
    }
}