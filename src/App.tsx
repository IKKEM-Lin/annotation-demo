import HighlightExample from './PdfReviewer';

function App() {
  return (
    <>
      <h1>PDF标注Demo</h1>
      <HighlightExample fileUrl={`/viewer.pdf`} />
    </>
  );
}

export default App;
