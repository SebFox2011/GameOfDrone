class Character {
  constructor(isHero, name, baseLife, dodge, attack, critical, level, coef, elCard, elName, elLife, elDodge, elAttack, elCritical, elConsole, elLevel) {
    this.isHero = isHero;
    this.name = name;
    this.baseLife = baseLife;
    this.life = this.baseLife;
    this.dodge = dodge;
    this.attack = attack;
    this.critical = critical;
    this.level = level;
    this.coef = coef;
    this.reBorn = false;
    this.elCard = document.getElementById(elCard);
    this.elName = document.getElementById(elName);
    this.elLife = document.getElementById(elLife);
    this.elDodge = document.getElementById(elDodge);
    this.elAttack = document.getElementById(elAttack);
    this.elCritical = document.getElementById(elCritical);
    this.elLevel = document.getElementById(elLevel);
    this.elConsole = document.getElementById(elConsole);
  }
  
  updateUI() {
    // Mise à jour de l'UI
    this.elName.innerText = this.name;
    this.elLife.innerText = this.life;
    this.elDodge.innerText = this.dodge + '%';
    this.elAttack.innerText = this.attack;
    this.elCritical.innerText = this.critical + '%';
    this.elLevel.innerText = this.level;
  }

  console(text) {
    if(!text) {
      this.elConsole.innerText = '';
      return;
    }

    this.elConsole.innerText += text;
  }

  animate (anim, duration, delay, remove) {
    let self = this;

    this.elCard.style.animationDuration = duration + 'ms';
    this.elCard.style.animationDelay = delay + 'ms';
    this.elCard.style.animationFillMode = 'both';
    this.elCard.style.zIndex = 100;
    this.elCard.classList.add(anim);

    setTimeout(function() {
      self.elCard.classList.remove(anim);
    }, remove);
  }

  changeLife(hp) {
    this.life += hp;
  }

  levelUp() {
    ++this.level;
  }

  hasDied() {
    return (this.life <= 0);
  }

  hasDodge() {
    return (Math.random() < this.dodge / 100);
  }

  hasCritical() {
    return (Math.random() < this.critical / 100);
  }
  
}