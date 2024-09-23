import React, { useRef } from 'react';
function pdfForm() {
  const componentRef = useRef();
  return (
    <>
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
        <h1>PDF FILE</h1>
      </div>
    </>
  );
}

export default pdfForm;
