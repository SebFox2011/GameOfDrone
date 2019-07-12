// PLAYER
(function () {
  let s, p, m, self;

  let game = {

    settings: {
      player: {
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
      },

      monster: {
        // Nom
        name: 'Alien', //prompt('Votre adversaire ?', 'Défaut'),
        elName: document.getElementById('mName'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Vie
        life: 75,
        elLife: document.getElementById('mLife'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Parade
        dodge: 5,
        elDodge: document.getElementById('mDodge'), // préfixé par el pour se souvenir que c'est un élément HTML
        // Attaque
        attack: 5,
        elAttack: document.getElementById('mAttack'), // préfixé par el pour se souvenir que c'est un élément HTML
      },

      elTrigger: document.getElementById('trigger'),
      elConsole: document.getElementById('console')
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
        m.elLife.innerText = m.life;
        m.elDodge.innerText = m.dodge + '%';
        m.elAttack.innerText = m.attack;
      },

      play: function() {
        s.elConsole.innerText = '> ' + p.name + ' attaque ' + m.name + '\n';

        // Monstre
        if(Math.random() < m.dodge / 100 ) {
          s.elConsole.innerText += '> ' + m.name + ' évite l\'attaque de ' + p.name + '\n';
        } else {
          m.life -= p.attack;
          s.elConsole.innerText += '> ' + m.name + ' prend ' + p.attack + ' points de dégât \n';

          if(m.life <= 0) {
            s.elConsole.innerText += '> ' + m.name + ' est mort sous les coups de ' + p.name + '\n';
            m.life = 0;
          }
        }

        s.elConsole.innerText += '> ' + m.name + ' attaque ' + p.name + '\n';

        if(Math.random() < p.dodge / 100 ) {
          s.elConsole.innerText += '> ' + p.name + ' évite l\'attaque de ' + m.name + '\n';
        } else {
          p.life -= m.attack;
          s.elConsole.innerText += '> ' + p.name + ' prend ' + m.attack + ' points de dégât \n';

          if(p.life <= 0) {
            s.elConsole.innerText += '> ' + p.name + ' est mort sous les coups de ' + m.name + '\n';
            p.life = 0;
          }
        }

        self.methods.updateUI();
      }
    }
  };

  game.init();
})();