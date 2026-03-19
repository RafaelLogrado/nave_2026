function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

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
            console.log(objeto)
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
    mov_car(){

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
                console.log(balas)
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
            this.frame = 1
        }

        if(this.dirX > 1){
            this.a = './img/player/player_frente/player_frente_'+this.frame+'.png'
        }else{
            this.a = './img/player/player_parado.png'
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


    // --------------- Spawn de inimigos ---------------
    frequencia = 1
    intervalo = 1000/this.frequencia
    antes = Date.now()
    agora
    passado

    spawnInimigo(){ // Faz inimigos aparecerem
        this.agora = Date.now()
        this.passado = this.agora - this.antes

        if(this.passado > this.intervalo){
            this.antes = this.agora - (this.passado % this.intervalo)
            inimigos.push(new Inimigo(2200, numAleatorio(50, 955), 75, 75, 'yellow'))

            // -- Remover inimigos --
            if(inimigos[0] !== undefined){
                if(inimigos[0].x < -100){
                    inimigos.shift
                }
            }
        }   
    }
}

class Bala extends Obj{
    mov_bala(){
        this.x += 24
    }
}

class Inimigo extends Obj{
    mov_car(){ // Atualiza posição do inimigo
        this.x -= 8
    }
}

class Estrela extends Obj{
    mov_est(){
        this.x -= 1
        if(this.x < -50){
            this.x = 1970
        }
    }
}