import styled from 'styled-components';
import { Button, type ButtonVariant } from './Button';

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmVariant?: ButtonVariant;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.md};
  width: 400px;
  max-width: 90%;
`;

const Actions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ConfirmModal = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmVariant = 'danger',
}: Props) => {
  return (
    <Overlay>
      <Modal>
        <h3>{title}</h3>
        <p>{description}</p>

        <Actions>
          <Button $variant="ghost" onClick={onCancel}>
            Cancel
          </Button>

          <Button $variant={confirmVariant} onClick={onConfirm}>
            Confirm
          </Button>
        </Actions>
      </Modal>
    </Overlay>
  );
};
