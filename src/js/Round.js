class Round {
    constructor(attacker, defender) {
        this.attacker = attacker;
        this.defender = defender;
    }

    fight() {
        if (this.attacker.newBorn) {
            this.attacker.console('* ' + this.attacker.name + ' lvl ' + this.attacker.level + ' passe à l\'attaque !!');
            this.attacker.newBorn = false;
            //s.nbRound=0;

            setTimeout(function () {

                this.attacker.animate('bounceInUp', 1000, 0, 1000);
            }, 1000);

            return;
        }
        this.attacker.console('------ Round ' + 'X' + ' ------ \n');
        this.attacker.console('> J\'attaque ' + this.defender.name + ' !\n');

        // Vérification si le défendant a paré l'attaque
        if (this.defender.hasDodge) {
            this.attacker.console('> ' + this.defender.name + ' pare mon attaque...\n');
            this.defender.animate('flash', 1000, 0, 1000);//Animation d'esquive
        } else {
            let isCritical = this.attacker.hasCritical();
            this.defender.changeLife((isCritical) ? this.attacker.attack * 2 * -1 : this.attacker.attack * -1);// -1 gère la perte de points
            this.attacker.console('> J\'inflige ' + (isCritical ? this.attacker.attack * 2 + ' points de dégât Critiques à ' : this.attacker.attack + ' points de dégât à ') + this.defender.name + ' !!\n');
            //Animation perte de points de vie
            this.defender.animate(((isCritical) ? 'wobble' : 'shake'), 1000, 0, 1000);

            // Si le défendant est mort
            if (this.defender.hasDied) {
                this.defender.life = 0;

                this.defender.animate('hinge', 1000, 0, 1000);
                //Réinitialisation  des historiques de la console
                this.attacker.elConsole.innerText = false;
                this.defender.elConsole.innerText = false;

                this.attacker.console('> J\'ai vaincu ' + this.defender.name + '\n');
                switch (this.defender.isHero) {
                    case false:
                        this.defender.levelUp();// TODO faire aussi pour life, lifeStart,coupCritique, dodge, et attaque
                        this.defender.life = Math.round(this.defender.lifeStart * this.defender.coef);
                        this.defender.lifeStart = this.defender.life;
                        this.defender.coupCritique = (this.defender.coupCritique + 1 >= 100) ? 100 : this.defender.coupCritique + 1;
                        this.defender.dodge = (this.defender.dodge + 1 >= 100) ? 100 : Math.round(this.defender.dodge * this.defender.coef);
                        this.defender.attack = Math.round(this.defender.attack * this.defender.coef);
                        this.defender.newBorn = true;

                        let self = this;

                        setTimeout(function () {
                            if (confirm('Veux-tu prendre une potion qui te rendra 40% de tes points max : '
                                + self.attacker.lifeStart + '? \n Ou bien améliorer ton expérience ?')) {
                                self.attacker.life = (self.attacker.life + self.attacker.lifeStart * 0.4 > self.attacker.lifeStart) ? self.attacker.lifeStart : self.attacker.life + Math.round(self.attacker.lifeStart * 0.4);
                            } else {
                                self.attacker.experience += 1;
                                let stats = ['life', 'dodge', 'attack', 'critical'], coef = self.attacker.level - 1;

                                switch (stats[Math.floor(Math.random() * stats.length)]) {
                                    case 'life' :
                                        self.attacker.lifeStart += 10 * coef;
                                        self.attacker.life += 10;
                                        alert('Ta vie maximum a été augmentée de ' + 10 * coef / +' points, ce qui l\'amène a ' + p.lifeStart + ' points');
                                        break;
                                    case 'dodge' :
                                        self.attacker.dodge = (self.attacker.dodge + 1 >= 50) ? 50 : self.attacker.dodge + 1;
                                        alert('Ta parade a été augmentée de 1%, ce qui l\'amène a ' + self.attacker.dodge + '%');
                                        break;
                                    case 'attack' :
                                        self.attacker.attack += 2;
                                        alert('Ton attaque a été augmentée de 2 points, ce qui l\'amène a ' + self.attacker.attack + ' points');
                                        break;
                                    default :
                                        self.attacker.coupCritique = (self.attacker.critical + 1 >= 100) ? 100 : self.attacker.critical + 1;
                                        alert('Ton coup critique a été augmentée de 1 %, ce qui l\'amène a ' + self.attacker.critical + '%');

                                }
                            }

                            self.defender.animate('jackInTheBox', 1000, 0, 2000);
                        }, 1000);
                        break;
                    default:
                        alert('Vous êtes mort en affrontant ' + this.attacker.name + ' de niveau : ' + this.attacker.level);
                        window.location.reload();
                }
                return;
            }
        }
        this.attacker.console('------ Fin du Round ------ \n\n');
    }
}
