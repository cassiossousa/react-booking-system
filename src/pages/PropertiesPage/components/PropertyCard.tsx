import { useState } from 'react';
import type { Property } from '../../../features/properties/domain/property.schema';
import { Button } from '../../../ui/Button';
import { Card } from '../../../ui/Card';
import { ConfirmModal } from '../../../ui/ConfirmModal';

import {
  Actions,
  Capacity,
  Header,
  Location,
  Name,
} from './PropertyCard.styles';

interface Props {
  property: Property;
  disableActions: boolean;
  isEditing: boolean;
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
}

export const PropertyCard = ({
  property,
  disableActions,
  isEditing,
  onDelete,
  onEdit,
}: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const actionsDisabled = Boolean(disableActions || isEditing);

  return (
    <>
      <Card
        $hover
        style={{
          border: isEditing ? '2px solid #4f46e5' : undefined,
          opacity: disableActions && !isEditing ? 0.6 : 1,
        }}
      >
        <Header>
          <Name>{property.name}</Name>
        </Header>

        <Location>{property.location}</Location>

        <Capacity>
          {property.capacity} guest{property.capacity > 1 ? 's' : ''}
        </Capacity>

        <Actions>
          <Button
            $variant="ghost"
            disabled={actionsDisabled}
            onClick={() => onEdit(property)}
          >
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
      </Card>

      {confirmOpen && (
        <ConfirmModal
          title="Delete Property"
          description={`Are you sure you want to delete "${property.name}"? This action cannot be undone.`}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            onDelete(property.id);
            setConfirmOpen(false);
          }}
        />
      )}
    </>
  );
};
