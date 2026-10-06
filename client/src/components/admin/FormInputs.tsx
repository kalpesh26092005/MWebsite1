import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] mb-2 flex items-center gap-1.5">
          {label}
          {props.required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#57534E] dark:text-[#A8A29E] pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5] placeholder-[#57534E] dark:placeholder-[#A8A29E] ${
              icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-[#EAE2D7] dark:border-stone-800 focus:border-[#8B6508] dark:focus:border-amber-500 focus:ring-amber-500/20'
            } focus:ring-2 focus:outline-none ${className}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-[#57534E] dark:text-[#A8A29E]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        <label htmlFor={textareaId} className="block text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] mb-2 flex items-center gap-1.5">
          {label}
          {props.required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5] placeholder-[#57534E] dark:placeholder-[#A8A29E] resize-y min-h-[100px] ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-[#EAE2D7] dark:border-stone-800 focus:border-[#8B6508] dark:focus:border-amber-500 focus:ring-amber-500/20'
          } focus:ring-2 focus:outline-none ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <motion.p
            id={`${textareaId}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-[#57534E] dark:text-[#A8A29E]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        <label htmlFor={selectId} className="block text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] mb-2 flex items-center gap-1.5">
          {label}
          {props.required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-[#121214] text-[#1C1917] dark:text-[#FAF7F5] appearance-none cursor-pointer ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-[#EAE2D7] dark:border-stone-800 focus:border-[#8B6508] dark:focus:border-amber-500 focus:ring-amber-500/20'
          } focus:ring-2 focus:outline-none ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <motion.p
            id={`${selectId}-error`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-[#57534E] dark:text-[#A8A29E]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
}

export const Checkbox = ({ label, checked, onChange, error, helperText, disabled = false }: CheckboxProps) => (
  <div className="flex items-start gap-3">
    <div className="relative mt-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-5 h-5 rounded border-2 appearance-none cursor-pointer transition-colors bg-white dark:bg-[#121214] border-[#EAE2D7] dark:border-stone-800 checked:bg-[#8B6508] dark:checked:bg-amber-500 checked:border-[#8B6508] dark:checked:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121214]"
        aria-invalid={error ? 'true' : 'false'}
      />
    </div>
    <div className="flex-1">
      <label className="text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] cursor-pointer select-none">
        {label}
      </label>
      {helperText && !error && (
        <p className="mt-1 text-sm text-[#57534E] dark:text-[#A8A29E]">{helperText}</p>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  </div>
);

export interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, error, helperText, required, children }: FormFieldProps) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] mb-2 flex items-center gap-1.5">
      {label}
      {required && <span className="text-red-500" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
        role="alert"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </motion.p>
    )}
    {helperText && !error && (
      <p className="mt-1.5 text-sm text-[#57534E] dark:text-[#A8A29E]">{helperText}</p>
    )}
  </div>
);

export const FormActions = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#EAE2D7] dark:border-stone-800">
    {children}
  </div>
);