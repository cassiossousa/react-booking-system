# Cypress E2E Testing Setup

This directory contains Cypress end-to-end tests for the React Booking System.

## Setup

Cypress is already installed as a dev dependency in the project. The configuration is set up in `cypress.config.ts`.

## Running Tests

### Interactive Mode
```bash
npm run cypress
```
This opens the Cypress Test Runner where you can select and run tests interactively.

### Headless Mode
```bash
npx cypress run
```
This runs all tests in headless mode (useful for CI/CD).

### Specific Test File
```bash
npx cypress run --spec "cypress/e2e/booking-crud.cy.ts"
```

## Test Structure

### Test Files
- `booking-crud.cy.ts` - Tests for Create, Read, Update, Delete operations
- `booking-overlap.cy.ts` - Tests for booking overlap validation logic
- `mobile-responsiveness.cy.ts` - Tests for mobile and tablet viewports

### Support Files
- `cypress/support/commands.ts` - Custom Cypress commands
- `cypress/support/e2e.ts` - Main support file that imports commands

## Custom Commands

### `getByTestId(testId)`
Selects elements by their `data-testid` attribute.
```typescript
cy.getByTestId('submit-button').click();
```

### `fillBookingForm(data)`
Fills the booking form with the provided data.
```typescript
cy.fillBookingForm({
  propertyId: '1',
  guestName: 'John Doe',
  startDate: '2024-12-01',
  endDate: '2024-12-03'
});
```

## Test Coverage

### Booking CRUD Operations
- ✅ Create new booking
- ✅ Update existing booking
- ✅ Delete booking
- ✅ Form validation (required fields, past dates)
- ✅ Error handling

### Overlap Validation
- ✅ Exact date overlap prevention
- ✅ Partial overlap (start/end)
- ✅ Contained overlap
- ✅ Adjacent dates allowed
- ✅ Different properties allowed
- ✅ Update overlap validation

### Mobile Responsiveness
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Date picker on mobile
- ✅ Touch-friendly buttons
- ✅ No horizontal scrolling

## Data Test IDs

The tests expect the following `data-testid` attributes in your components:

### Form Elements
- `property-select` - Property dropdown/select
- `guest-name-input` - Guest name text input
- `start-date-input` - Start date input
- `end-date-input` - End date input
- `submit-button` - Form submit button

### Booking List
- `bookings-list` - Container for all bookings
- `booking-card` - Individual booking card
- `edit-button` - Edit button on booking card
- `delete-button` - Delete button on booking card
- `confirm-delete` - Delete confirmation button

### Error Handling
- `error-message` - Error message display
- `guest-name-input.error` - Error state for guest name input
- `start-date-input.error` - Error state for start date input
- `end-date-input.error` - Error state for end date input

### Layout
- `booking-form` - Booking form container

## Configuration

The Cypress configuration (`cypress.config.ts`) includes:
- Base URL: `http://localhost:5173` (Vite dev server)
- Default viewport: 1280x720
- Test file pattern: `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`
- Timeout settings: 10 seconds for commands/requests

## Development Notes

1. **Make sure your dev server is running** before executing tests:
   ```bash
   npm run dev
   ```

2. **Tests use localStorage clearing** between tests to ensure isolation.

3. **Date format**: Tests use `YYYY-MM-DD` format for date inputs.

4. **Property IDs**: Tests assume properties with IDs '1' and '2' exist.

5. **TypeScript errors**: The lint errors about Cypress globals are expected and don't affect test execution. Cypress provides these globals at runtime.

## Troubleshooting

### Tests can't find elements
- Ensure your components have the correct `data-testid` attributes
- Check that the dev server is running on the expected port
- Verify the app has loaded before test execution (add waits if needed)

### Date picker issues
- Some date pickers require special handling
- Tests use direct `.type()` which works with HTML5 date inputs

### Mobile tests failing
- Ensure responsive CSS is implemented
- Check for horizontal scrolling issues
- Verify touch targets are appropriately sized

## Adding New Tests

1. Create new `.cy.ts` files in `cypress/e2e/`
2. Use existing custom commands when possible
3. Follow the naming convention: `feature-description.cy.ts`
4. Add data-test-id attributes to new components as needed
5. Update this README with new test coverage
