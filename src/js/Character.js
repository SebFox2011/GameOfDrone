class Character {
    constructor (name,lifeStart,dodge,attack,critical,level,coef,elCard,elName,elLife,
    elDodge,elAttack,elCritical,elLevel,elConsole,elExperience){
        this.name=name;
        this.lifeStart=lifeStart;
        this.life=lifeStart;
        this.dodge=dodge;
        this.attack=attack;
        this.critical=critical;
        this.level=level;
        this.coef=coef;
        this.newBorn=false;
        this.experience=1;
        this.elCard = document.getElementById(elCard);
        this.elName = document.getElementById(elName);
        this.elLife = document.getElementById(elLife);
        this.elDodge = document.getElementById(elDodge);
        this.elAttack = document.getElementById(elAttack);
        this.elCritical = document.getElementById(elCritical);
        this.elLevel = document.getElementById(elLevel);
        this.elConsole = document.getElementById(elConsole);
        this.elExperience=document.getElementById(elExperience);
    }

    updateUi(){
        //Mise à jour de l'UI
        this.elName.innerText=this.name;
        this.elLife.innerText=this.life;
        this.elDodge.innerText=this.dodge + '%';
        this.elAttack.innerText=this.attack;
        this.elExperience.innerText=this.experience;
        this.elCritical.innerText=this.critical;
        this.elLevel.innerText=this.level;
    }

    console(text){
        if(!text){
            this.elConsole.innerText = '';
            return;
        }
        this.elConsole.innerText +=text;
    }

    hasDodge(){
       return (Math.random() < this.dodge / 100);
    }

    hasCritical(){
        return (Math.random()* 100 < this.critical);
    }

    changeLife(hp){
        this.life+=hp;
    }

    hasDied (){
        return (this.life <= 0);
    }

    // Gestion de l'anination des personnages
    animate (anim,duration,delay,remove){

        let self=this;

        this.elCard.style.animationDelay = delay + 'ms';
        this.elCard.style.animationDuration = duration + 'ms';
        this.elCard.style.animationFillMode = 'both';
        this.elCard.style.zIndex = 100 ;
        this.elCard.classList.add(anim);

        setTimeout(function (){
            self.elCard.classList.remove(anim);
        },remove);
    }
 }