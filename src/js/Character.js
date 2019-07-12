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

 }