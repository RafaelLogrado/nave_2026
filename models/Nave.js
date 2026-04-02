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

    des_obj(){
        if(this.a != null){
            let img = new Image()
            img.src = this.a
            des.drawImage(img, this.x, this.y, this.w, this.h)
        }
        
    }

    colid(objeto){
        if(objeto !== undefined){
            if(objeto == players[0] || objeto == players[1]){
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

    // Stats
    vida = 3
    pontos = 0
    dano = 1
    velocidade = 8
    baseCooldown = 14
    armaCooldown = 14
    tempoCooldown = this.armaCooldown
    frame = 1
    tempo = 0

    // Power-ups
    firerate = 0
    poder = 0



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
        if(keysAtivas.H == true){
            this.tempoCooldown++
            if(this.tempoCooldown >= this.armaCooldown+1){
                this.tempoCooldown = 1
                balas.push(new Bala(this.x+100,this.y+80, 50, 20, 'aquamarine'))
                laserSfx.play(0.15)
            }
        } else{
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
        if(particulas.length>=(inimigos.length * 6 + 12)){
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

class Nave2 extends Obj{

    hitboxW = this.w*0.8 
    
    dirY = 0
    dirX = 0

    // Stats
    vida = 3
    pontos = 0
    dano = 1
    velocidade = 8
    baseCooldown = 14
    armaCooldown = 14
    tempoCooldown = this.armaCooldown
    frame = 1
    tempo = 0

    // Power-ups
    firerate = 0
    poder = 0



    // --------------- Movimentação ---------------
    mov_nav(){

        // ----- MOVIMENTAÇÃO DO EIXO Y -----
        if(keysAtivas.Up == true && keysAtivas.Down == false){
            this.dirY = -this.velocidade
        }else if(keysAtivas.Up == false && keysAtivas.Down == true){
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
        if(keysAtivas.Left == true && keysAtivas.Right == false){
            this.dirX = -this.velocidade
        }else if(keysAtivas.Left == false && keysAtivas.Right == true){
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
        if(keysAtivas.L == true){
            this.tempoCooldown++
            if(this.tempoCooldown >= this.armaCooldown+1){
                this.tempoCooldown = 1
                balas.push(new Bala(this.x+100,this.y+80, 50, 20, 'aquamarine'))
                laserSfx.play(0.15)
            }
        } else{
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
            this.a = './img/player/player2_parado.png'
        }else{
            this.a = './img/player/player2_frente/player2_frente_'+this.frame+'.png'
        }
    }


    // ---------- Sistema de Partículas ----------
    partCores = [`brown`, `coral`, `darkred`, `lightsalmon`, `peachpuff`]

    criarParticula(){
        if(particulas.length>=(inimigos.length * 6 + 12)){
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
            if(keysAtivas.Left == false){
                particulas.push(new Particula(this.x+10, this.y+86+(Math.random()*10-5), 12, 12, this.partCores[numAleatorio(0, this.partCores.length-1)], `Player`))
            }
        }
    }


    // ---------- Colisão com hitbox ----------
    colisao(objeto){
        if(objeto !== undefined){

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
    
    vida = 6


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

    vida = 4

    yInicial = this.y

    mov_nav(){
        this.x -= 7
        this.y = this.yInicial + Math.sin(this.x / 150) * 300
    }

    criarParticula(){
        
    }
}

class Powerup extends Obj{
    constructor(x,y,w,h,a,tipo){
        super(x,y,w,h,a)

        this.tipo = tipo
    }

    mov_pow(){
        this.x += -4
    }


    // ----- Chance de cada power-up -----
    raridade(){
        const rand = Math.random()
        if(rand < 0.035){ // 3.5% de chance
            this.tipo = 'Firerate'
            this.a = './img/powerup/firerate.png'

        }else if(rand < 0.045){ // 1% de chance
            this.tipo = 'Poder'
            this.a = './img/powerup/poder.png'

        }else if(rand < 0.085){ // 4% de chance
            this.tipo = 'Vida'
            this.a = './img/powerup/vida.png'

        }else{
            this.tipo = 'Nada'
        }
    }


    // ----- Efeito de cada power-up -----
    powerup(){
        if(this.tipo !== 'Nada'){
            powerupSfx.play(0.5)
        }
        switch(this.tipo){
            case 'Firerate':
                for(let p = 0; p<players.length;p++){
                    players[p].firerate ++
                    players[p].armaCooldown = (players[p].baseCooldown * (0.9 ** players[p].firerate)).toFixed(2)
                    players[p].tempoCooldown = players[p].armaCooldown
                }
                break
            case 'Poder':
                players[0].poder ++
                players[0].dano = (1 + (players[0].poder * 0.5)).toFixed(1)
                break
            case 'Vida':
                if(players[0].vida < 3){
                    players[0].vida ++
                }else{
                    players[0].pontos += 30
                }
        }
    }
}

class Particula extends Obj{
    constructor(x,y,w,h,a,tipo){
        super(x,y,w,h,a)

        this.tipo = tipo
    }

    dirX = 0
    dirY = 0


    mov_part(){
        if(this.dirX === 0){
            // ---------- Movimentação das partículas
            switch(this.tipo){
                case `InimigoBasico`:
                    this.dirX = -7 + Math.random()
                    this.dirY = (Math.random()-0.5)*1.5
                    break;
                case `Player`:
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

    dirX = this.w/2

    mov_est(){
        this.x -= this.dirX
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

class Som{
    constructor(src, quantidade){
        this.sfxArray = []

        for(let i=0;i<quantidade;i++){
            let audio = new Audio(src)
            audio.preload = 'auto'
            this.sfxArray.push(audio)
        }

        
    }

    play(volume = 1){
        let som = this.sfxArray.find(s => s.paused || s.ended) // Acha um áudio disponível

        if(som){
            som.currentTime = 0
            som.volume = volume
            som.play()
        }else{
            let substituto = this.sfxArray[0]
            substituto.currentTime = 0
            substituto.volume = volume
            substituto.play()
        }
    }
}

class Fase{
    constructor(){
        // ----- Imagens para pre-carregar -----
        this.imagensPraCarregar = ['./img/player/player_parado.png', './img/player/player2_parado.png', './img/inimigos/inimigo_basico.png', './img/inimigos/inimigo_onda.png']
        for(let i=0;i<3;i++){
            this.imagensPraCarregar.push('./img/player/player_frente/player_frente_'+i+'.png')
            this.imagensPraCarregar.push('./img/player/player2_frente/player2_frente_'+i+'.png')
        }

        for(let i=0;i<15;i++){
            this.imagensPraCarregar.push('./img/background/background1/background1_'+i+'.png')
        }
    }

    fase = 1
    backgroundFrame = 0
    tempo = 0

    definirFundo(){
        this.a = './img/background/background'+this.fase+'/background'+this.fase+'_'+this.backgroundFrame+'.png'
    }

    animarBackground(){
        this.tempo++

        if(this.tempo>=120){
            this.tempo = 0
            this.backgroundFrame++
            if((this.fase == 1 && this.backgroundFrame>14) || (this.fase == 2 && this.backgroundFrame>0) || (this.fase == 3 && this.backgroundFrame>0)){
                this.backgroundFrame = 0
            }
        }
    }

    mudarFase(fase){
        if(this.fase != fase){
            this.fase = fase
            this.backgroundFrame = 0
        }
        
        
    }

    // --------------- Spawn de inimigos ---------------
    frequencia = 0.6
    antes = Date.now()
    agora
    passado

    padraoCont = 1

    padrao1 = [
        {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 3000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 100,
            tipo: 'InimigoBasico'
        },
        {
            temp: 2000,
            tipo: 'InimigoBasico'
        },
    ]

    padrao2 = [
        {
            temp: 1800,
            tipo: 'InimigoBasico'
        },
        {
            temp: 1800,
            tipo: 'InimigoBasico'
        },
        {
            temp: 1000,
            tipo: 'InimigoOnda'
        },
        {
            temp: 3000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 300,
            tipo: 'InimigoOnda'
        },
        {
            temp: 1000,
            tipo: 'InimigoOnda'
        },
    ]


    padrao3 = [
        {
            temp: 1000,
            tipo: 'InimigoOnda'
        },
        {
            temp: 1000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 200,
            tipo: 'InimigoOnda'
        },
        {
            temp: 3000,
            tipo: 'InimigoBasico'
        },
        {
            temp: 300,
            tipo: 'InimigoBasico'
        },
        {
            temp: 4000,
            tipo: 'InimigoOnda'
        },
        {
            temp: 1000,
            tipo: 'InimigoOnda'
        },
    ]

    

    spawnInimigo(){ // Faz inimigos aparecerem
        this.agora = Date.now()
        this.passado = this.agora - this.antes

        let padrao
        if(this.fase == 1){
            padrao = this.padrao1
        }else if(this.fase == 2){
            padrao = this.padrao2
        }else if(this.fase == 3){
            padrao = this.padrao3
        }

        let tempo = padrao[this.padraoCont].temp

        // --- Remover inimigos ---
        if(inimigos[0] !== undefined){
            if(inimigos[0].x < -100){
                inimigos.shift()
                players[0].pontos -= 30
            }
        }

        
        if(this.passado > tempo){
            this.antes = this.agora - (this.passado % tempo)

            if(this.padraoCont % 2 == 0){
                precarregarImagens(this.imagensPraCarregar)
            }
            switch(padrao[this.padraoCont].tipo){
                case 'InimigoBasico':
                    inimigos.push(new InimigoBasico(2200, numAleatorio(50, 955), 120, 120, './img/inimigos/inimigo_basico.png'))
                    break
                case 'InimigoOnda':
                    inimigos.push(new InimigoOnda(2200, numAleatorio(50, 955), 120, 120, './img/inimigos/inimigo_onda.png'))
                    break
            }
            this.padraoCont++
            if(this.padraoCont>padrao.length-1){
                this.padraoCont = 0
            }

            tempo = padrao[this.padraoCont].temp
        }   
    }
}