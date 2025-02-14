import React from 'react';

const InputForm = ({ name, label, value, onChange, error, type = "text" }) => {
  return (
    <div className="m-2 p-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type}
        id={name}
        className="form-control w-25"
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger w-25">{error}</div>}
    </div>
  );
};

export default InputForm;
