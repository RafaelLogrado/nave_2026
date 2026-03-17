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

    colid(objeto){
        if(objeto !== undefined){
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

class Carro extends Obj{
    

    dirY = 0
    dirX = 0

    vida = 3
    pontos = 0
    velocidade = 7

    mov_car(keysAtivas){

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
        }else if(this.y > 950){
            this.y = 950
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

    atirar(keysAtivas){
        if(keysAtivas.J == true){

        }
    }
}

class Bala extends Obj{
    mov_bala(){
        this.x += 24
    }
}

class Inimigo extends Obj{
    
    mov_car(){
        this.x -= 8
        if(this.x < -110){
            this.x = 2020
            this.y = numAleatorio(15, 965)
        }
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