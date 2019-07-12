class Round {
  constructor(a, d) {
    this.a = a;
    this.d = d;
  }

  fight() {
    if(this.a.reBorn) {
      this.a.console('* ' + this.a.name + ' lvl ' + this.a.level + ' passe à l\'attaque !!  *\n\n');
      this.a.reBorn = false;
      return;
    }

    this.a.console('------ Round X ------ \n');
    this.a.console('> J\'attaque ' + this.d.name + ' !\n');

    // Vérification si le défendant a paré l'attaque
    if(this.d.hasDodge()) {
      this.a.console('> ' + this.d.name + ' pare mon attaque...\n');
      // Animation d'esquive
      this.d.animate('flash', 1000, 0, 1000);
    } else {
      let isCritical = this.a.hasCritical();
      this.d.changeLife((isCritical) ? this.a.attack * 2 * -1 : this.a.attack * -1);
      this.a.console('> J\'inflige ' + ((isCritical) ? this.a.attack * 2 + 'pts de dégât CRIT. à ' : this.a.attack + 'pts de dégât à ' ) + this.d.name + ' !!\n');
      // Animation perte de points de vie
      this.d.animate(((isCritical) ? 'wobble' : 'shake'), 1000, 0, 1000);

      // Si le défendant est mort
      if(this.d.hasDied()) {
        // Animation de mort
        this.d.animate('hinge', 1000, 0, 1000);

        // Vider les historiques
        this.a.console(false);
        this.d.console(false);

        this.a.console('* J\'ai vaincu ' + this.d.name + ' de niveau ' + this.d.level + ' *\n\n');

        switch(this.d.isHero) {
          case false : 
            // Incrémenter le level du monstre
            this.d.levelUp(); // Faudrait bien entendu faire la même chose pour les propriétés ci-dessous
            // Augmentation de la vie du monstre
            this.d.baseLife = Math.round(this.d.baseLife * this.d.coef);
            this.d.life = this.d.baseLife;
            // Multiplier le dodge du monstre par le coef de montser (m)
            this.d.dodge = (Math.round(this.d.dodge * this.d.coef) >= 50)? 50 : Math.round(this.d.dodge * this.d.coef);
            // Multiplier le attack du monstre par le coef de monster (m)
            this.d.attack = Math.round(this.d.attack * this.d.coef);
            // Multiplier le critical du monstre par le coef de monster (m)
            this.d.critical = (Math.round(this.d.critical * this.d.coef) >= 100)? 100 : Math.round(this.d.critical * this.d.coef);
            // Spécifie que le monstre vient d'arriver et qu'il ne peut pas attaquer tout de suite
            this.d.reBorn = true;

            let self = this;
            // Animation de prochain monstre
            setTimeout(function() {
              if(confirm('Veux-tu prendre une potion qui te rendra ' + self.a.coef * 100 + '% de tes points de vie maximum (' + self.a.baseLife + ' points).\nSi tu ne le souhaites pas, une de tes caractéristiques sera augmentée de façon aléatoire.')) {
                self.a.life = (self.a.life + self.a.baseLife * self.a.coef >= self.a.baseLife)? self.a.baseLife : Math.round(self.a.life + self.a.baseLife * self.a.coef);
              } else {
                let stats = ['life', 'dodge', 'attack', 'critical'],
                    coef = self.d.level - 1;

                switch (stats[Math.floor(Math.random() * stats.length)]) {
                  case 'life':
                    self.a.baseLife += 10 * coef;
                    self.a.life += 10* coef;
                    alert('Ta vie maximum a été augmentée de ' + 10* coef + ' points ce qui l\'amène à ' + self.a.baseLife + ' points !');
                    break;
                  case 'dodge':
                    self.a.dodge = (self.a.dodge + 1* coef >= 50)? 50 : self.a.dodge + 1* coef;
                    alert('Ta parade a été augmentée de ' + 1* coef + '% ce qui l\'amène à ' + self.a.dodge + '% !');
                    break;
                  case 'attack':
                    self.a.attack += 2* coef;
                    alert('Ton attaque a été augmentée de ' + 2* coef + ' points ce qui l\'amène à ' + self.a.attack + ' points !');
                    break;
                  default:
                    self.a.critical = (self.a.critical + 1* coef >= 100)? 100 : self.a.critical + 1* coef;
                    alert('Ton taux de coup critique a été augmentée de ' +  1 * coef + '% ce qui l\'amène à ' + self.a.critical + '% !');
                }
              }

              self.d.animate('jackInTheBox', 1000, 0, 2000);
              self.a.updateUI();
              self.d.updateUI();
            }, 1000);
            break;

          default:
            alert('Vous êtes mort sur le champ d\'honneur en affrontant ' + this.a.name + ' de niveau ' + this.a.level);
            window.location.reload();
        }

        return;
      } 
    }

    this.a.console('------ Fin du Round ------ \n\n');
  }
}