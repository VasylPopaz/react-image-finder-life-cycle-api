import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ButtonList, ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {
    clickedButton: null,
  };

  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleEscapePress);
    window.addEventListener('keydown', this.handleNextImg);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleEscapePress);
    window.removeEventListener('keydown', this.handleNextImg);
  }

  handleEscapePress = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) this.props.onClose();
  };

  handleNextImg = event => {
    const { id } = this.props.modalContent;
    if (event.code === 'ArrowRight' || event.target.textContent === 'Next')
      this.props.handleNextPhoto(id);
    if (event.code === 'ArrowLeft' || event.target.textContent === 'Prev')
      this.props.handlePrevPhoto(id);
  };

  render() {
    const { alt_description, urls } = this.props.modalContent;
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={urls.full} alt={alt_description} />
        </ModalContent>
        <ButtonList>
          <li>
            <button onClick={this.handleNextImg}>Prev</button>
          </li>
          <li>
            <button onClick={this.handleNextImg}>Next</button>
          </li>
        </ButtonList>
      </ModalBackdrop>,
      modalRoot
    );
  }
}
