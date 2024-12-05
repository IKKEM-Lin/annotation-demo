import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Worker } from '@react-pdf-viewer/core';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF1cWGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFiW39dcnVVRmFVUU1/Ww==');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      {/* <HighlightExample fileUrl={`${PUBLIC_URL}/a.pdf`} /> */}
      {/* <HighlightExample fileUrl={"/public/a.pdf"} /> */}
    </Worker>
  </StrictMode>
);
