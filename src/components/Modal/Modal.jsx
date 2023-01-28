// import { createPortal } from 'react-dom';
import { Component } from 'react';

import styles from './modal.module.scss';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = event => {
    if (event.keyCode === 27) {
      this.handleCloseModal();
    }
  };

  onModalOverlayClick = () => {
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.props.onModalClose();
    document.removeEventListener('keydown', this.onKeyPress);
  };

  render() {
    const { imgAlt, imgLargeSrc } = this.props;

    return (
      <>
        <div
          id="overlay"
          onClick={this.onModalOverlayClick}
          className={styles.overlay}
        ></div>
        <div>
          <img className={styles.modal} src={imgLargeSrc} alt={imgAlt} />
        </div>
      </>
    );
  }
}
export default Modal;
