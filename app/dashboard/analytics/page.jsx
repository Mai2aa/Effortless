import React from 'react'

function page() {
        const containerStyle = {
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center',     // Center vertically
            height: '90vh',         // Full viewport height
            textAlign: 'center',      // Center text
        };
    
        const textStyle = {
            fontWeight: 'bold',
            padding: '30px',
            fontSize: '30px', // Optional: adjust font size as needed
        };
  return (
    <div style={containerStyle}>
            <div style={textStyle}>Coming Soon ...</div>
        </div>
  );
};

export default page