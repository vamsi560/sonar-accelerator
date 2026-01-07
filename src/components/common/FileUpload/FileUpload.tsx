/**
 * Reusable FileUpload component inspired by MUI File Upload UX.
 * - Does not import MUI
 * - Uses Tailwind classes and tokens from `src/styles/tokens.css`
 * Props supported (map from request):
 * id,name,className,type,value,label,required,disabled,readOnly,tabIndex,error,size,variant,helperText,
 * onChange,onFocus,onBlur,tooltip,aria-*: aria-label, aria-labelledby, aria-describedby, aria-disabled, aria-live, aria-required
 */
import React, { useMemo, useRef, useState } from 'react';
import FileUploadInput from './FileUploadInput';
import fileUploadImg from '../../../assets/fileUpload.png';
import Button from '../Button/Button';
export type Size = 'small' | 'medium' | 'large';
export type Variant = 'contained' | 'outlined' | 'text';

export interface FileUploadProps {
  id?: string;
  name?: string;
  className?: string;
  value?: File | File[] | null;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
  error?: boolean | string;
  size?: Size;
  variant?: Variant;
  helperText?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  tooltip?: React.ReactNode;
  // aria
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-disabled'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-required'?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  className = '',
  label,
  required,
  disabled,
  readOnly,
  tabIndex,
  error,
  size = 'medium',
  variant = 'contained',
  helperText,
  accept,
  multiple = false,
  onChange,
  onFocus,
  onBlur,
  tooltip,
  value,
  ...aria
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  // Convert value to initial file array
  const getInitialFiles = (): File[] => {
    if (Array.isArray(value)) return value;
    if (value) return [value];
    return [];
  };
  
  const [files, setFiles] = useState<File[]>(getInitialFiles());
  const [isDragActive, setIsDragActive] = useState(false);

  const handleClick = () => {
    if (disabled || readOnly) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const uniqueFiles = selectedFiles.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)
    );

    setFiles((prev) => [...prev, ...uniqueFiles]);

    if (onChange) {
      const event = {
        ...e,
        target: {
          ...e.target,
          files: {
            ...e.target.files,
            item: (index: number) => uniqueFiles[index] || null,
            length: uniqueFiles.length,
          } as FileList,
        },
      };
      onChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    const uniqueFiles = droppedFiles.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)
    );

    if (uniqueFiles.length) {
      setFiles((prev) => [...prev, ...uniqueFiles]);

      if (onChange) {
        const event = {
          target: {
            files: {
              item: (index: number) => uniqueFiles[index] || null,
              length: uniqueFiles.length,
            } as FileList,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };

  const clearFiles = () => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
    if (onChange) {
      const event = { target: { files: null } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const fileNames = useMemo(() => {
    return files.length > 0 ? files.map((f) => f.name).join(', ') : '';
  }, [files]);

  const showError = Boolean(error);
  const shouldShowClear = !!(files && files.length > 0) || value;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label ? (
        <label className="text-sm font-medium" htmlFor={id}>
          {label} {required ? <span className="text-red-600">*</span> : null}
        </label>
      ) : null}

      <fieldset
        className="flex items-center gap-3 border-0 p-0 m-0"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <legend className="sr-only">{aria['aria-label'] || 'File upload dropzone'}</legend>
        <FileUploadInput
          ref={inputRef}
          id={id}
          name={name}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          tabIndex={tabIndex}
          aria-label={aria['aria-label']}
          aria-labelledby={aria['aria-labelledby']}
          aria-describedby={aria['aria-describedby']}
          aria-disabled={aria['aria-disabled']}
          aria-live={aria['aria-live']}
          aria-required={aria['aria-required']}
        />

        <Button
          onClick={handleClick}
          variant={variant}
          size={size}
          disabled={disabled}
          aria-disabled={disabled}
          className="!px-4"
          startIcon={<img src={fileUploadImg} width={20} height={20} alt="Upload icon" />}
        >
          Upload files
        </Button>

        <div className="min-w-[120px] w-auto">
          <div
            className={`text-sm truncate px-3 py-2 rounded-md border ${
              showError ? 'border-[var(--color-error)] text-[var(--color-error)]' : 'border-gray-200'
            } bg-white ${isDragActive ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
            title={typeof tooltip === "string" ? tooltip : fileNames}
            aria-live={aria['aria-live']}
          >
            {fileNames || <span className="text-gray-500">No file selected</span>}
          </div>
        </div>

        {shouldShowClear ? (
          <button
            type="button"
            onClick={clearFiles}
            className="text-sm text-gray-600 hover:text-black"
            aria-label="Clear files"
          >
            Clear
          </button>
        ) : null}
      </fieldset>

      {helperText ? (
        <div className={`text-xs ${showError ? 'text-[var(--color-error)]' : 'text-gray-500'}`}>{helperText}</div>
      ) : null}

      {showError && typeof error === 'string' ? (
        <div className="text-xs text-[var(--color-error)]">{error}</div>
      ) : null}
    </div>
  );
};

export { FileUpload };
export default FileUpload;
