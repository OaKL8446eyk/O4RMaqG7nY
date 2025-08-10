// 代码生成时间: 2025-08-10 23:27:21
 * A utility for calculating hash values of input strings.
 *
 * @author Your Name
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

// HashCalculator component
const HashCalculator = () => {
  // State to hold input value and computed hash
  const [inputValue, setInputValue] = useState('');
  const [computedHash, setComputedHash] = useState('');
  
  // Handler for input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handler for computing hash
  const computeHash = () => {
    try {
      const hash = crypto.createHash('sha256').update(inputValue).digest('hex');
      setComputedHash(hash);
    } catch (error) {
      console.error('Error computing hash:', error);
      // Optionally display an error message to the user
    }
  };

  // Render the component
  return (
    <div>
      <h1>Hash Calculator</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a string to calculate its hash"
      />
      <button onClick={computeHash}>Calculate SHA-256 Hash</button>
      {computedHash && <p>Computed Hash: {computedHash}</p>}
    </div>
  );
};

export default HashCalculator;