// player
(function f() {
    let s, p, m, self;

    let game = {

        settings: {
            elTrigger: document.getElementById('trigger'),
            elRound: document.getElementById('nbRound'),

            player: new Character(
                true,
                'Sébastien',//prompt('Ton nom héro ?', 'Hercule'),
                100 + Math.round(Math.random() * 200),
                Math.round(Math.random() * 50),
                10 + Math.round(Math.random() * 15),
                Math.round(Math.random() * 10),
                1,
                1.2,
                'player',
                'pName',
                'pLife',
                'pDodge',
                'pAttack',
                'pCoupCritique',
                'pLevel',
                'pConsole',
                'pExperience'),

            monster: new Character(
                false,
                'Monster',
                75,
                5,
                6,
                5,
                1,
                1.2,
                'monster',
                'mName',
                'mLife',
                'mDodge',
                'mAttack',
                'mCoupCritique',
                'mLevel',
                'mConsole',
                'mExperience'),
        },

        init: function () {
            self = this;// fera toujours référtence à l'objet player
            s = self.settings; //alias de self.setting sinon c'est long a taper
            p = s.player;
            m = s.monster;


            s.elTrigger.addEventListener('click', self.methods.play); //play () lance la fonction 1 première fois
            //s.player.elProgressBar.style.width='100%';
            //s.monster.elProgressBar.style.width='100%';

            self.methods.updateUI();
        },

        methods: {
            updateUI: function () {
                //Mise à jour du player et du monster
                p.updateUi();
                m.updateUi();

                s.elRound.innerText = s.nbRound;
                //Mise à jour des 2 progress bar de vie
                //s.player.elProgressBar.style.width=player.life*100/player.lifeStart+'%';
                //s.player.elProgressBar.innerText=Math.round(player.life*100/player.lifeStart)+' %';

                //s.monster.elProgressBar.style.width=m.life*100/m.lifeStart+'%';
                //s.monster.elProgressBar.innerText=Math.round(m.life*100/m.lifeStart)+' %';
            },

            play: function () {
                let turn1 = new Round(p,m);
                let turn2 =new Round(m,p);


                turn1.fight();
                turn2.fight();

                self.methods.updateUI();

            },
        }
    };
    game.init();
})();