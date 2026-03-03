import styled from 'styled-components';
import type { Property } from '../../../features/properties/domain/property.schema';
import { EditableCard } from '../../../ui/EditableCard';

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
  return (
    <EditableCard
      title={property.name}
      subtitle={property.location}
      body={
        <Capacity>
          {property.capacity} guest{property.capacity > 1 ? 's' : ''}
        </Capacity>
      }
      isEditing={isEditing}
      disableActions={disableActions}
      onEdit={() => onEdit(property)}
      onDelete={() => onDelete(property.id)}
      confirmTitle="Delete Property"
      confirmDescription={`Are you sure you want to delete "${property.name}"? This action cannot be undone.`}
    />
  );
};

const Capacity = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;
