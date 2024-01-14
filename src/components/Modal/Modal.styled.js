import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;
export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70%;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
`;
export const ButtonList = styled.ul`
  display: flex;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  gap: calc(100vw - 80vw);

  button {
    padding: 10px 20px;
    border-radius: 30px;
    background-color: #7357b3;
    color: white;
    font-size: 16px;
    &:hover {
      background-color: #5a4290;
    }
  }
`;
