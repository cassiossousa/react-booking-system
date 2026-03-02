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
  onDelete: (id: string) => void;
  onEdit: (property: Property) => void;
}

export const PropertyCard = ({ property, onDelete, onEdit }: Props) => {
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
        <Button $variant="ghost" onClick={() => onEdit(property)}>
          Edit
        </Button>

        <Button $variant="danger" onClick={() => onDelete(property.id)}>
          Delete
        </Button>
      </Actions>
    </Card>
  );
};
