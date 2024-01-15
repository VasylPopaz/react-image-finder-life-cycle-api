import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ButtonList, ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleBackdropClick = event => {
    const { onClose } = this.props;
    if (event.target === event.currentTarget) onClose();
  };

  handleKeydown = event => {
    const { onClose, handleNextPhoto, handlePrevPhoto, modalContent } =
      this.props;
    const { id } = modalContent;
    const { code } = event;

    if (code === 'Escape') onClose();
    if (code === 'ArrowRight') handleNextPhoto(id);
    if (code === 'ArrowLeft') handlePrevPhoto(id);
  };

  handleSwitchImg = event => {
    const { handleNextPhoto, handlePrevPhoto, modalContent } = this.props;
    const { id } = modalContent;
    const { textContent } = event.target;

    if (textContent === 'Next >') handleNextPhoto(id);
    if (textContent === '< Prev') handlePrevPhoto(id);
  };

  render() {
    const { alt_description, urls } = this.props.modalContent;
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={urls.full} alt={alt_description} />
          <ButtonList>
            <li>
              <button onClick={this.handleSwitchImg}>&lt; Prev</button>
            </li>
            <li>
              <button onClick={this.handleSwitchImg}>Next &gt;</button>
            </li>
          </ButtonList>
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}
