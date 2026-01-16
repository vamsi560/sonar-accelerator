import React, { useState, useRef, useEffect } from 'react';

interface AutocompleteProps {
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  autoFocus?: boolean;
  autoComplete?: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
  disableClearable?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInputChange?: (value: string) => void;
  tooltip?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-invalid'?: boolean;
  'aria-required'?: boolean;
  options?: string[];
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      id,
      name,
      className = '',
      value = '',
      placeholder = 'Search...',
      label,
      required = false,
      disabled = false,
      readOnly = false,
      title,
      size = 'medium',
      autoFocus = false,
      autoComplete = 'off',
      onChange,
      onReset,
      disableClearable = false,
      onFocus,
      onBlur,
      onInputChange,
      tooltip,
      options = [],
      ...ariaProps
    },
    ref,
  ) => {
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle outside click to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChange?.(inputValue);
      onInputChange?.(inputValue);

      const hasInputValue = inputValue.length > 0;
      if (hasInputValue) {
        const filtered = options.filter((option) =>
          option.toLowerCase().includes(inputValue.toLowerCase()),
        );
        setFilteredOptions(filtered);
        setIsOpen(filtered.length > 0);
      } else {
        setFilteredOptions([]);
        setIsOpen(false);
      }
    };

    const handleOptionSelect = (option: string) => {
      onChange?.(option);
      onInputChange?.(option);
      setIsOpen(false);
      setFilteredOptions([]);
    };

    const handleClear = () => {
      onChange?.('');
      onInputChange?.('');
      onReset?.();
      setFilteredOptions([]);
      setIsOpen(false);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      if (value) {
        setIsOpen(true);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const sizeClasses = {
      small: 'text-sm px-2 py-1',
      medium: 'text-base px-3 py-2',
      large: 'text-lg px-4 py-3',
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
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
            value={value}
            placeholder={placeholder}
            disabled={disabled || readOnly}
            readOnly={readOnly}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            title={title}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`w-full border border-gray-300 rounded-md outline-none transition-colors
              ${sizeClasses[size]}
              ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}
              ${readOnly ? 'bg-gray-50' : ''}
              hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200
              ${className}`}
            {...ariaProps}
          />

          {/* Clear button */}
          {value && !disableClearable && !disabled && !readOnly && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear input"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown options */}
        {isOpen && filteredOptions.length > 0 && (
          <ul
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Autocomplete options"
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                className="px-3 py-2 hover:bg-blue-50 text-gray-900 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  role="option"
                  aria-selected="false"
                  className="w-full text-left py-0 px-0 bg-transparent border-0 hover:bg-transparent cursor-pointer text-gray-900"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Tooltip */}
        {tooltip && (
          <p className="text-xs text-gray-500 mt-1" id={`${id}-tooltip`}>
            {tooltip}
          </p>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
