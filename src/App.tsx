import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BookingPage />
    </ThemeProvider>
  );
}

export default App;
