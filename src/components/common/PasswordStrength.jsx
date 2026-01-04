import React from 'react';

const PasswordStrength = ({ value = '' }) => {
  const hasMinLength = value.length >= 6;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNuber = /[0-9]/.test(value);
  const hasSymbol = /[@#$%*]/.test(value);
  const hasMin12Lenth = value.length >= 12;

  const strength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNuber,
    hasSymbol,
    hasMin12Lenth,
  ].filter(Boolean).length;

  const progressBars = Math.min(strength, 4);

  return (
    <div className="space-y-2 p-3">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Must have at least 6 characters
      </h3>

      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            className={`h-1 ${
              i < progressBars ? 'bg-cyan-700' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
      <p>It’s better to have:</p>
      <ul>
        <li className="mb-1 flex items-center">
          {hasUpperCase && hasLowerCase ? (
            <svg
              className="me-2 h-3.5 w-3.5 text-cyan-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          )}
          Upper & lower case letters
        </li>
        <li className="mb-1 flex items-center">
          {hasSymbol ? (
            <svg
              className="me-2 h-3.5 w-3.5 text-cyan-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          )}
          A symbol (#$&)
        </li>
        <li className="flex items-center">
          {hasMin12Lenth ? (
            <svg
              className="me-2 h-3.5 w-3.5 text-cyan-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="me-2.5 h-3 w-3 text-gray-300 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          )}
          A longer password (min. 12 chars.)
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
