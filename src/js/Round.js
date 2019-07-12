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
            this.attacker.elConsole.innerText += '> ' + defender.name + ' pare mon attaque...\n';
            this.defender.animate('flash', 1000, 0, 1000);//Animation d'esquive
        } else {
            let isCritical = this.attacker.hasCritical();
            this.defender.changeLife((isCritical) ? attacker.attack * 2 * -1 : attacker.attack * -1);// -1 gère la perte de points
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
                // TODO switch
            }
        }
        this.attacker.console('------ Fin du Round ------ \n\n');
    }
}
