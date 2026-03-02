import { useAppSelector } from '../../../app/hooks';
import EmptyState from '../../../ui/EmptyState';
import { selectAllProperties } from '../../../features/properties/properties.selectors';

import { useCallback } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { PropertyCard } from './PropertyCard';
import {
  propertyRemoved,
  propertySelected,
} from '../../../features/properties/properties.slice';
import type { Property } from '../../../features/properties/domain/property.schema';
import { Wrapper } from './PropertiesList.styles';

export const PropertiesList = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(selectAllProperties);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(propertyRemoved(id));
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (property: Property) => {
      dispatch(propertySelected(property.id));
    },
    [dispatch],
  );

  if (properties.length === 0) {
    return <EmptyState>No properties yet. Create your first one.</EmptyState>;
  }

  return (
    <Wrapper>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </Wrapper>
  );
};
