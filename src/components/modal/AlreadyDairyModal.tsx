import React from 'react';
import styled from 'styled-components';
import CloseIcon from '../../assets/images/close2.png';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 348px;
  height: 174px; 
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  text-align: center;
  position: absolute;
  top: 60px;
  font-size: 19px;
  margin-top: -5px;
  line-height: 25px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 110px;
  gap: 15px;
`;

const Button = styled.button`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  width: 120px;
  height: 40px;
`;

const NoButton = styled(Button)``;

const YesButton = styled(Button)`
  color: white;
  background-color: #333333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: url(${CloseIcon}) no-repeat center/cover;
  border: none;
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

interface AlreadyDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlreadyDiaryModal: React.FC<AlreadyDiaryModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose} />
        <ModalTitle>이미 일기가 존재합니다. <br></br> 일기를 보러 가시겠습니까?</ModalTitle>
        <ModalButtons>
          <NoButton onClick={onClose}>아니오</NoButton>
          <YesButton onClick={onConfirm}>네</YesButton>
        </ModalButtons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AlreadyDiaryModal;
