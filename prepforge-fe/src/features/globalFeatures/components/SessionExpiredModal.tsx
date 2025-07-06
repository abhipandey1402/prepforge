import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, LogIn } from 'lucide-react';

interface SessionExpiredModalProps {
    handleLogout: () => void; // Type for the logout handler
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ handleLogout }) => {
    return (
        <Modal>
            <ModalContent>
                <IconWrapper>
                    <AlertTriangle size={40} color="#f87171" />
                </IconWrapper>
                <Title>Session Expired</Title>
                <Message>Your session has expired. Please log in again to continue.</Message>
                <LogoutButton onClick={handleLogout}>
                    <LogIn size={20} />
                    Login
                </LogoutButton>
            </ModalContent>
        </Modal>
    );
};

export default SessionExpiredModal;

// Styled components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(244, 244, 244, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  padding: 0.75rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dc2626;
  }

  svg {
    margin-right: 0.5rem;
  }
`;
