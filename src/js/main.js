// player
(function f() {
    let s,p,m,self;

    let game={

        settings: {
            player:{
                elCard:document.getElementById('player'),
                name: 'Sébastien',//prompt('Votre nom ?','Défaut'),
                elName:document.getElementById('pName'),

                life: Math.round(Math.random()*200)+100,//vie
                elLife:document.getElementById('pLife'),
                elProgressBar:document.getElementById('pBar'),
                lifeStart:0,

                dodge: Math.round(Math.random()*50),//parad
                elDodge:document.getElementById('pDodge'),

                attack: 10 + Math.round(Math.random()*15),//attaque
                elAttack:document.getElementById('pAttack'),

                experience:1,
                elExperience:document.getElementById('pExperience'),

                elConsole: document.getElementById('pconsole'),

                coupCritique:Math.round(Math.random()*10),
                elCoupCritique:document.getElementById('pCoupCritique')
            },

            monster:{
                elCard:document.getElementById('monster'),

                name: 'Monster',//prompt('Votre nom ?','Défaut'),
                elName:document.getElementById('mName'),

                coeff:1.2,
                baseMonsterLife:0,

                level:1,
                elLevel:document.getElementById('mLevel'),

                life: 75,//Math.round(Math.random()*200)+100,//vie
                elLife:document.getElementById('mLife'),
                elProgressBar:document.getElementById('mBar'),
                lifeStart:75,

                dodge: 5,//Math.round(Math.random()*50),//parad
                elDodge:document.getElementById('mDodge'),

                attack: 6,//Math.round(Math.random()*10),//attaque
                elAttack:document.getElementById('mAttack'),

                elConsole: document.getElementById('mconsole'),

                newBorn:false,

                coupCritique:5,
                elCoupCritique: document.getElementById('mCoupCritique')
            },
            nbRound:1,
            elTrigger: document.getElementById('trigger'),
            elRound:document.getElementById('nbRound'),
            //elBar:document.getElementById()
        },

        init:function () {
         self=this;// fera toujours référtence à l'objet player
         s=self.settings; //alias de self.setting sinon c'est long a taper
         p=s.player;
         m=s.monster;
         p.lifeStart=p.life;
         m.lifeStart=m.life;


        s.elTrigger.addEventListener('click',self.methods.play); //play () lance la fonction 1 première fois
        s.player.elProgressBar.style.width='100%';
        s.monster.elProgressBar.style.width='100%';

        self.methods.updateUI();
        },

        methods:{
            updateUI:function () {
                //Mise à jour du player
                p.elName.innerText=p.name;
                p.elLife.innerText=p.life;
                //p.elLifeBar.innerText=p.lifeBar;
                p.elDodge.innerText=p.dodge + '%';
                p.elAttack.innerText=p.attack;
                p.elExperience.innerText=p.experience;
                p.elCoupCritique.innerText=p.coupCritique;

                //Mise à jour du Monster
                m.elName.innerText=m.name;
                m.elLife.innerText=m.life;
                m.elDodge.innerText=m.dodge + '%';
                m.elAttack.innerText=m.attack;
                m.elLevel.innerText=m.level;
                m.elCoupCritique.innerText=m.coupCritique;

                s.elRound.innerText = s.nbRound;

                s.player.elProgressBar.style.width=p.life*100/p.lifeStart+'%';
                s.player.elProgressBar.innerText=Math.round(p.life*100/p.lifeStart)+' %';

                s.monster.elProgressBar.style.width=m.life*100/m.lifeStart+'%';
                s.monster.elProgressBar.innerText=Math.round(m.life*100/m.lifeStart)+' %';

            },

            animate: function(character,anim,duration,delay,remove){

                character.elCard.style.animationDelay = delay + 'ms';
                character.elCard.style.animationDuration = duration + 'ms';
                character.elCard.style.animationFillMode = 'both';
                character.elCard.style.zIndex = 100 ;
                character.elCard.classList.add(anim);

                setTimeout(function (){
                    character.elCard.classList.remove(anim);
                },remove);
            },

            play:function () {

                self.methods.round(p, m);
                self.methods.round(m, p);

                self.methods.updateUI();
                s.nbRound++;
            },
            
            round:function (attacker,defender) {

                if(attacker.newBorn) {
                    m.elConsole.innerText += '* ' + m.name + ' lvl ' +m.level+ ' passe à l\'attaque !!';
                    attacker.newBorn=false;
                    s.nbRound=0;

                    setTimeout(function (){

                        self.methods.animate(attacker,'bounceInUp',1000,0,1000);
                    },1000);

                    return;
                }

                // Attention, il faudra découper la chaine de caractère afin d'y placer une propriété (voir ligne 90 avec la propriété defender.name)
                attacker.elConsole.innerText += '------ Round '+ (s.nbRound) +' ------ \n';
                attacker.elConsole.innerText += '> J\'attaque ' + defender.name + ' !\n';

                // Vérification si le défendant a paré l'attaque
                if(Math.random() < defender.dodge / 100 ) {
                    self.methods.animate(defender,'jello',1000,0,1000);
                    attacker.elConsole.innerText += '> ' + defender.name + ' pare mon attaque...\n';
                } else { // Sinon le défendant prend des dégâts correspondant à l'attaque de l'attaquant
                    var isCritial =(Math.random()* 100 < defender.coupCritique);

                    defender.life-= (isCritial ? attacker.attack * 2 : attacker.attack);

                    attacker.elConsole.innerText += '> J\'inflige ' + (isCritial ?attacker.attack * 2  + ' points de dégât Critiques à ':attacker.attack  + ' points de dégât à ')  + defender.name + ' !!\n';


                    self.methods.animate(defender,((isCritial)?'flash':'shake'),1000,0,1000);

                    // Si le défendant est mort
                    if(defender.life <= 0) {
                        defender.life=0;
                        attacker.elConsole.innerText += '> J\'ai vaincu ' + defender.name + '\n';
                        self.methods.animate(defender,'hinge',1000,0,1000);
                        //Réinitialisation  des historiques de la console
                        attacker.elConsole.innerText='';
                        defender.elConsole.innerText='';

                        attacker.elConsole.innerText='J ai vaincu Alien de niveau ' + m.level;

                        switch (defender) {
                            case m: m.level ++;
                                    m.life = Math.round(m.lifeStart * m.coeff);
                                    m.lifeStart = m.life;
                                    m.coupCritique=(m.coupCritique + 1 >= 100) ? 100 : m.coupCritique +1;
                                    m.dodge=(m.dodge + 1 >= 100) ? 100 : Math.round(m.dodge * m.coeff);
                                    m.attack = Math.round(m.attack * m.coeff);

                                    if(confirm('Veux-tu prendre une potion qui te rendra 25% de tes points max : '
                                        + p.lifeStart+'? \n Ou bien améliorer ton expérience ?')){
                                        p.life=(p.life+p.lifeStart*0.25 > p.lifeStart ) ? p.lifeStart : p.life +Math.round(p.lifeStart*0.25);
                                    }

                                    else{
                                        p.experience += 1;
                                        let stats = ['life','dodge','attack','critical'];

                                        switch(stats[Math.floor(Math.random()*stats.length)])
                                        {
                                            case 'life' :
                                                p.lifeStart += 10 * m.level/2;
                                                p.life += 10;
                                                alert('Ta vie maximum a été augmentée de '+10 * m.level/ +' points, ce qui l\'amène a '+p.lifeStart + ' points');
                                                break;
                                            case 'dodge' :
                                                p.dodge=(p.dodge + 1 >= 50) ? 50 : p.dodge +1;
                                                alert('Ta parade a été augmentée de 1%, ce qui l\'amène a '+p.dodge + '%');
                                                break;
                                            case 'attack' :
                                                p.attack += 2;
                                                alert('Ton attaque a été augmentée de 2 points, ce qui l\'amène a '+p.attack + ' points');
                                                break;
                                            default :
                                                p.coupCritique=(p.coupCritique + 1 >= 100) ? 100 : p.coupCritique +1;
                                                alert('Ton coup critique a été augmentée de 1 %, ce qui l\'amène a '+p.coupCritique + '%');

                                        }
                                    }
                                    
                                    //p.life += p.experience * 20;
                                    //p.lifeStart=p.life;
                                    m.newBorn=true;
                                    m.coupCritique =  Math.round(m.coupCritique * m.coeff);

                            break;

                            default:
                                alert('Vous etes mort ! en affrontant ' + attacker.name +' de niveau : '+ m.level);
                                window.location.reload();

                        }
                        return;
                    }
                }
                attacker.elConsole.innerText += '------ Fin du Round ------ \n\n';
            }
        }
    };
    game.init();

})();