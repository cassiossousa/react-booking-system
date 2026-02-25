import styled from 'styled-components';
import { Card } from '../../ui/Card';

const Wrapper = styled(Card)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type Props = {
  children: React.ReactNode;
};

export default function EmptyState({ children }: Props) {
  return <Wrapper padding="lg">{children}</Wrapper>;
}
