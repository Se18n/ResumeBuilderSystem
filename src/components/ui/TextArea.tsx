import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  containerClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helper,
  containerClassName = '',
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm';
  const errorClasses = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';
  const disabledClasses = props.disabled ? 'bg-gray-100 text-gray-500' : '';
  
  const textareaClasses = `
    ${baseClasses}
    ${error ? errorClasses : ''}
    ${disabledClasses}
    ${className}
  `;

  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label htmlFor={textAreaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        id={textAreaId}
        className={textareaClasses}
        rows={rows}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textAreaId}-error` : helper ? `${textAreaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${textAreaId}-error`}>
          {error}
        </p>
      )}
      
      {!error && helper && (
        <p className="mt-1 text-sm text-gray-500" id={`${textAreaId}-helper`}>
          {helper}
        </p>
      )}
    </div>
  );
};

export default TextArea;