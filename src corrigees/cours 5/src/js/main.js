(function () {
  let s, p, m, self;

  let game = {

    settings: {
      potion: 0.4,
      elTrigger: document.getElementById('trigger'),

      player: new Character(true, prompt('Ton nom héro ?', 'Hercule'), 100 + Math.round(Math.random()*200), Math.round(Math.random()*50), 10 + Math.round(Math.random()*15), Math.round(Math.random()*10), 1, 0.4, 'player', 'pName', 'pLife', 'pDodge', 'pAttack', 'pCritical', 'pConsole', 'pLevel'),

      monster: new Character(false, 'Alien', 75, 5, 5, 5, 1, 1.2, 'monster', 'mName', 'mLife', 'mDodge', 'mAttack', 'mCritical', 'mConsole', 'mLevel')
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
        p.updateUI();
        // Mise à jour du Monster
        m.updateUI();
      },

      play: function() {
        let turn1 = new Round(p, m);
        let turn2 = new Round(m, p);

        turn1.fight();
        turn2.fight();

        self.methods.updateUI();
      }
    }
  };

  game.init();
})();