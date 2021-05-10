import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    const gameState = {
      firstPlayer: {
        ...firstFighter,
        currentHealth: firstFighter.health,
        blocked: false,
        bar: document.getElementById('left-fighter-indicator'),
        keySequenceNumber: -1,
        prevCriticalHitTime: 0
      },
      secondPlayer: {
        ...secondFighter,
        currentHealth: secondFighter.health,
        blocked: false,
        bar: document.getElementById('right-fighter-indicator'),
        keySequenceNumber: -1,
        prevCriticalHitTime: 0
      }
    };
    document.addEventListener('keydown', (event) => {
      const keyPressed = event.code;

      // handle classical hit buttons
      if (keyPressed === controls.PlayerOneBlock) {
        gameState.firstPlayer.blocked = true;
      } else if (keyPressed === controls.PlayerTwoBlock) {
        gameState.secondPlayer.blocked = true;
      } else if (keyPressed === controls.PlayerOneAttack) {
        hitPlayer(gameState.firstPlayer, gameState.secondPlayer);
      } else if (keyPressed === controls.PlayerTwoAttack) {
        hitPlayer(gameState.secondPlayer, gameState.firstPlayer);
      }
      // handle sequence critical hit
      if (handleSequence(gameState.firstPlayer, keyPressed, controls.PlayerOneCriticalHitCombination)) {
        criticalHitPlayer(gameState.firstPlayer, gameState.secondPlayer);
      } else if (handleSequence(gameState.secondPlayer, keyPressed, controls.PlayerTwoCriticalHitCombination)) {
        criticalHitPlayer(gameState.secondPlayer, gameState.firstPlayer);
      }
      // handle win
      if (gameState.firstPlayer.currentHealth <= 0) {
        resolve(secondFighter);
      } else if (gameState.secondPlayer.currentHealth <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', (event) => {
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

export function handleSequence(player, pressedKey, sequence) {
  let keyIndex = sequence.indexOf(pressedKey);
  if (keyIndex !== -1 && keyIndex - player.keySequenceNumber === 1) {
    // means we matched previous keys
    if (keyIndex === sequence.length - 1) {
      return true;
    } else {
      player.keySequenceNumber = keyIndex;
    }
  } else {
    player.keySequenceNumber = -1;
  }
  return false;
}


export function hitPlayer(attacker, defender) {
  if (!attacker.blocked && !defender.blocked) {
    let damage = getDamage(attacker, defender);
    defender.currentHealth -= damage;
    defender.bar.style.width = (defender.currentHealth * 100) / defender.health + '%';
  }
}

export function criticalHitPlayer(attacker, defender) {
  let currentTime = Date.now();
  if (currentTime - attacker.prevCriticalHitTime > 10000) {
    let damage = getHitPower(attacker);
    defender.currentHealth -= 2 * damage;
    defender.bar.style.width = (defender.currentHealth * 100) / defender.health + '%';
    attacker.prevCriticalHitTime = currentTime;
  }
}
