// src/components/common/SuccessMessage.js

import React from 'react';

const SuccessMessage = ({ message }) => (
  <div className="bg-green-100 text-green-700 p-4 mb-4 border-l-4 border-green-500 rounded">
    <p>{message}</p>
  </div>
);

export default SuccessMessage;
