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
        life: 100 + Math.round(Math.random()*200),
        elLife: document.getElementById('pLife'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Parade
        dodge: Math.round(Math.random()*50),
        elDodge: document.getElementById('pDodge'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Attaque
        attack: 10 + Math.round(Math.random()*15),
        elAttack: document.getElementById('pAttack'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Console
        elConsole: document.getElementById('pConsole'),
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
        life: 75,
        elLife: document.getElementById('mLife'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Parade
        dodge: 5,
        elDodge: document.getElementById('mDodge'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Attaque
        attack: 5,
        elAttack: document.getElementById('mAttack'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Console
        elConsole: document.getElementById('mConsole'),
        newBorn: false
      },

      elTrigger: document.getElementById('trigger'),

      round: 1,
      elRound: document.getElementById('nbRound')
    },

    init: function() {
      self = this; // Fera toujours référence à l'objet player
      s = self.settings; // Alias de self.settings parce que sinon c'est long à taper
      p = s.player; // Alias de self.settings.player parce que sinon c'est long à taper
      m = s.monster; // Alias de self.settings.monster parce que sinon c'est long à taper
      
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

        // Mise à jour du Monster
        m.elName.innerText = m.name;
        m.elLevel.innerText = m.level;
        m.elLife.innerText = m.life;
        m.elDodge.innerText = m.dodge + '%';
        m.elAttack.innerText = m.attack;

        s.elRound.innerText = s.round;
      },

      animate: function(character, anim, duration) {
        character.elCard.style.animationDuration = duration + 'ms';
        character.elCard.classList.add(anim);

        setTimeout(function() {
          character.elCard.classList.remove(anim);
        }, duration
        );
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
        if(Math.random() < defender.dodge / 100 ) {
          attacker.elConsole.innerText += '> ' + defender.name + ' pare mon attaque...\n';

        } else { // Sinon le défendant prend des dégâts correspondant à l'attaque de l'attaquant
          defender.life -= attacker.attack;
          attacker.elConsole.innerText += '> J\'inflige ' + attacker.attack + ' points de dégât à ' + defender.name + ' !!\n';
          // Animation perte de points de vie
          self.methods.animate(defender, 'shake', 1000, 0, 1200);

          // Si le défendant est mort
          if(defender.life <= 0) {
            // Animation de mort
            self.methods.animate(defender, 'hinge', 1000);

            // Vider les historiques
            p.elConsole.innerText = '';
            m.elConsole.innerText = '';

            attacker.elConsole.innerText += '* J\'ai vaincu ' + defender.name + ' de niveau ' + defender.level + ' *\n\n';

            switch(defender) {
              case m : 
                // Incrémenter le level du monstre
                ++m.level;
                // Remettre la vie du monstre à 75 et la mulptiplier par la propriété coef de monster (m)
                m.life = Math.round(75 * m.coef);
                // Multiplier le dodge du monstre par le coef de montser (m)
                m.dodge = Math.round(m.dodge * m.coef);
                // Multiplier le attack du monstre par le coef de monster (m)
                m.attack = Math.round(m.attack * m.coef);
                m.newBorn = true;
                // Animation de prochain monstre
                self.methods.animate(defender, 'fadeInUp', 1000);
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