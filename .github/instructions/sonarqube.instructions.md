# Frontend Code Quality & Accessibility Guard Prompt

## Purpose

A unified, practical guard to prevent recurring **SonarQube / SonarCloud issues** during **writing, reviewing, and refactoring** frontend code.

This guide consolidates **all common error patterns** seen across the codebase into a single reference.

Applicable to **TypeScript + React** projects.

---

## Overall Quality Goals

All frontend code should aim to:

- Be clean, readable, and maintainable
- Minimize cognitive load
- Follow WCAG-compliant accessibility
- Prefer semantic HTML over ARIA
- Avoid patterns that trigger SonarQube / SonarCloud violations

---

## <strong>1. Cognitive Complexity – Refactoring Guard</strong>

### When to Trigger

- Deeply nested `if / else`
- Multiple loops or logical operators
- Sonar reports **High Cognitive Complexity**

### Refactoring Rules

- Use **guard clauses** to reduce nesting
- Extract **intent-based helper functions**
- Replace complex boolean expressions with **named variables**
- Keep the main function as **high-level steps**

### Preserve

- Behavior
- Side effects
- Public APIs

### Output Expectations

- Explain why complexity is high
- Provide refactored code
- List helper functions with their intent

---

## <strong>2. Nested Ternary – JSX Readability Guard</strong>

### Task

- Identify nested ternary expressions
- Refactor them into independent variables or helper functions
- Keep JSX declarative and readable
- Preserve logic and behavior

### Rules

- ❌ No nested ternaries inside JSX
- ✅ Prefer `const` variables before JSX return
- ✅ Use semantic names (`buttonClass`, `labelText`, `ariaSort`)

### Return

- Refactored code
- Brief explanation of the refactor

---

##<strong> 3. Accessibility – Semantic HTML First</strong>

### Always Prefer Native HTML

- Action → `<button>`
- Navigation → `<a>`
- Image → `<img alt="...">`
- Dialog → `<dialog>`
- Progress → `<progress>`
- Lists → `<ul><li>`
- Selectable lists → `<select>`, `<option>`, `<datalist>`

---

## <strong>4. Non-Interactive Element Guard</strong>

### ❌ Never Do

- Assign interactive roles to `div`, `span`, `ul`, `li`
- Use `role="button"`, `role="option"`, `role="listbox"` unnecessarily
- Attach `onClick`, `onKeyDown` to non-interactive elements

### ✅ Always Do

- Replace with proper native elements
- Use ARIA **only when native HTML cannot solve the problem**

### Goal

Zero “Non-interactive elements should not be assigned interactive roles” errors

---

## <strong>5. ARIA Attribute Safety Guard</strong>

Before adding ARIA:

- Verify the element’s **implicit role**
- Ensure the attribute is **supported by that role**
- Confirm ARIA is **strictly necessary**

### ❌ Never Use

- Unsupported ARIA attributes for a role
- `aria-selected` without `role="option"`
- Interactive ARIA roles on non-interactive elements

### ✅ Rules of Thumb

- Native semantics > ARIA
- If unsure → remove ARIA
- Validate against WAI-ARIA specifications

### Mandatory Rules

- `role="option"` → `aria-selected` is required

---

## <strong>6. Keyboard & Focus Accessibility</strong>

### Rules

- Visible clickable elements must be keyboard accessible
- If not using `<button>` or `<a>`:
  - Add `tabIndex={0}`
  - Add keyboard handlers

### Mindset

- Keyboard first
- Screen-reader friendly
- Semantic over styled `div`s

---

## <strong>7. Form Accessibility Guard</strong>

### Rules

- Every `<label>` must be associated with a control

### Valid Patterns

- `<label htmlFor="id">` + `<input id="id" />`
- Wrap input inside `<label>`

---

## <strong>8. React Key Usage Rules (Sonar-Safe)</strong>

### ❌ Forbidden

- Never use array index (`index`, `rowIndex`) as `key`

### ✅ Mandatory

- Use stable, unique identifiers (`id`, `uuid`)
- Use domain-specific unique fields
- As last resort, use composite stable keys

### Best Practice

- Use `forEach` for logic
- Use `map` strictly for rendering UI

---

## <strong>9. Conditional Logic Quality</strong>

### Rules

- Avoid negated conditions (`!isValid`)

### Prefer

- Positive naming (`isInvalid`) for readability

---

## <strong>10. Regular Expression Complexity Guard</strong>

### Rules

- Avoid massive, all-in-one regex patterns
- Avoid duplicate characters in character classes
- Limit alternations (`|`) and nested groups

### Refactoring Strategy

- Break regex into logical parts
- Extract reusable patterns into constants
- Prefer readable conditions over regex-heavy logic

---

## <strong>11. Deprecated API Usage</strong>

### Rules

- Do not use deprecated APIs

### Action

- Replace immediately with recommended alternatives

---

## <strong>12. Data Rendering Safety</strong>

### Rules

- Do not rely on default object stringification

### Do

- Explicitly format objects before rendering

---

## <strong>13. CSS & Styling Quality</strong>

### Rules

- No duplicate CSS properties
- Ensure WCAG-compliant color contrast
- Remove empty or unused rules
- Avoid ambiguous spacing between inline elements

---

## <strong>14. Naming & Code Hygiene</strong>

### Rules

- Do not use misleading names like `Error` for variables
- Remove unnecessary escape characters in strings and regex

---

## <strong>Final Pre-Commit Checklist</strong>

Before committing code, confirm:

- Cognitive complexity within limits
- No nested ternaries
- Native HTML preferred over ARIA
- No ARIA misuse
- All labels correctly associated
- Keyboard accessibility supported
- No array index used as key
- No deprecated APIs
- Regex is simple and readable
- CSS has no duplicates or contrast issues

---

**Goal:** Zero repeat SonarQube issues, clean accessibility, and maintainable frontend code.
 