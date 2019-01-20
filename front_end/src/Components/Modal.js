import React from 'react';
import '../css/modal.scss';

export const Modal = ({ handleClose, show, button, children }) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    const hideButton = button ? 'button display-block close-btn' : 'display-none';
    const container = document.createElement('div');
    
    document.body.appendChild(container);
    console.log(button);
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          <button className={hideButton} onClick={handleClose}>Close</button>
        </section>
      </div>
    );
  }

  export default Modal;