import { useState } from 'react';
import Typography from '../components/common/Typography/Typography';
import Button from '../components/common/Button/Button';
import Card from '../components/common/Card/Card';
import Link from '../components/common/Link/Link';
import List from '../components/common/List/List';
import Menu from '../components/common/Menu/Menu';
import Modal from '../components/common/Modal/Modal';
import NumberField from '../components/common/NumberField/NumberField';
import RadioGroup from '../components/common/RadioGroup/RadioGroup';
import Checkbox from '../components/common/Checkbox/Checkbox';
import Accordion from '../components/common/Accordion/Accordion';
import Tabs, { Tab } from '../components/common/Tabs/Tabs';
import LinearProgress from '../components/common/Progress/LinearProgress';
import CircularProgress from '../components/common/Progress/CircularProgress';
import Stepper from '../components/common/Stepper/Stepper';
import Tooltip from '../components/common/Tooltip/Tooltip';
import FileUpload from '../components/common/FileUpload/FileUpload';
import AutoComplete from '../components/common/AutoComplete/AutoComplte';
import Snackbar from '../components/common/Snackbar/Snackbar';
import Table from '../components/common/Table/Table';
import Select from '../components/common/Select/Select';
import Pagination from '../components/common/Pagination/Pagination';

/**
 * Home Page Component
 * 
 * Comprehensive showcase of all reusable components in the design system.
 * Demonstrates all variants, sizes, colors, and states for each component.
 * Includes interactive examples with state management.
 */
const Home = () => {
  // State for interactive components
  const [modalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [numberValue, setNumberValue] = useState(0);
  const [tabValue, setTabValue] = useState<string | number>('tab1');
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxState, setCheckboxState] = useState(false);

  // Sample data
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

  const stepperSteps = [
    { label: 'Step 1', description: 'Create Account' },
    { label: 'Step 2', description: 'Verify Email' },
    { label: 'Step 3', description: 'Complete Profile' },
  ];

  const autocompleteOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h1" className="mb-4">
            Component Showcase
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Comprehensive demonstration of all reusable components with variants, sizes, and colors
          </Typography>
        </div>

        {/* Typography Section */}
        <section>
          <Typography variant="h2" className="mb-6">Typography</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2" className="mt-4">Heading 2</Typography>
              <Typography variant="h3" className="mt-4">Heading 3</Typography>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="body1" className="mb-3">Body 1 - This is the primary body text</Typography>
              <Typography variant="body2" className="mb-3">Body 2 - This is secondary body text</Typography>
              <Typography variant="caption">Caption - Small text for captions</Typography>
            </Card>
          </div>
        </section>

        {/* Button Section */}
        <section>
          <Typography variant="h2" className="mb-6">Buttons</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Variants */}
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Variants</Typography>
              <div className="space-y-3">
                <Button variant="text" color="primary">Text Button</Button>
                <Button variant="outlined" color="primary">Outlined Button</Button>
                <Button variant="contained" color="primary">Contained Button</Button>
              </div>
            </Card>

            {/* Colors */}
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Colors</Typography>
              <div className="space-y-2 text-sm">
                <Button variant="contained" color="primary" size="small">Primary</Button>
                <Button variant="contained" color="secondary" size="small">Secondary</Button>
                <Button variant="contained" color="success" size="small">Success</Button>
                <Button variant="contained" color="error" size="small">Error</Button>
                <Button variant="contained" color="warning" size="small">Warning</Button>
                <Button variant="contained" color="info" size="small">Info</Button>
              </div>
            </Card>

            {/* Sizes */}
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Sizes</Typography>
              <div className="space-y-3">
                <Button variant="contained" color="primary" size="small">Small</Button>
                <Button variant="contained" color="primary" size="medium">Medium</Button>
                <Button variant="contained" color="primary" size="large">Large</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Card Section */}
        <section>
          <Typography variant="h2" className="mb-6">Cards</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="elevation" size="sm">
              <Typography variant="h4" className="mb-2">Elevation Card</Typography>
              <Typography variant="body2">This card has an elevation (shadow) variant</Typography>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-2">Outlined Card</Typography>
              <Typography variant="body2">This card has an outlined border variant</Typography>
            </Card>
            <Card variant="outlined-raised" size="lg">
              <Typography variant="h4" className="mb-2">Outlined Raised Card</Typography>
              <Typography variant="body2">This card combines outline and raised styles</Typography>
            </Card>
          </div>
        </section>

        {/* Link Section */}
        <section>
          <Typography variant="h2" className="mb-6">Links</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Text Links</Typography>
              <div className="space-y-2">
                <Link to="/" color="primary">Primary Link</Link>
                <Link to="/" color="secondary">Secondary Link</Link>
                <Link to="/" color="inherit">Inherit Link</Link>
              </div>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Link Underlines</Typography>
              <div className="space-y-2">
                <Link to="/" underline="none">Link without Underline</Link>
                <Link to="/" underline="hover">Link with Hover Underline</Link>
                <Link to="/" underline="always">Link with Always Underline</Link>
              </div>
            </Card>
          </div>
        </section>

        {/* List Section */}
        <section>
          <Typography variant="h2" className="mb-6">Lists</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Unordered List</Typography>
              <List>
                <li>List Item 1</li>
                <li>List Item 2</li>
                <li>List Item 3</li>
                <li>List Item 4</li>
              </List>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Ordered List</Typography>
              <ol className="list-decimal list-inside space-y-2">
                <li>First Item</li>
                <li>Second Item</li>
                <li>Third Item</li>
                <li>Fourth Item</li>
              </ol>
            </Card>
          </div>
        </section>

        {/* Select & Number Field */}
        <section>
          <Typography variant="h2" className="mb-6">Form Controls</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Select</Typography>
              <Select
                label="Choose an option"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="opt1">Option 1</option>
                <option value="opt2">Option 2</option>
                <option value="opt3">Option 3</option>
              </Select>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Number Field</Typography>
              <NumberField
                label="Enter a number"
                value={numberValue}
                onChange={(e) => setNumberValue(Number(e.target.value))}
                min={0}
                max={100}
              />
            </Card>
          </div>
        </section>

        {/* Radio & Checkbox */}
        <section>
          <Typography variant="h2" className="mb-6">Selection Controls</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Radio Group</Typography>
              <RadioGroup label="Select one option">
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="radio" name="radio" value="option1" defaultChecked />
                  <span>Option 1</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="radio" name="radio" value="option2" />
                  <span>Option 2</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="radio" value="option3" />
                  <span>Option 3</span>
                </label>
              </RadioGroup>
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Checkboxes</Typography>
              <div className="space-y-3">
                <Checkbox
                  id="checkbox1"
                  label="Checkbox 1"
                  checked={checkboxState}
                  onChange={(e) => setCheckboxState(e.target.checked)}
                />
                <Checkbox id="checkbox2" label="Checkbox 2" defaultChecked />
                <Checkbox id="checkbox3" label="Checkbox 3 (Disabled)" disabled />
              </div>
            </Card>
          </div>
        </section>

        {/* AutoComplete */}
        <section>
          <Typography variant="h2" className="mb-6">AutoComplete</Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Search & Filter</Typography>
              <AutoComplete
                options={autocompleteOptions}
                placeholder="Type to search..."
                label="Fruits"
              />
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">With Custom Size</Typography>
              <AutoComplete
                options={autocompleteOptions}
                placeholder="Large autocomplete..."
                label="Select Fruit"
                size="medium"
              />
            </Card>
          </div>
        </section>

        {/* Accordion */}
        <section>
          <Typography variant="h2" className="mb-6">Accordion</Typography>
          <div className="grid grid-cols-1 gap-6 ">
            <Accordion
              title="Accordion Item 1 "
              isOpen={accordionOpen}
              onChange={setAccordionOpen}
              variant="outlined"
              size="medium"
            >
              <Typography variant="body2">
                This is the content of the first accordion item. It can contain any HTML content or React components.
              </Typography>
            </Accordion>
            <Accordion title="Accordion Item 2" variant="elevation" size="medium">
              <Typography variant="body2">
                This is the content of the second accordion item with elevation variant.
              </Typography>
            </Accordion>
            <Accordion title="Accordion Item 3" variant="outlined" size="large">
              <Typography variant="body2">
                This is a large accordion item with more padding and text size.
              </Typography>
            </Accordion>
          </div>
        </section>

        {/* Tabs */}
        <section>
          <Typography variant="h2" className="mb-6">Tabs</Typography>
          <Card variant="outlined" size="md">
            <Tabs value={tabValue} onChange={setTabValue}>
              <Tab value="tab1" label="Tab 1">
                <Typography variant="body2" className="mt-4">Content for Tab 1</Typography>
              </Tab>
              <Tab value="tab2" label="Tab 2">
                <Typography variant="body2" className="mt-4">Content for Tab 2</Typography>
              </Tab>
              <Tab value="tab3" label="Tab 3">
                <Typography variant="body2" className="mt-4">Content for Tab 3</Typography>
              </Tab>
            </Tabs>
          </Card>
        </section>

        {/* Progress */}
        <section>
          <Typography variant="h2" className="mb-6">Progress</Typography>
          <div className="grid grid-cols-1 gap-6">
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Linear Progress</Typography>
              <LinearProgress value={25} className="mb-3" />
              <LinearProgress value={50} className="mb-3" />
              <LinearProgress value={75} className="mb-3" />
              <LinearProgress value={100} />
            </Card>
            <Card variant="outlined" size="md">
              <Typography variant="h4" className="mb-4">Circular Progress</Typography>
              <div className="flex justify-around">
                <CircularProgress value={25} />
                <CircularProgress value={50} />
                <CircularProgress value={75} />
                <CircularProgress value={100} />
              </div>
            </Card>
          </div>
        </section>

        {/* Stepper */}
        <section>
          <Typography variant="h2" className="mb-6">Stepper</Typography>
          <Card variant="outlined" size="md">
            <Stepper steps={stepperSteps} activeStep={stepperActiveStep} />
            <div className="mt-6 flex gap-3">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setStepperActiveStep(Math.max(0, stepperActiveStep - 1))}
                disabled={stepperActiveStep === 0}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStepperActiveStep(Math.min(stepperSteps.length - 1, stepperActiveStep + 1))}
                disabled={stepperActiveStep === stepperSteps.length - 1}
              >
                Next
              </Button>
            </div>
          </Card>
        </section>

        {/* Tooltip */}
        <section>
          <Typography variant="h2" className="mb-6">Tooltip</Typography>
          <Card variant="outlined" size="md">
            <div className="flex gap-4">
              <Tooltip title="This is a tooltip">
                <Button variant="contained" color="primary">Hover me</Button>
              </Tooltip>
              <Tooltip title="Another tooltip message">
                <Button variant="outlined" color="secondary">Hover me too</Button>
              </Tooltip>
            </div>
          </Card>
        </section>

        {/* File Upload */}
        <section>
          <Typography variant="h2" className="mb-6">File Upload</Typography>
          <Card variant="outlined" size="md">
            <FileUpload
              accept="image/*"
              onChange={(e) => console.log('File selected:', e.target.files?.[0])}
              label="Upload Image"
            />
          </Card>
        </section>

        {/* Menu */}
        <section>
          <Typography variant="h2" className="mb-6">Menu</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="outlined" size="md">
              <Menu variant="default">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 1</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 2</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Option 3</button>
              </Menu>
            </Card>
            <Card variant="outlined" size="md">
              <Menu variant="primary">
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100">Action 1</button>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100">Action 2</button>
                <button className="w-full text-left px-4 py-2 hover:bg-blue-100">Action 3</button>
              </Menu>
            </Card>
            <Card variant="outlined" size="md">
              <Menu variant="danger">
                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Delete</button>
                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Remove</button>
                <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Discard</button>
              </Menu>
            </Card>
          </div>
        </section>

        {/* Snackbar */}
        <section>
          <Typography variant="h2" className="mb-6">Snackbar</Typography>
          <Card variant="outlined" size="md">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSnackbarOpen(true)}
            >
              Show Snackbar
            </Button>
            {snackbarOpen && (
              <Snackbar
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={3000}
              >
                <Typography variant="body2">This is a snackbar notification!</Typography>
              </Snackbar>
            )}
          </Card>
        </section>

        {/* Table */}
        <section>
          <Typography variant="h2" className="mb-6">Table</Typography>
          <Card variant="outlined" size="md">
            <Table columns={tableColumns} rows={tableRows} />
          </Card>
        </section>

        {/* Pagination */}
        <section>
          <Typography variant="h2" className="mb-6">Pagination</Typography>
          <Card variant="outlined" size="md" className="flex justify-center py-8">
            <div className="flex gap-2">
              <Pagination
                value="<"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
              {[1, 2, 3, 4, 5].map((page) => (
                <Pagination
                  key={page}
                  value={page}
                  onClick={() => setCurrentPage(page)}
                  selected={currentPage === page}
                />
              ))}
              <Pagination
                value=">"
                onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
                disabled={currentPage === 5}
              />
            </div>
          </Card>
        </section>

        {/* Modal */}
        <section>
          <Typography variant="h2" className="mb-6">Modal</Typography>
          <Card variant="outlined" size="md">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
            >
              Open Modal
            </Button>
            {modalOpen && (
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <Typography variant="h3" className="mb-4">Modal Title</Typography>
                <Typography variant="body2" className="mb-6">
                  This is a modal dialog. It displays content in a layered, focused experience.
                </Typography>
                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(false)}
                  >
                    Confirm
                  </Button>
                </div>
              </Modal>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;