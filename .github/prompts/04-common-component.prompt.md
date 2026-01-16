---
mode: 'agent'
tools: ['create_file', 'insert_edit_into_file']
context: ../design-system/base.md
description: 'Always ask for fresh componentName, props, and styling details.'
---
Create a new React functional component named `{{componentName}}` with the following props: {{props}}.

Use TypeScript and follow best practices:

- Define a `Props` interface
- Use `const Component = ({ props }: Props) => {}` syntax
- Map the css classes using token.css 
- Do you have an **image or screenshot** to base the design on?
  - If yes: match layout, spacing, and UI from the image.
  - If not: use a standard, universal layout for the type of component.
- Do you want to apply **custom styles** (colors, fonts, layout)?
  - If yes:
    - What's the preferred color scheme?
    - Any specific fonts, paddings, or border styles?
  - If no:
    - Use clean, standard Tailwind classes.
- Include a default export for the component
- "Add ARIA labels to improve screen reader compatibility"
Save the file as `src/components/common/{{componentName}}/{{componentName}}.tsx`
