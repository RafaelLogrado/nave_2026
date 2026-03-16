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

    des_carro(){

        // =================
        // ----- RODAS -----
        // =================

        des.lineWidth = '2'
        des.strokeStyle = 'black'
        des.fillStyle = 'dimgrey'

        des.beginPath()
        des.moveTo(this.x+18, this.y+80)
        des.lineTo(this.x+32, this.y+80)
        des.lineTo(this.x+32, this.y+90)
        des.lineTo(this.x+18, this.y+90)
        des.closePath()
        des.stroke()
        des.fill()

        des.beginPath()
        des.moveTo(this.x+18, this.y+20)
        des.lineTo(this.x+32, this.y+20)
        des.lineTo(this.x+32, this.y+10)
        des.lineTo(this.x+18, this.y+10)
        des.closePath()
        des.stroke()
        des.fill()

        des.beginPath()
        des.moveTo(this.x+82, this.y+70)
        des.lineTo(this.x+68, this.y+70)
        des.lineTo(this.x+68, this.y+75)
        des.lineTo(this.x+82, this.y+75)
        des.closePath()
        des.stroke()
        des.fill()
        
        des.beginPath()
        des.moveTo(this.x+82, this.y+30)
        des.lineTo(this.x+68, this.y+30)
        des.lineTo(this.x+68, this.y+25)
        des.lineTo(this.x+82, this.y+25)
        des.closePath()
        des.stroke()
        des.fill()


        // ==================
        // ----- CHASSI -----
        // ==================

        des.lineWidth = '3'
        des.strokeStyle = 'black'
        des.fillStyle = this.a

        des.beginPath()
        des.moveTo(this.x+20,this.y+18)
        des.lineTo(this.x+20, this.y+82)
        des.lineTo(this.x+50, this.y+70)
        des.lineTo(this.x+50, this.y+30)
        des.closePath()
        des.stroke()
        des.fill()

        des.beginPath()
        des.moveTo(this.x,this.y+10) 
        des.lineTo(this.x, this.y+90)
        des.lineTo(this.x+20, this.y+90)
        des.lineTo(this.x+20, this.y+10)
        des.closePath()
        des.stroke()
        des.fill()
        
        des.beginPath()
        des.moveTo(this.x+100, this.y+85)
        des.lineTo(this.x+115, this.y+85)
        des.lineTo(this.x+115, this.y+15)
        des.lineTo(this.x+100, this.y+15)
        des.closePath()
        des.stroke()
        des.fill()
        
        des.beginPath()
        des.moveTo(this.x+50, this.y+70)
        des.lineTo(this.x+107, this.y+70)
        des.lineTo(this.x+107, this.y+30)
        des.lineTo(this.x+50, this.y+30)
        des.closePath()
        des.stroke()
        des.fill()
        
        // =================
        // ----- VIDRO -----
        // =================


        des.lineWidth = 2
        des.fillStyle = 'paleturquoise'

        des.beginPath()
        des.moveTo(this.x+50, this.y+60)
        des.lineTo(this.x+40, this.y+55)
        des.lineTo(this.x+40, this.y+45)
        des.lineTo(this.x+50, this.y+40)
        des.lineTo(this.x+86, this.y+40)
        des.lineTo(this.x+90, this.y+44)
        des.lineTo(this.x+90, this.y+56)
        des.lineTo(this.x+86, this.y+60)

        des.closePath()
        des.stroke()
        des.fill()

    }
}

class Carro extends Obj{
    

    dirY = 0
    dirX = 0

    vida = 5
    pontos = 0

    mov_car(keysAtivas){

        // ----- MOVIMENTAÇÃO DO EIXO Y
        if(keysAtivas.W == true && keysAtivas.S == false){
            this.dirY = -6
        }else if(keysAtivas.W == false && keysAtivas.S == true){
            this.dirY = 6
        }else{
            this.dirY = 0
        }

        this.y += this.dirY
        if(this.y < 15){
            this.y = 15
        }else if(this.y > 585){
            this.y = 585
        }

        // ----- MOVIMENTAÇÃO DO EIXO X
        if(keysAtivas.A == true && keysAtivas.D == false){
            this.dirX = -6
        }else if(keysAtivas.A == false && keysAtivas.D == true){
            this.dirX = 6
        }else{
            this.dirX = 0
        }

        this.x += this.dirX
        if(this.x < 20){
            this.x = 20
        }else if(this.x > 1070){
            this.x = 1070
        }
    }

    colid(objeto){
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

class CarroInimigo extends Obj{
    
    
    
    mov_car(){
        this.x -= 8
        if(this.x < -110){
            this.x = 1300
            this.y = numAleatorio(15, 585)
        }
    }
}

class Estrela extends Obj{
    mov_est(){
        this.x -= 1
        if(this.x < -50){
            this.x = 1250
        }
    }
}