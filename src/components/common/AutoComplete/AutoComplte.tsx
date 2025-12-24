import React, { useState, useMemo } from 'react';

/**
 * AutoComplete Component
 * 
 * A searchable input component that filters options based on user input.
 * Features filtering, selection, and accessibility support.
 * 
 * Props:
 * - options: Array of options to filter
 * - value: Currently selected value
 * - placeholder: Input placeholder text
 * - label: Label for the input
 * - onChange: Callback when value changes
 * - size: Input size (small, medium)
 * - disabled: Disable the input
 * - required: Mark as required
 * - ARIA attributes for accessibility
 */
export interface AutoCompleteProps<T = string> {
  id?: string;
  name?: string;
  className?: string;
  value?: T | null;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  title?: string;
  size?: 'small' | 'medium';
  autoFocus?: boolean;
  onChange?: (value: T | null) => void;
  disableClearable?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  tooltip?: string;
  options: T[];
  // ARIA
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
}

const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  <T = string,>(
    {
      id,
      name,
      className = '',
      placeholder = 'Search...',
      label = 'AutoComplete',
      required = false,
      disabled = false,
      readOnly = false,
      title,
      size = 'medium',
      autoFocus = false,
      onChange,
      disableClearable = false,
      onFocus,
      onBlur,
      options = [],
      ...ariaProps
    }: AutoCompleteProps<T>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // Filter options based on input value
    const filteredOptions = useMemo(() => {
      if (!inputValue.trim()) return options;
      return options.filter((option) =>
        String(option).toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [inputValue, options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setIsOpen(true);
    };

    const handleOptionSelect = (option: T) => {
      setInputValue(String(option));
      onChange?.(option);
      setIsOpen(false);
    };

    const handleClear = () => {
      setInputValue('');
      onChange?.(null);
    };

    const sizeClass = size === 'small' ? 'py-1 text-sm' : 'py-2 text-base';

    const containerClass = `relative w-full ${className}`;
    const inputClass = `w-full px-3 ${sizeClass} border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'} ${className}`;

    return (
      <div className={containerClass}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={name}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            disabled={disabled || readOnly}
            required={required}
            autoFocus={autoFocus}
            className={inputClass}
            onChange={handleInputChange}
            onFocus={(e) => {
              setIsOpen(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setTimeout(() => setIsOpen(false), 200);
              onBlur?.(e);
            }}
            title={title}
            aria-label={ariaProps['aria-label'] || label}
            aria-labelledby={ariaProps['aria-labelledby']}
            aria-describedby={ariaProps['aria-describedby']}
            aria-disabled={ariaProps['aria-disabled'] ?? disabled}
            aria-controls={ariaProps['aria-controls']}
            aria-live={ariaProps['aria-live']}
            aria-invalid={ariaProps['aria-invalid']}
            aria-required={ariaProps['aria-required'] ?? required}
            aria-autocomplete="list"
            autoComplete="off"
            list={`${id || 'autocomplete'}-datalist`}
          />
          <datalist id={`${id || 'autocomplete'}-datalist`}>
            {filteredOptions.map((option) => (
              <option key={String(option)} value={String(option)} />
            ))}
          </datalist>

          {/* Clear button */}
          {inputValue && !disableClearable && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown options */}
        {isOpen && filteredOptions.length > 0 && (
          <select
            value={inputValue}
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedOption = filteredOptions.find(
                (option) => String(option) === selectedValue
              );
              if (selectedOption) {
                handleOptionSelect(selectedOption);
              }
            }}
            className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg"
          >
            <option value="">Select an option</option>
            {filteredOptions.map((option) => (
              <option 
                key={String(option)} 
                value={String(option)}
                aria-selected={inputValue === String(option)}
              >
                {String(option)}
              </option>
            ))}
          </select>
        )}

        {/* No results message */}
        {isOpen && inputValue && filteredOptions.length === 0 && (
          <div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg p-3 text-sm text-gray-500">
            No matching options
          </div>
        )}
      </div>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';

export default AutoComplete;
