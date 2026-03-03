import { useState } from 'react';
import { Card } from './Card';
import { ConfirmModal } from './ConfirmModal';
import styled from 'styled-components';
import { Button } from './Button';

interface Props {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  isEditing: boolean;
  disableActions: boolean;
  onEdit: () => void;
  onDelete: () => void;
  confirmTitle: string;
  confirmDescription: string;
}

export const EditableCard = ({
  title,
  subtitle,
  body,
  isEditing,
  disableActions,
  onEdit,
  onDelete,
  confirmTitle,
  confirmDescription,
}: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const actionsDisabled = Boolean(disableActions || isEditing);

  return (
    <>
      <StyledCard
        $hover
        $editing={isEditing}
        $dimmed={disableActions && !isEditing}
      >
        <Header>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Header>

        {body}

        <Actions>
          <Button $variant="ghost" disabled={actionsDisabled} onClick={onEdit}>
            {isEditing ? 'Editing...' : 'Edit'}
          </Button>

          <Button
            $variant="danger"
            disabled={actionsDisabled}
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        </Actions>
      </StyledCard>

      {confirmOpen && (
        <ConfirmModal
          title={confirmTitle}
          description={confirmDescription}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            onDelete();
            setConfirmOpen(false);
          }}
        />
      )}
    </>
  );
};

const StyledCard = styled(Card)<{
  $editing: boolean;
  $dimmed: boolean;
}>`
  border: ${({ $editing, theme }) =>
    $editing ? `2px solid ${theme.colors.primary}` : '1px solid transparent'};

  opacity: ${({ $dimmed }) => ($dimmed ? 0.6 : 1)};
  transition: all 0.2s ease;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Title = styled.div`
  font-weight: 600;
`;

const Subtitle = styled.div`
  opacity: 0.7;
  font-size: 0.9rem;
`;

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;
