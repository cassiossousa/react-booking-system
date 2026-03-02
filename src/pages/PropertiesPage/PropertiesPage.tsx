import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  propertyAdded,
  propertiesSelectors,
} from '../../features/properties/properties.slice';

import { Card } from '../../ui/Card';
import { Column, PageContainer, Row, Title } from '../../styles/primitives';
import type { CreatePropertyInput } from '../../features/properties/domain/property.schema';
import { PropertiesForm } from './components/PropertiesForm';

export const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(propertiesSelectors.selectAll);

  const handleCreate = useCallback(
    (data: CreatePropertyInput) => {
      dispatch(
        propertyAdded({
          id: crypto.randomUUID(),
          ...data,
          createdAt: new Date().toISOString(),
        }),
      );
    },
    [dispatch],
  );

  return (
    <PageContainer>
      <Title>Properties</Title>
      <Row>
        <Column>
          <Card>
            <PropertiesForm onSubmit={handleCreate} />
            {properties.map((property) => (
              <Card key={property.id} padding="md" hover>
                <h3>{property.name}</h3>
                <p>{property.location}</p>
                <p>Capacity: {property.capacity}</p>
              </Card>
            ))}
          </Card>
        </Column>
      </Row>
    </PageContainer>
  );
};
