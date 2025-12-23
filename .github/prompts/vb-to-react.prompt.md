1. Analyze and Abstract
"Review the WinForms code to understand the UI structure, data flow, and user interactions."
"Identify patterns and repeated UI elements to abstract into reusable React components."
"Break down the UI into logical, self-contained React components."
"Ensure each component has a clear responsibility and can be reused across different pages."
3. Component Mapping:
`Panel` → <div> or custom Panel component.
`Label` → <label> or custom Label component.
`GroupBox` → custom Card or GroupBox component.
`ComboBox` → custom Select component.
`TabControl`/`TabPage` → custom Tabs/Tab components.
`Button` → custom Button component.
`TextBox` → custom Input or InputNumber component.
`DateTimePicker` → custom DatePicker component.
`CheckBox` → custom Checkbox component.
`RadioButton` → custom Radio component.
"Convert the given VB.NET Windows Forms Designer snippet into a React functional component using TypeScript."
"Map each VB Label to a `<label>` element in React with `htmlFor` linked to the input."
"Map each VB TextBox to an `<input type='text'>` element with state management using `useState`."
"Map each VB ComboBox to a `<select>` element with sample options and controlled state."
"Map each VB DateTimePicker to an `<input type='date'>` element with controlled state."
"Map each VB CheckBox to an `<input type='checkbox'>` element with controlled state."
"Wrap the generated inputs inside a `<form>` element with an `onSubmit` handler returning form data."
"Use a strongly typed TypeScript `interface` for form data and enforce strict typing in state."
"Ensure accessibility best practices such as `htmlFor`, semantic form elements, and keyboard navigation support."