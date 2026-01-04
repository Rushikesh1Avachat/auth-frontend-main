import { Button } from 'flowbite-react';
import React from 'react';
import { SiFusionauth } from 'react-icons/si';

function OtpForm({ inputsRef, title, handleSubmit }) {
  const handleKeyUp = (index, e) => {
    const value = e.target.value;

    // allow only digits
    if (!/^\d?$/.test(value)) {
      e.target.value = '';
      return;
    }

    if (e.key === 'Backspace' && index > 0 && !value) {
      inputsRef.current[index - 1]?.focus();
    }

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '');
    paste.split('').slice(0, 6).forEach((digit, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = digit;
      }
    });

    const lastIndex = Math.min(paste.length, 6) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">
          {title ?? 'Verify Email By OTP'}
        </h1>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-2 space-x-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="block w-9 h-9 text-center font-bold border rounded-lg"
              ref={(el) => (inputsRef.current[index] = el)}
              onKeyUp={(e) => handleKeyUp(index, e)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <div className="mt-6 mb-4 flex justify-center">
          <Button type="submit" className="w-48">
            Verify OTP
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Please enter the 6 digit OTP sent to you.
        </p>
      </form>
    </>
  );
}

export default OtpForm;
