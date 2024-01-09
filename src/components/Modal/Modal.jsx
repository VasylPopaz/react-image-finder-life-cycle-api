import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleEscapePress);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.handleEscapePress);
  }

  handleEscapePress = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) this.props.onClose();
  };

  render() {
    return createPortal(
      <ModalBackdrop onClick={this.handleBackdropClick}>
        <ModalContent>
          <img src={this.props.url} alt="" />
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}
