import React from 'react';
import './styles.scss';

const InputField = ({ label, type, name, value, onChange, placeholder, options, multiline, disabled }) => {
    const allowedTypes = ['text', 'number', 'email', 'password', 'date', 'time', 'url', 'datetime-local'];

    const inputType = allowedTypes.includes(type) ? type : 'text';

    return (
        <div className="input-field-container">
            {label && <span className="input-label">{label}</span>}
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