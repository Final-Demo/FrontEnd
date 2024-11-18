// src/components/common/ErrorMessage.js

import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 text-red-700 p-4 mb-4 border-l-4 border-red-500 rounded">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
