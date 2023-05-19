import React, { useEffect } from "react";

// Alert component definition
const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    // Create a timer that calls the removeAlert function after 3000 milliseconds (3 seconds)
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts or when removeAlert changes
    return () => clearTimeout(timeout);
  }, [removeAlert]);

  // Render the alert message
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
