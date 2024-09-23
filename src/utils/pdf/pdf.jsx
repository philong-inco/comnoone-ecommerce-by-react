import React, { useRef } from 'react';
function pdfForm() {
  const componentRef = useRef();
  return (
    <>
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
        <h1 className="text-center my-3 border py-2">PDF FILE</h1>
      </div>
    </>
  );
}

export default pdfForm;
