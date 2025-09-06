// import React from 'react'

// function Button() {
//   return (
//     <div>Button</div>
//   )
// }

// export default Button


// src/components/Button.jsx
const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

