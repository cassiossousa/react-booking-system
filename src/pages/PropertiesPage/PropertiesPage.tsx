import { Card } from '../../ui/Card';
import { Column, PageContainer, Row, Title } from '../../styles/primitives';
import { PropertyForm } from './components/PropertyForm';
import { PropertiesList } from './components/PropertiesList';

export const PropertiesPage = () => {
  return (
    <PageContainer>
      <Title>Properties</Title>
      <Row>
        <Column>
          <Card>
            <PropertyForm />
          </Card>
        </Column>
        <Column>
          <PropertiesList />
        </Column>
      </Row>
    </PageContainer>
  );
};
