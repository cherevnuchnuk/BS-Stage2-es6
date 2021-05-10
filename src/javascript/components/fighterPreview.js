import { createElement } from '../helpers/domHelper';
import { showModal } from './modal/modal';
import { createInfoBar } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });


  if (fighter) {
    const fighterInfo = createElement({
      tagName: 'div',
      className: 'fighter-container'
    });
    const header = createInfoBar({
      tagName: 'div',
      className: 'fighter-container___header',
      text: fighter.name
    });
    const health = createInfoBar({
      tagName: 'div',
      className: 'fighter-container___element',
      text: 'Health : ' + fighter.health
    });
    const attack = createInfoBar({
      tagName: 'div',
      className: 'fighter-container___element',
      text: 'Attack : ' + fighter.attack });
    const defense = createInfoBar({
      tagName: 'div',
      className: 'fighter-container___element',
      text: 'Defense : ' + fighter.defense });

    fighterInfo.append(header, health, attack, defense);
    fighterElement.append(fighterInfo)
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;

  const attributes = {
    src: source,
    title: name,
    alt: name
  };

  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
