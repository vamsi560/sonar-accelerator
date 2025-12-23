import  { useState, useRef } from "react";
import Select from "../components/common/Select";

export default function SelectShowcase() {
  const inputRef = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState("option2");

  return (
    <div className="space-y-10 p-6">

      {/* ------------------------ OUTLINED ------------------------ */}
      <div>
        <h2 className="font-bold mb-3">Outlined Variant</h2>

        <Select
          id="outlined-select"
          name="outlinedName"
          className="mb-4"
          type="text"
          value={value}
          defaultValue="option1"
          label="Outlined Select"
          required
          disabled={false}
          readOnly={false}
          selected={false}
          htmlFor="outlined-select"
          title="Outlined Select Example"
          expanded={false}
          error={false}
          size="medium"
          variant="outlined"
          inputRef={inputRef}
          autoFocus={false}
          autoComplete="on"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => console.log("focused")}
          onBlur={() => console.log("blurred")}
          aria-label="Outlined aria label"
          aria-labelledby="outlined-heading"
          aria-describedby="outlined-desc"
          aria-disabled={false}
          aria-selected={false}
          aria-controls="outlined-controls"
          aria-live="polite"
          aria-invalid={false}
          aria-required={true}
          aria-orientation="vertical"
        >
          <option id="outlined-option1" value="option1">
            Option 1
          </option>
          <option id="outlined-option2" value="option2">
            Option 2
          </option>
        </Select>
      </div>

      {/* ------------------------ FILLED ------------------------ */}
      <div>
        <h2 className="font-bold mb-3">Filled Variant</h2>

        <Select
          id="filled-select"
          name="filledName"
          className="mb-4"
          type="text"
          defaultValue="a"
          label="Filled Select"
          required={false}
          disabled={false}
          readOnly={false}
          selected={false}
          htmlFor="filled-select"
          title="Filled Example"
          expanded
          error={true}     // show error state
          size="large"
          variant="filled"
          autoFocus={false}
          autoComplete="off"
          onChange={(e) => console.log("Filled change:", e.target.value)}
          aria-label="filled aria"
          aria-invalid={true}
          aria-required={false}
          aria-live="assertive"
          aria-orientation="horizontal"
        >
          <option id="filled-a" value="a">Alpha</option>
          <option id="filled-b" value="b">Bravo</option>
        </Select>
      </div>

      {/* ------------------------ STANDARD ------------------------ */}
      <div>
        <h2 className="font-bold mb-3">Standard Variant</h2>

        <Select
          id="standard-select"
          name="standardName"
          className=""
          type="text"
          defaultValue="x"
          label="Standard Select"
          required
          disabled
          readOnly
          selected
          htmlFor="standard-select"
          title="Standard Example"
          expanded={false}
          error={false}
          size="small"
          variant="standard"
          inputRef={null}
          autoFocus={false}
          autoComplete="on"
          aria-label="standard aria"
          aria-selected={true}
          aria-controls="standard-controls"
          aria-live="off"
          aria-invalid={false}
          aria-required={true}
          aria-orientation="vertical"
        >
          <option id="standard-x" value="x">X-ray</option>
          <option id="standard-y" value="y">Yankee</option>
        </Select>
      </div>
    </div>
  );
}
