# High-Level Architecture Decisions

## 1. Frameworks

Vite + React + TypeScript

### 1.1. Why?

- React and TypeScript explicitly asked for or suggested;
- Vite provides fast setup and a clean build system from the start;
- Type safety prevents "price as string" mistake on compile-time.

## 2. State Management

Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)

### 2.1. Why?

- Industry standard for React application
- Predictable state updates
- Strong DevTools support
- Clean separation of concerns

## 3. Styling

Styled Components

### 3.1. Why?

- Explicitly asked for
- Scoped styling
- Dynamic styling based on props
- Clean UI component architecture
- Production-ready theming potential

## 4. Forms

React Hook Form + Zod (`@hookform/resolvers`)

### 4.1. Why?

- Performance-optimized
- Minimal re-renders
- Clean validation integration
- Type inference from schema
- Industry-standard

## 5. Date Handling

date-fns

### 5.2. Why?

- Never manually compare dates.
- Never rely on string comparison.
- Avoid timezone bugs.

## 6. Testing Stack

- Vitest (unit tests)
- Redux slice tests
- `@testing-library/react` (component tests)
- Cypress (E2E)

## 7. File and Folder structure

```
src/
 ├── app/
 │    ├── store.ts
 │    └── hooks.ts
 │
 ├── features/
 │    └── bookings/
 │         ├── bookingsSlice.ts
 │         ├── selectors.ts
 │         ├── bookings.types.ts
 │         ├── bookings.utils.ts
 │         └── bookings.test.ts
 │
 ├── components/
 │    ├── BookingForm/
 │    ├── BookingList/
 │    ├── BookingCard/
 │    ├── PropertySelector/
 │    └── UI/
 │
 ├── pages/
 │    └── BookingPage.tsx
 │
 ├── styles/
 │    └── theme.ts
 │
 ├── utils/
 │    └── date.ts
 │
 └── main.tsx
```

### 7.1. Why?

- Feature isolation (Redux slice + logic together)
- Reusable components separate from domain
- Scalable to multiple pages
- Easy to test in isolation

## 8. Booking Domain Model

```ts
export interface Booking {
  id: string;
  propertyId: string;
  guestName: string;
  startDate: string; // ISO
  endDate: string; // ISO
}
```

### 8.2. Why ISO string?

- Serializable
- Redux-friendly
- DevTools-safe
- No Date mutation issues
- Convert to Date only in UI/logic layer.

## 9. Redux Slice Design

```
features/bookings/bookingsSlice.ts
```

State:

```ts
interface BookingsState {
  bookings: Booking[];
}
```

Reducers:

```ts
addBooking;
updateBooking;
deleteBooking;
```

Selectors:

```ts
selectAllBookings;
selectBookingsByProperty;
```

## 10. Overlapping Logic (Critical)

Bookings are:

- Inclusive of start
- Exclusive of end

Overlap formula:

```ts
startA < endB && endA > startB;
```

Implementation must:

- Only check overlap within the same property
- Exclude current booking when updating
- Convert ISO → Date using `parseISO`
- Be fully unit tested

## 11. Validation Strategy

Use Zod schema:

- propertyId required
- guestName min length
- startDate < endDate
- No overlapping booking
- Prevent empty values
- Prevent past bookings

### 11.1. Why prevent past bookings?

- Won't happen, because they can't happen
- Both front-end and APIs cannot let this happen

When updating:

- Exclude current booking from overlap check

## 12. UI/UX Strategy

Single page.

### 12.1 Layout

Top:

- Booking Form (Create + Update mode merged)

Below:

- List of bookings grouped by property

Mobile:

- Stacked layout
- Inputs full width
- Datepicker mobile visible
- Buttons large enough for touch

## 13. Create & Update Strategy

- Single BookingForm
- If editingBooking exists: update mode
- Otherwise: create mode

## 14. Testing Strategy

### 14.1. Unit Tests

- Overlap utility
- Date validation
- Redux reducers
- Selectors

### 14.2. Component Tests

- Form renders correctly
- Validation errors appear
- Submit works
- Update mode works
- Delete works

### 14.3. Snapshot Tests

- BookingCard snapshot

### 14.4. Cypress E2E

- Create booking
- Attempt overlapping booking --> see error
- Update booking
- Delete booking
- Test mobile viewport
