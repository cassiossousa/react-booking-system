import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import EmptyState from '../../../ui/EmptyState';
import { PropertyCard } from './PropertyCard';

import {
  selectAllProperties,
  selectSelectedProperty,
} from '../../../features/properties/properties.selectors';

import {
  propertyRemoved,
  propertySelected,
} from '../../../features/properties/properties.slice';

import type { Property } from '../../../features/properties/domain/property.schema';
import styled from 'styled-components';

export const PropertiesList = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(selectAllProperties);
  const selectedProperty = useAppSelector(selectSelectedProperty);

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
          disableActions={Boolean(selectedProperty)}
          isEditing={selectedProperty?.id === property.id}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;
