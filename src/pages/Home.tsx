import { useState } from 'react';
import Typography from '../components/common/Typography/Typography';
import Button from '../components/common/Button/Button';
import Card from '../components/common/Card/Card';
import Link from '../components/common/Link/Link';
import Menu from '../components/common/Menu/Menu';
import Modal from '../components/common/Modal/Modal';
import NumberField from '../components/common/NumberField/NumberField';
import Radiogroup from '../components/common/Radiogroup/Radiogroup';
import Checkbox from '../components/common/Checkbox/Checkbox';
import Accordion from '../components/common/Accordion/Accordion';
import Tabs from '../components/common/Tabs/Tabs';
import Progress from '../components/common/Progress/Progress';
import Stepper from '../components/common/Stepper/Stepper';
import Tooltip from '../components/common/Tooltip/Tooltip';
import FileUpload from '../components/common/FileUpload/FileUpload';
import Autocomplete from '../components/common/Autocomplete/Autocomplete';
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
  const [tabValue, setTabValue] = useState('overview');
  const [stepperActiveStep, setStepperActiveStep] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxState, setCheckboxState] = useState(false);

  // Sample data for table
  const tableHeaders = ['ID', 'Name', 'Email', 'Status'];

  const tableRows = [
    { id: '1', cells: [{ content: '1' }, { content: 'John Doe' }, { content: 'john@example.com' }, { content: 'Active' }] },
    { id: '2', cells: [{ content: '2' }, { content: 'Jane Smith' }, { content: 'jane@example.com' }, { content: 'Active' }] },
    { id: '3', cells: [{ content: '3' }, { content: 'Bob Johnson' }, { content: 'bob@example.com' }, { content: 'Inactive' }] },
  ];

  const stepperSteps = ['Create Account', 'Verify Email', 'Complete Profile'];

  const autocompleteOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Ember'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Component Showcase
              </h1>
              <p className="text-sm text-slate-600 mt-1">Comprehensive demonstration of all reusable components</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="md">
                Documentation
              </Button>
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <Card variant="elevated" size="large" className="p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <Typography variant="h1" className="mb-6 text-slate-900">
              Professional Component Library
            </Typography>
            <Typography variant="p" className="text-slate-700 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              A comprehensive collection of reusable, accessible, and beautifully designed React components built with TypeScript and Tailwind CSS, following modern UI/UX best practices.
            </Typography>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" size="lg">
                Explore Components
              </Button>
              <Button variant="secondary" size="lg">
                View Documentation
              </Button>
            </div>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Typography
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <div className="space-y-4">
                <Typography variant="h1" className="text-slate-900">Heading 1</Typography>
                <Typography variant="h2" className="text-slate-900">Heading 2</Typography>
                <Typography variant="h3" className="text-slate-900">Heading 3</Typography>
                <Typography variant="h4" className="text-slate-900">Heading 4</Typography>
              </div>
            </Card>
            <Card variant="elevated" size="medium">
              <div className="space-y-4">
                <Typography variant="h5" className="text-slate-900">Heading 5</Typography>
                <Typography variant="h6" className="text-slate-900">Heading 6</Typography>
                <Typography variant="p" className="text-slate-700">Body Text - Main paragraph content</Typography>
                <Typography variant="label" className="text-slate-600">Label - Form input label</Typography>
              </div>
            </Card>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Buttons
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Variants */}
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Variants
              </Typography>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">Primary</Button>
                <Button variant="secondary" className="w-full">Secondary</Button>
              </div>
            </Card>

            {/* Colors */}
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Color Variants
              </Typography>
              <div className="space-y-2">
                <Button variant="primary" size="sm" className="w-full">Primary</Button>
                <Button variant="secondary" size="sm" className="w-full">Secondary</Button>
                <Button variant="success" size="sm" className="w-full">Success</Button>
                <Button variant="warning" size="sm" className="w-full">Warning</Button>
                <Button variant="danger" size="sm" className="w-full">Danger</Button>
              </div>
            </Card>

            {/* Sizes */}
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Sizes
              </Typography>
              <div className="space-y-3">
                <Button variant="primary" size="sm" className="w-full">Small</Button>
                <Button variant="primary" size="md" className="w-full">Medium</Button>
                <Button variant="primary" size="lg" className="w-full">Large</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Cards
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-3 text-slate-900 font-semibold">
                Elevated Card
              </Typography>
              <Typography variant="p" className="text-slate-600">
                This card has an elevation with subtle shadow effect for depth.
              </Typography>
            </Card>
            <Card variant="outlined" size="medium">
              <Typography variant="h4" className="mb-3 text-slate-900 font-semibold">
                Outlined Card
              </Typography>
              <Typography variant="p" className="text-slate-600">
                This card has a clean outlined border style variant.
              </Typography>
            </Card>
            <Card variant="default" size="medium">
              <Typography variant="h4" className="mb-3 text-slate-900 font-semibold">
                Default Card
              </Typography>
              <Typography variant="p" className="text-slate-600">
                This is the default card style with minimal styling.
              </Typography>
            </Card>
          </div>
        </section>

        {/* Links Section */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Links
          </Typography>
          <Card variant="elevated" size="medium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Typography variant="h5" className="mb-4 text-slate-900 font-semibold">
                  Link Colors
                </Typography>
                <div className="space-y-3">
                  <Link to="#" label="Primary Link" />
                  <Link to="#" label="Secondary Link" />
                </div>
              </div>
              <div>
                <Typography variant="h5" className="mb-4 text-slate-900 font-semibold">
                  External Links
                </Typography>
                <div className="space-y-3">
                  <Link to="#" label="External Link" target="_blank" />
                  <Link to="#" label="Another External" target="_blank" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Form Controls */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Form Controls
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Select & Number Field
              </Typography>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Select Option
                  </label>
                  <Select
                    value={selectValue}
                    onChange={(value) => setSelectValue(String(value))}
                  >
                    <option value="">Choose an option</option>
                    <option value="opt1">Option 1</option>
                    <option value="opt2">Option 2</option>
                    <option value="opt3">Option 3</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Number Field
                  </label>
                  <NumberField
                    value={numberValue}
                    onChange={(e) => setNumberValue(Number(e.target.value))}
                  />
                </div>
              </div>
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Selection Controls
              </Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="label" className="block text-slate-900 font-semibold mb-3">
                    Checkboxes
                  </Typography>
                  <div className="space-y-3">
                    <Checkbox
                      id="check1"
                      label="Checkbox 1"
                      checked={checkboxState}
                      onChange={(e) => setCheckboxState(e.target.checked)}
                    />
                    <Checkbox id="check2" label="Checkbox 2" defaultChecked />
                    <Checkbox id="check3" label="Checkbox 3 (Disabled)" disabled />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Radio & Autocomplete */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Radio Group
              </Typography>
              <Radiogroup
                name="options"
                options={[
                  { value: 'opt1', label: 'Option 1' },
                  { value: 'opt2', label: 'Option 2' },
                  { value: 'opt3', label: 'Option 3' },
                ]}
              />
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Autocomplete
              </Typography>
              <Autocomplete
                options={autocompleteOptions}
                placeholder="Search frameworks..."
              />
            </Card>
          </div>
        </section>

        {/* Accordion & Tabs */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Accordion & Tabs
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Accordion
              </Typography>
              <div className="space-y-3">
                <Accordion
                  title="Accordion Item 1"
                  isOpen={accordionOpen}
                  onClick={() => setAccordionOpen(!accordionOpen)}
                >
                  <Typography variant="p" className="text-slate-700">
                    Content for the first accordion item. This can contain any HTML or React components.
                  </Typography>
                </Accordion>
                <Accordion title="Accordion Item 2">
                  <Typography variant="p" className="text-slate-700">
                    Content for the second accordion item.
                  </Typography>
                </Accordion>
              </div>
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Tabs
              </Typography>
              <Tabs
                value={tabValue}
                onChange={setTabValue}
                tabs={[
                  { id: 'tab1', label: 'Tab 1', content: <Typography variant="p" className="text-slate-700 mt-4">Content for Tab 1</Typography> },
                  { id: 'tab2', label: 'Tab 2', content: <Typography variant="p" className="text-slate-700 mt-4">Content for Tab 2</Typography> },
                  { id: 'tab3', label: 'Tab 3', content: <Typography variant="p" className="text-slate-700 mt-4">Content for Tab 3</Typography> },
                ]}
              />
            </Card>
          </div>
        </section>

        {/* Progress & Stepper */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Progress & Stepper
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Progress Indicators
              </Typography>
              <div className="space-y-5">
                <div>
                  <Typography variant="label" className="text-slate-700 block mb-2">25% Complete</Typography>
                  <Progress value={25} variant="primary" />
                </div>
                <div>
                  <Typography variant="label" className="text-slate-700 block mb-2">50% Complete</Typography>
                  <Progress value={50} variant="primary" />
                </div>
                <div>
                  <Typography variant="label" className="text-slate-700 block mb-2">75% Complete</Typography>
                  <Progress value={75} variant="primary" />
                </div>
                <div>
                  <Typography variant="label" className="text-slate-700 block mb-2">100% Complete</Typography>
                  <Progress value={100} variant="success" />
                </div>
              </div>
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Stepper
              </Typography>
              <Stepper steps={stepperSteps} activeStep={stepperActiveStep} />
              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setStepperActiveStep(Math.max(0, stepperActiveStep - 1))}
                  disabled={stepperActiveStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setStepperActiveStep(Math.min(stepperSteps.length - 1, stepperActiveStep + 1))}
                  disabled={stepperActiveStep === stepperSteps.length - 1}
                >
                  Next
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Tooltip & Modal */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Tooltip & Modal
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Tooltip
              </Typography>
              <div className="flex gap-3 flex-wrap">
                <Tooltip title="Helpful information" placement="top">
                  <Button variant="primary" size="sm">Top</Button>
                </Tooltip>
                <Tooltip title="Info on right" placement="right">
                  <Button variant="primary" size="sm">Right</Button>
                </Tooltip>
                <Tooltip title="Info below" placement="bottom">
                  <Button variant="primary" size="sm">Bottom</Button>
                </Tooltip>
              </div>
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Modal Dialog
              </Typography>
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              {modalOpen && (
                <Modal
                  title="Confirm Action"
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                >
                  <Typography variant="p" className="text-slate-700 mb-6">
                    Are you sure you want to proceed? This action cannot be undone.
                  </Typography>
                  <div className="flex gap-3 justify-end">
                    <Button variant="secondary" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </div>
                </Modal>
              )}
            </Card>
          </div>
        </section>

        {/* File Upload & Menu */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            File Upload & Menu
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                File Upload
              </Typography>
              <FileUpload accept="image/*" />
            </Card>

            <Card variant="elevated" size="medium">
              <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
                Menu
              </Typography>
              <Menu
                items={[
                  { label: 'Edit', onClick: () => {} },
                  { label: 'Delete', onClick: () => {} },
                  { label: 'Share', onClick: () => {} },
                ]}
              >
                <Button variant="secondary" size="sm">Actions</Button>
              </Menu>
            </Card>
          </div>
        </section>

        {/* Table & Pagination */}
        <section className="mb-20">
          <Typography variant="h2" className="mb-8 text-slate-900 text-3xl font-bold">
            Table & Pagination
          </Typography>
          <Card variant="elevated" size="medium" className="mb-8">
            <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
              Data Table
            </Typography>
            <Table headers={tableHeaders} rows={tableRows} />
          </Card>

          <Card variant="elevated" size="medium">
            <Typography variant="h4" className="mb-6 text-slate-900 font-semibold">
              Pagination
            </Typography>
            <div className="flex justify-center">
              <div className="flex gap-2">
                <Pagination
                  currentPage={currentPage}
                  totalPages={5}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
            <Typography variant="p" className="text-center text-slate-600 mt-4">
              Current Page: {currentPage}
            </Typography>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200/50 pt-12 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card variant="outlined" size="medium">
              <Typography variant="h5" className="text-slate-900 mb-4 font-semibold">
                Documentation
              </Typography>
              <ul className="space-y-2">
                <li><Link to="#" label="Getting Started" /></li>
                <li><Link to="#" label="API Reference" /></li>
                <li><Link to="#" label="Examples" /></li>
              </ul>
            </Card>
            <Card variant="outlined" size="medium">
              <Typography variant="h5" className="text-slate-900 mb-4 font-semibold">
                Resources
              </Typography>
              <ul className="space-y-2">
                <li><Link to="#" label="GitHub" target="_blank" /></li>
                <li><Link to="#" label="Issues" target="_blank" /></li>
                <li><Link to="#" label="Discussions" target="_blank" /></li>
              </ul>
            </Card>
            <Card variant="outlined" size="medium">
              <Typography variant="h5" className="text-slate-900 mb-4 font-semibold">
                Community
              </Typography>
              <ul className="space-y-2">
                <li><Link to="#" label="Discord" target="_blank" /></li>
                <li><Link to="#" label="Twitter" target="_blank" /></li>
                <li><Link to="#" label="Contribute" target="_blank" /></li>
              </ul>
            </Card>
          </div>
          <div className="text-center pt-8 border-t border-slate-200/50">
            <Typography variant="p" className="text-slate-600 text-sm">
              © 2026 React Hub. All rights reserved. Built with React, TypeScript, and Tailwind CSS.
            </Typography>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
