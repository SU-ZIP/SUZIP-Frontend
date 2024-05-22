import React from 'react';
import styled from 'styled-components';
import CloseIcon from '../../assets/images/close2.png'; // Close 버튼 아이콘 경로

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
  height: 168px; 
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
  top: 65px;
  font-size: 20px;
`;

// 버튼 컨테이너 스타일
const ModalButtons = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙 정렬로 변경
  margin-top: 100px;
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

const CancelButton = styled(Button)``;

const ConfirmButton = styled(Button)`
  color: white;
  background-color: #333333;
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: url(${CloseIcon}) no-repeat center/cover; // 배경 사이즈 cover로 조정
  border: none;
  width: 14px; // 아이콘 크기 조정
  height: 14px; // 아이콘 크기 조정
  cursor: pointer;
`;

// 모달 프로퍼티 인터페이스
interface WriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WriteModal: React.FC<WriteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose} />
        <ModalTitle>일기를 작성하시겠어요?</ModalTitle>
        <ModalButtons>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>작성</ConfirmButton>
        </ModalButtons>
      </ModalContainer>
    </ModalBackground>
  );
};

export default WriteModal;
