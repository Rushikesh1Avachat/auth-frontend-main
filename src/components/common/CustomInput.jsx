import { Label, TextInput } from 'flowbite-react';
import React from 'react';

const CustomInput = ({ label, errors, placeholder, name, ...rest }) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor={label} value={label} />
      </div>
      <TextInput
        id={label}
        name={name}
        type="text"
        placeholder={placeholder}
        required
        color={errors ? 'failure' : ''}
        helperText={
          errors ? (
            <>
              <span className="font-medium">{errors}</span>
            </>
          ) : null
        }
        {...rest}
      />
    </>
  );
};

export default CustomInput;
