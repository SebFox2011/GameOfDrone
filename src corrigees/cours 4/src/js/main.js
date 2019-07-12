(function () {
  let s, p, m, self;

  let game = {

    settings: {
      player: {
        // Carte
        elCard: document.getElementById('player'),
        // Nom
        name: 'Matthieu', //prompt('Votre nom ?', 'Défaut'),
        elName: document.getElementById('pName'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Vie
        baseLife: 100 + Math.round(Math.random()*200),
        life: 0,
        elLife: document.getElementById('pLife'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Parade
        dodge: Math.round(Math.random()*50),
        elDodge: document.getElementById('pDodge'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Attaque
        attack: 10 + Math.round(Math.random()*15),
        elAttack: document.getElementById('pAttack'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Console
        elConsole: document.getElementById('pConsole'),
        // Coup critique
        critical: Math.round(Math.random()*10),
        elCritical: document.getElementById('pCritical') // préfixé par el pour se souvenir que c'est un élément HTML
      },

      monster: {
        // Carte
        elCard: document.getElementById('monster'),
        // Coefficient de leveling
        coef: 1.2,
        // Nom
        name: 'Alien', //prompt('Votre adversaire ?', 'Défaut'),
        elName: document.getElementById('mName'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Niveau
        level: 1,
        elLevel: document.getElementById('mLevel'),
        // Vie
        baseLife: 75,
        life: 0,
        elLife: document.getElementById('mLife'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Parade
        dodge: 5,
        elDodge: document.getElementById('mDodge'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Attaque
        attack: 5,
        elAttack: document.getElementById('mAttack'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Console
        elConsole: document.getElementById('mConsole'),
        newBorn: false,
        // Critique
        critical: 5,
        elCritical: document.getElementById('mCritical') // préfixé par el pour se souvenir que c'est un élément HTML
      },

      potion: 0.4,

      elTrigger: document.getElementById('trigger'),

      round: 1,
      elRound: document.getElementById('nbRound')
    },

    init: function() {
      self = this; // Fera toujours référence à l'objet player
      s = self.settings; // Alias de self.settings parce que sinon c'est long à taper
      p = s.player; // Alias de self.settings.player parce que sinon c'est long à taper
      m = s.monster; // Alias de self.settings.monster parce que sinon c'est long à taper

      p.life = p.baseLife;
      m.life = m.baseLife;

      self.methods.updateUI();

      s.elTrigger.addEventListener('click', self.methods.play);
    },

    methods: {
      updateUI: function () {
        // Mise à jour du Player
        p.elName.innerText = p.name;
        p.elLife.innerText = p.life;
        p.elDodge.innerText = p.dodge + '%';
        p.elAttack.innerText = p.attack;
        p.elCritical.innerText = p.critical + '%';

        // Mise à jour du Monster
        m.elName.innerText = m.name;
        m.elLevel.innerText = m.level;
        m.elLife.innerText = m.life;
        m.elDodge.innerText = m.dodge + '%';
        m.elAttack.innerText = m.attack;
        m.elCritical.innerText = m.critical + '%';

        s.elRound.innerText = s.round;
      },

      animate: function(character, anim, duration, delay, remove) {
        character.elCard.style.animationDuration = duration + 'ms';
        character.elCard.style.animationDelay = delay + 'ms';
        character.elCard.style.animationFillMode = 'both';
        character.elCard.style.zIndex = 100;
        character.elCard.classList.add(anim);

        setTimeout(function() {
          character.elCard.classList.remove(anim);
        }, remove);
      },

      play: function() {
        self.methods.round(p, m);
        self.methods.round(m, p);

        self.methods.updateUI();

        if(s.round === 'start') {
          s.round = 1;
        }
        else {
          ++s.round;
        }
      },

      round: function(attacker, defender) {
        if(attacker.newBorn) {
          m.elConsole.innerText += '* ' + m.name + ' lvl ' + m.level + ' passe à l\'attaque !!  *\n\n';
          attacker.newBorn = false;
          return;
        }

        attacker.elConsole.innerText += '------ Round ' + s.round + ' ------ \n';
        attacker.elConsole.innerText += '> J\'attaque ' + defender.name + ' !\n';

        // Vérification si le défendant a paré l'attaque
        if(Math.random() < defender.dodge / 100) {
          attacker.elConsole.innerText += '> ' + defender.name + ' pare mon attaque...\n';
          // Animation perte de points de vie
          self.methods.animate(defender, 'flash', 1000, 0, 1000);
        } else { // Sinon le défendant prend des dégâts correspondant à l'attaque de l'attaquant
          let isCritical = (Math.random() < attacker.critical / 100);
          defender.life -= (isCritical) ? attacker.attack * 2 : attacker.attack;
          attacker.elConsole.innerText += '> J\'inflige ' + ((isCritical) ? attacker.attack * 2 + 'pts de dégât CRIT. à ' : attacker.attack + 'pts de dégât à ' ) + defender.name + ' !!\n';

          // Animation perte de points de vie
          // TODO créer un ternaire pour changer l'animation si isCritical est vrai, sinon garder l'animation shake
          self.methods.animate(defender, 'shake', 1000, 0, 1000);

          // Si le défendant est mort
          if(defender.life <= 0) {
            // Animation de mort
            self.methods.animate(defender, 'hinge', 1000, 0, 1000);

            // Vider les historiques
            p.elConsole.innerText = '';
            m.elConsole.innerText = '';

            attacker.elConsole.innerText += '* J\'ai vaincu ' + defender.name + ' de niveau ' + defender.level + ' *\n\n';

            switch(defender) {
              case m :
                // Incrémenter le level du monstre
                ++m.level;
                // Augmentation de la vie du monstre
                m.baseLife = Math.round(m.baseLife * m.coef);
                m.life = m.baseLife;
                // Multiplier le dodge du monstre par le coef de montser (m)
                m.dodge = (Math.round(m.dodge * m.coef) >= 50)? 50 : Math.round(m.dodge * m.coef);
                // Multiplier le attack du monstre par le coef de monster (m)
                m.attack = Math.round(m.attack * m.coef);
                // Multiplier le critical du monstre par le coef de monster (m)
                m.critical = (Math.round(m.critical * m.coef) >= 100)? 100 : Math.round(m.critical * m.coef);
                // Spécifie que le monstre vient d'arriver et qu'il ne peut pas attaquer tout de suite
                m.newBorn = true;

                // Animation de prochain monstre
                setTimeout(function() {
                  if(confirm('Veux-tu prendre une potion qui te rendra ' + s.potion * 100 + '% de tes points de vie maximum (' + p.baseLife + ' points).\nSi tu ne le souhaites pas, une de tes caractéristiques sera augmentée de façon aléatoire.')) {
                    p.life = (p.life + p.baseLife * s.potion >= p.baseLife)? p.baseLife : Math.round(p.life + p.baseLife * s.potion);
                  } else {
                    let stats = ['life', 'dodge', 'attack', 'critical'];

                    switch (stats[Math.floor(Math.random() * stats.length)]) {
                      case 'life':
                        p.baseLife += 10;
                        p.life += 10;
                        alert('Ta vie maximum a été augmentée de 10 points ce qui l\'amène à ' + p.baseLife + ' points !');
                        break;
                      case 'dodge':
                        p.dodge = (p.dodge + 1 >= 50)? 50 : p.dodge + 1;
                        alert('Ta parade a été augmentée de 1% ce qui l\'amène à ' + p.dodge + '% !');
                        break;
                      case 'attack':
                        p.attack += 2;
                        alert('Ton attaque a été augmentée de 2 points ce qui l\'amène à ' + p.attack + ' points !');
                        break;
                      default:
                        p.critical = (p.critical + 1 >= 100)? 100 : p.critical + 1;
                        alert('Ton taux de coup critique a été augmentée de 1% ce qui l\'amène à ' + p.critical + '% !');
                    }
                  }

                  self.methods.animate(defender, 'jackInTheBox', 1000, 0, 2000);
                  self.methods.updateUI();
                }, 1000);

                break;

              default:
                alert('Vous êtes mort sur le champ d\'honneur en affrontant ' + m.name + ' de niveau ' + m.level);
                window.location.reload();
            }
            // Réinitialiser la propriété round à 0 contenu dans settings (s)
            s.round = 'start';
            return;
          }
        }

        attacker.elConsole.innerText += '------ Fin du Round ------ \n\n';
      }
    }
  };

  game.init();
})();