

// import { useEffect } from 'react';
import { useFetchTransfer } from './hooks/useFetchTransfer';

function App() {
  const {data} = useFetchTransfer();


  const handleData = () => {
    console.log({data})
  }
  
  
  return (
    <>
      <h1>Hola Mundo</h1>
      <button onClick={handleData}>Fetch</button>
    </>
  );
}

export default App;
