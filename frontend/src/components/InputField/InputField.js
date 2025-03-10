import React from 'react';
import './styles.scss';

const InputField = ({ label, type, name, value, onChange, placeholder, options, multiline, disabled, required = false }) => {
    /* 
    A versatile input field component that can render different types of form inputs.
    This component is designed to be used throughout the application's forms for consistent styling and behavior.
    
    Props:
    - label: String - Optional text label displayed above the input
    - type: String - Input type (text, number, email, password, date, time, url, datetime-local)
    - name: String - Name attribute for the input field, used for form handling
    - value: Any - Current value of the input field
    - onChange: Function - Handler called when input value changes
    - placeholder: String - Placeholder text displayed when input is empty
    - options: Array - For select inputs, array of {value, label} objects
    - multiline: Boolean - When true, renders a textarea instead of an input
    - disabled: Boolean - When true, disables the input field
    - required: Boolean - When true, adds required indicator to the label (defaults to false)
    */
    const allowedTypes = ['text', 'number', 'email', 'password', 'date', 'time', 'url', 'datetime-local'];

    const inputType = allowedTypes.includes(type) ? type : 'text';

    return (
        <div className="input-field-container">
            {label && <span className="input-label">{label} {required && <span className="required-label">*</span>}</span>}
            {options ? (
                <select 
                    name={name} 
                    className="select-field" 
                    value={value} 
                    onChange={onChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : multiline ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="textarea-field"
                />
            ) : (
                <input 
                    type={inputType} 
                    name={name} 
                    className="input-field" 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default InputField;