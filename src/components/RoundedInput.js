import React from 'react';

const RoundedInput = ({type, classes, setForm, name, value, placeholder}) => {
  return (
    <div className={classes}>
      <input
        type={type || 'text'}
        className="w-full rounded-full px-3 py-1 bg-gray-100"
        onChange={(evt) =>
          setForm((e) => {
            const copy = {...e};
            copy[name] = evt.target.value;
            return copy;
          })
        }
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RoundedInput;
