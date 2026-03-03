import type { Property } from '../../../features/properties/domain/property.schema';
import { Button } from '../../../ui/Button';
import { Card } from '../../../ui/Card';
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
  const actionsDisabled = disableActions || isEditing;
  return (
    <Card $hover>
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
          {isEditing ? 'Editing' : 'Edit'}
        </Button>

        <Button
          $variant="danger"
          disabled={actionsDisabled}
          onClick={() => onDelete(property.id)}
        >
          Delete
        </Button>
      </Actions>
    </Card>
  );
};
