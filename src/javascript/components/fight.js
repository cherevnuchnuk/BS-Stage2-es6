import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const gameState = {
      firstPlayer: {
        ...firstFighter,
        currentHealth: firstFighter.health,
        blocked: false,
        bar: document.getElementById("left-fighter-indicator")
      },
      secondPlayer: {
        ...secondFighter,
        currentHealth: secondFighter.health,
        blocked: false,
        bar: document.getElementById("right-fighter-indicator")
      }
    };
    document.addEventListener("keydown", (event) => {
      const keyPressed = event.code;
      console.log(gameState)
      if (keyPressed === controls.PlayerOneBlock) {
        gameState.firstPlayer.blocked = true;
      } else if (keyPressed === controls.PlayerTwoBlock) {
        gameState.secondPlayer.blocked = true;
      } else if (keyPressed === controls.PlayerOneAttack) {
        hitPlayer(gameState.firstPlayer, gameState.secondPlayer);
      } else if (keyPressed === controls.PlayerOneAttack) {
        hitPlayer(gameState.secondPlayer, gameState.firstPlayer);
      }
      if (gameState.firstPlayer.currentHealth <= 0) {
        resolve(secondFighter);
      } else if (gameState.secondPlayer.currentHealth <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener("keyup", (event) => {
      const keyPressed = event.code;
      if (keyPressed === controls.PlayerOneBlock) {
        gameState.firstPlayer.blocked = false;
      } else if (keyPressed === controls.PlayerTwoBlock) {
        gameState.secondPlayer.blocked = false;
      }
    });

  });
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return hitPower > blockPower ? hitPower - blockPower : 0;
}

export function getHitPower(fighter) {
  let criticalHitChance = Math.random() + 1;
  const { attack } = fighter;
  return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  let dodgeChance = Math.random() + 1;
  const { defense } = fighter;
  return defense * dodgeChance;
}


export function hitPlayer(attacker, defender) {
  if (!attacker.blocked && !defender.blocked) {
    let damage = getDamage(attacker, defender);
    defender.currentHealth -= damage;
    defender.bar.style.width = (defender.currentHealth * 100) / defender.health + '%';
  }
}
