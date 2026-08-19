import React from 'react';

/**
 * Reusable FormField component for unified text, number, select, and textarea inputs.
 */
export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder,
  icon: Icon,
  rightElement,
  helperText,
  className = '',
  containerClassName = '',
  labelClassName = '',
  rows = 3,
  options = [],
  min,
  max,
  ...props
}) {
  const isTextarea = type === 'textarea';
  const isSelect = type === 'select';

  // Base styles for label
  const labelStyles = labelClassName || "text-primary-text tracking-widest text-sm font-bold block mb-1";

  // Base input classes
  const inputBaseClasses = `w-full text-sm border border-border px-4 py-2.5 text-primary bg-white focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300 transition duration-150 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed`;
  const iconPaddingClass = Icon ? 'pl-9' : '';
  const rightPaddingClass = rightElement ? 'pr-9' : '';
  const inputClasses = `${inputBaseClasses} ${iconPaddingClass} ${rightPaddingClass} ${className}`;

  return (
    <div className={`space-y-1 text-left ${containerClassName}`}>
      {label && (
        <label htmlFor={name} className={labelStyles}>
          {label} {required && <span className="text-amber-700 font-bold">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            className={`${inputBaseClasses} py-2.5 leading-relaxed resize-none ${className}`}
            value={value}
            onChange={onChange}
            {...props}
          />
        ) : isSelect ? (
          <select
            id={name}
            name={name}
            required={required}
            disabled={disabled}
            className={`${inputClasses} bg-white`}
            value={value}
            onChange={onChange}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => {
              const isObj = typeof opt === 'object' && opt !== null;
              const val = isObj ? opt.value : opt;
              const lbl = isObj ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            min={min}
            max={max}
            className={inputClasses}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-sm text-gray-400 mt-1">{helperText}</p>
      )}
    </div>
  );
}
