import { useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { propertyAdded } from '../../features/properties/properties.slice';

import { Card } from '../../ui/Card';
import { Column, PageContainer, Row, Title } from '../../styles/primitives';
import type { CreatePropertyInput } from '../../features/properties/domain/property.schema';
import { PropertyForm } from './components/PropertyForm';
import { PropertiesList } from './components/PropertiesList';

export const PropertiesPage = () => {
  const dispatch = useAppDispatch();

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
            <PropertyForm onSubmit={handleCreate} />
          </Card>
        </Column>
        <Column>
          <PropertiesList />
        </Column>
      </Row>
    </PageContainer>
  );
};
