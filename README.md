# React Booking System

A modern, fully responsive booking management system built with React, TypeScript, and Redux Toolkit. Features comprehensive testing with 100% passing Cypress E2E tests and high unit test coverage.

🚀 **Live Demo:** [https://cassiossousa.github.io/react-booking-system/](https://cassiossousa.github.io/react-booking-system/)

## ✨ Features

### Core Functionality
- ✅ **Complete CRUD Operations** - Create, read, update, and delete bookings
- ✅ **Property Management** - Link bookings to properties with capacity validation
- ✅ **Overlap Prevention** - Intelligent date overlap detection and prevention
- ✅ **Form Validation** - Comprehensive validation using Zod schemas
- ✅ **Responsive Design** - Mobile-first design that works on all devices

### User Experience
- 📱 **Mobile Responsive** - Optimized for mobile, tablet, and desktop
- ⌨️ **Keyboard Accessible** - Full keyboard navigation support
- 🎨 **Modern UI** - Clean, intuitive interface with smooth interactions
- 🔄 **Real-time Updates** - Instant feedback and validation

### Development Quality
- 🧪 **100% Passing Tests** - 23/23 Cypress E2E tests passing
- 📊 **High Coverage** - Comprehensive unit and integration tests
- 🔧 **Type Safe** - Full TypeScript implementation
- 📦 **Modern Stack** - Latest React ecosystem tools

## 🛠 Tech Stack

### Frontend
- **React 18** with **TypeScript** - Modern, type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing

### State Management
- **Redux Toolkit** - Predictable state management
- **React Redux** - React bindings for Redux

### Styling & UI
- **Styled Components** - CSS-in-JS with theme support
- **React Hook Form** - Performant form management
- **Zod** - Schema validation
- **date-fns** - Robust date manipulation
- **React Datepicker** - Date selection component

### Testing
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Cypress** - End-to-end testing (23 passing tests!)
- **Vitest Coverage** - Code coverage reporting

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
git clone https://github.com/cassiossousa/react-booking-system.git
cd react-booking-system
npm install
```

### Development

```bash
npm run dev
```

🌐 **Visit:** [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing

### Unit & Component Tests

```bash
# Run tests
npm run test

# Run with coverage
npm run test-cov

# Watch mode
npm run test-watch
```

### End-to-End Tests (Cypress)

```bash
# Open Cypress test runner
npm run cypress

# Run all tests headless
npm run cypress:run:headless

# Run in Chrome
npm run cypress:run:chrome
```

**Current Test Status:** ✅ 23/23 tests passing (100%)

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint-fix

# Format code
npm run prettier-fix

# Type checking
npm run tsc
```

## 📁 Project Structure

```
src/
├── app/                    # Application core
│   ├── store.ts           # Redux store configuration
│   └── hooks.ts           # Custom React hooks
├── features/              # Feature-based modules
│   ├── bookings/          # Booking management
│   │   ├── bookingsSlice.ts
│   │   ├── bookings.types.ts
│   │   └── bookings.utils.ts
│   └── properties/        # Property management
│       ├── propertiesSlice.ts
│       └── properties.types.ts
├── pages/                 # Page components
│   ├── BookingsPage/
│   └── PropertiesPage/
├── ui/                    # Reusable UI components
│   ├── Button/
│   ├── ConfirmModal/
│   └── index.ts
├── styles/                # Styling and themes
│   └── theme.ts
└── main.tsx              # Application entry point
```

## 🏗 Architecture

### State Management
- **Redux Toolkit** for global state
- **Feature slices** for modular state management
- **Typed selectors** for type-safe state access

### Form Management
- **React Hook Form** for performant forms
- **Zod schemas** for validation
- **Error handling** with user-friendly messages

### Testing Strategy
- **Unit tests** for business logic and utilities
- **Component tests** for UI interactions
- **E2E tests** for complete user workflows
- **Coverage reporting** for quality assurance

## 🎯 Key Features Explained

### Booking Overlap Prevention
The system prevents double-bookings using sophisticated date logic:
- **Inclusive start, exclusive end** date ranges
- **Property-specific** overlap checking
- **Real-time validation** during form entry

### Responsive Design
- **Mobile-first** approach
- **Touch-friendly** interface
- **Adaptive layouts** for all screen sizes

### Type Safety
- **Full TypeScript** coverage
- **Zod schema validation**
- **Redux Toolkit** type inference

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure build settings
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
# Deploy the `dist/` folder to your hosting provider
```

## 📊 Test Coverage

- **Unit Tests:** Core business logic, utilities, Redux slices
- **Component Tests:** UI components, user interactions
- **E2E Tests:** Complete user workflows (23 tests)
- **Accessibility:** Keyboard navigation, screen readers
- **Responsive:** Mobile, tablet, desktop viewports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run test-cov`
5. Run E2E tests: `npm run cypress:run:headless`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo:** [https://cassiossousa.github.io/react-booking-system/](https://cassiossousa.github.io/react-booking-system/)
- **Repository:** [https://github.com/cassiossousa/react-booking-system](https://github.com/cassiossousa/react-booking-system)
- **Issues:** [https://github.com/cassiossousa/react-booking-system/issues](https://github.com/cassiossousa/react-booking-system/issues)

---

Built with ❤️ using modern React ecosystem tools
