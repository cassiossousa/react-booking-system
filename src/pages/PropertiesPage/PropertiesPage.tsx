import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  propertyAdded,
  propertiesSelectors,
} from '../../features/properties/properties.slice';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Column, PageContainer, Row, Title } from '../../styles/primitives';
import { Input } from '../../ui/Input';
import { Form } from '../../ui/Form';

export const PropertiesPage = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(propertiesSelectors.selectAll);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState(1);

  const handleCreate = () => {
    if (!name.trim() || !location.trim()) return;

    dispatch(
      propertyAdded({
        id: crypto.randomUUID(),
        name,
        location,
        capacity,
        createdAt: new Date().toISOString(),
      }),
    );

    setName('');
    setLocation('');
    setCapacity(1);
  };

  return (
    <PageContainer>
      <Title>Properties</Title>
      <Row>
        <Column>
          <Card>
            <Form>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Input
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
              <Button onClick={handleCreate}>Add Property</Button>
            </Form>

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
