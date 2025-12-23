# Component Showcase - React Hub

## Overview
This document describes the comprehensive component showcase page located in `src/pages/Home.tsx`. The Home page renders all 21 reusable components from `src/components/common/` with their variants, sizes, and interactive examples.

## Components Showcased

### 1. **Typography**
- **Purpose**: Display text in various styles and sizes
- **Variants**: h1, h2, h3, h4, body1, body2, caption
- **Location**: `src/pages/Home.tsx` - Lines 96-109

### 2. **Button**
- **Purpose**: Interactive clickable element
- **Variants**: text, outlined, contained
- **Colors**: primary, secondary, success, error, warning, info
- **Sizes**: small, medium, large
- **Location**: `src/pages/Home.tsx` - Lines 111-142

### 3. **Card**
- **Purpose**: Container component for grouped content
- **Variants**: elevation, outlined, outlined-raised
- **Sizes**: sm, md, lg
- **Location**: `src/pages/Home.tsx` - Lines 144-159

### 4. **Link**
- **Purpose**: Navigation element using React Router
- **Props**: to (required), color, underline, size
- **Colors**: primary, secondary, inherit
- **Underlines**: none, hover, always
- **Location**: `src/pages/Home.tsx` - Lines 161-183

### 5. **List**
- **Purpose**: Display ordered or unordered lists
- **Types**: Unordered (<ul>), Ordered (<ol>)
- **Location**: `src/pages/Home.tsx` - Lines 185-200

### 6. **Select**
- **Purpose**: Dropdown select component
- **Props**: value, onChange, label, size, variant
- **Uses**: Native <select> with children <option>s
- **Location**: `src/pages/Home.tsx` - Lines 202-213

### 7. **NumberField**
- **Purpose**: Input for numeric values
- **Props**: value, onChange, min, max, label
- **Location**: `src/pages/Home.tsx` - Lines 215-226

### 8. **RadioGroup**
- **Purpose**: Single selection from multiple options
- **Uses**: Children with input[type="radio"]
- **Location**: `src/pages/Home.tsx` - Lines 228-245

### 9. **Checkbox**
- **Purpose**: Binary selection control
- **Variants**: checked, unchecked, disabled
- **Features**: Controlled and uncontrolled modes
- **Location**: `src/pages/Home.tsx` - Lines 247-258

### 10. **AutoComplete**
- **Purpose**: Search and filter from predefined options
- **Props**: options, placeholder, label, size
- **Features**: Dropdown filtering, clear button
- **Location**: `src/pages/Home.tsx` - Lines 260-280

### 11. **Accordion**
- **Purpose**: Expandable/collapsible content sections
- **Variants**: outlined, elevation
- **Sizes**: small, medium, large
- **Features**: Smooth animations, state management
- **Location**: `src/pages/Home.tsx` - Lines 282-305

### 12. **Tabs**
- **Purpose**: Tabbed interface for organizing content
- **Props**: value, onChange
- **Uses**: Tab component for each tab
- **Features**: Keyboard navigation, active indicators
- **Location**: `src/pages/Home.tsx` - Lines 307-323

### 13. **LinearProgress**
- **Purpose**: Horizontal progress bar
- **Props**: value (0-100)
- **Location**: `src/pages/Home.tsx` - Lines 325-342

### 14. **CircularProgress**
- **Purpose**: Circular progress indicator
- **Props**: value (0-100)
- **Location**: `src/pages/Home.tsx` - Lines 344-357

### 15. **Stepper**
- **Purpose**: Show progress through multi-step process
- **Props**: steps (array of objects), activeStep
- **Step Format**: { label, description }
- **Location**: `src/pages/Home.tsx` - Lines 359-380

### 16. **Tooltip**
- **Purpose**: Display helpful text on hover
- **Props**: title (required), children (trigger element)
- **Location**: `src/pages/Home.tsx` - Lines 382-395

### 17. **FileUpload**
- **Purpose**: Upload files from user's device
- **Props**: accept, onChange, label
- **Features**: Accept type filtering, validation
- **Location**: `src/pages/Home.tsx` - Lines 397-409

### 18. **Menu**
- **Purpose**: Dropdown menu with options
- **Variants**: default, primary, danger
- **Location**: `src/pages/Home.tsx` - Lines 411-429

### 19. **Snackbar**
- **Purpose**: Temporary notification messages
- **Props**: onClose, autoHideDuration
- **Features**: Auto-dismiss, dismissible
- **Location**: `src/pages/Home.tsx` - Lines 431-449

### 20. **Table**
- **Purpose**: Display tabular data
- **Props**: columns, rows
- **Column Format**: { id, field (key), headerName, align, sortable }
- **Location**: `src/pages/Home.tsx` - Lines 451-461

### 21. **Modal**
- **Purpose**: Modal dialog for focused interactions
- **Props**: isOpen, onClose
- **Features**: Overlay backdrop, focus management
- **Location**: `src/pages/Home.tsx` - Lines 463-495

### 22. **Pagination**
- **Purpose**: Navigate through pages of content
- **Props**: value, onClick, selected, disabled
- **Features**: Multiple buttons for page selection
- **Location**: `src/pages/Home.tsx` - Lines 463-481

## State Management

The Home component uses React hooks to manage interactive state:

```typescript
const [modalOpen, setModalOpen] = useState(false);
const [selectValue, setSelectValue] = useState('');
const [numberValue, setNumberValue] = useState(0);
const [tabValue, setTabValue] = useState<string | number>('tab1');
const [stepperActiveStep, setStepperActiveStep] = useState(0);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [accordionOpen, setAccordionOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [checkboxState, setCheckboxState] = useState(false);
```

## Sample Data

### Table Data
```typescript
const tableColumns = [
  { id: '1', field: 'id', headerName: 'ID' },
  { id: '2', field: 'name', headerName: 'Name' },
  { id: '3', field: 'email', headerName: 'Email' },
  { id: '4', field: 'status', headerName: 'Status' },
];

const tableRows = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
];
```

### Stepper Data
```typescript
const stepperSteps = [
  { label: 'Step 1', description: 'Create Account' },
  { label: 'Step 2', description: 'Verify Email' },
  { label: 'Step 3', description: 'Complete Profile' },
];
```

### AutoComplete Options
```typescript
const autocompleteOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
```

## Layout

- **Responsive Grid**: Uses Tailwind CSS grid system (1 column mobile, 2-3 columns on desktop)
- **Spacing**: Organized into sections with consistent spacing
- **Styling**: Dark background with white cards containing components
- **Typography**: Section headings use Typography variant="h2"

## Accessing the Showcase

1. **Development Server**: Run `npm run dev`
2. **URL**: Navigate to `http://localhost:5173/`
3. **Home Route**: Access via the home page or navigate to `/`

## Component Props Reference

### Common Props Across Components
- `id?`: string - Unique identifier
- `className?`: string - Additional CSS classes
- `disabled?`: boolean - Disable interactions
- `aria-label?`: string - Accessibility label
- `aria-labelledby?`: string - Links to labeling element
- `aria-describedby?`: string - Links to description

### Key Patterns

**Controlled Components** (value + onChange):
- Select, NumberField, Checkbox, RadioGroup, Tabs

**Uncontrolled Components** (defaultValue):
- Checkbox (defaultChecked), NumberField (defaultValue)

**Modal/Dialog Components** (isOpen + onClose):
- Modal, Snackbar, Accordion

**Children-Based Components**:
- List (li children), RadioGroup (label/input children), Select (option children), Tabs (Tab children)

## Next Steps

To extend the showcase:

1. Add more component variants/colors
2. Add interactive examples with state updates
3. Create story files (*.stories.tsx) for Storybook
4. Document component props in README
5. Add accessibility testing examples

## Files Modified

- **Created**: `src/pages/Home.tsx` - Main showcase page
- **Created**: `COMPONENT_SHOWCASE.md` - This documentation file

## Related Files

- Component implementations: `src/components/common/*/[ComponentName].tsx`
- Routes configuration: `src/routes/AppRoutes.tsx`
- Styling tokens: `src/styles/tokens.css`
- Tailwind config: `tailwind.config.js`
