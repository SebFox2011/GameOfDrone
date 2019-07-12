// player
(function f() {
    let s, p, m, self;

    let game = {

        settings: {
            elTrigger: document.getElementById('trigger'),
            elRound: document.getElementById('nbRound'),

            player: new Character(
                true,
                prompt('Ton nom héro ?', 'Hercule'),
                //'Sébastien',//prompt('Ton nom héro ?', 'Hercule'),
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
                'pExperience',
                'pBar'),

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
                'mExperience',
                'mBar'),
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
                s.elRound.innerText = 0;
                //s.elRound.innerText = s.nbRound;
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