import { showModal } from './modal';
import { createElement, createInfoBar } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  const title = fighter.name + ' has won';
  const bodyElement = createElement({ tagName: 'div', className: 'modal-body' });
  const bodyContent = createInfoBar({ tagName: 'div', className: 'modal-element', text: 'Wanna play again?' });

  const reloadCallback = () => {
    window.location.reload();
  };

  const reloadButton = createInfoBar({ tagName: 'button', className: 'modal-button', text: 'Play again'});
  reloadButton.onclick = reloadCallback;

  bodyElement.append(bodyContent, reloadButton);

  const attributes = {
    title,
    bodyElement,
    onClose: reloadCallback
  };
  showModal(attributes);
}
