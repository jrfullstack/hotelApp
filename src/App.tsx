// import { useEffect } from 'react';
import axios from 'axios';
// import { getTransfers } from './actions/getTransfers';
import { getEnvVariables } from './helpers';
import CryptoJS from 'crypto-js';



const {VITE_API_URL, VITE_API_KEY, VITE_API_SECRET} = getEnvVariables();


function App() {

  // const getTerminals = async() => {
  //   const route = 'locations'
  //   const category = 'terminals'
  //   const fields = 'ALL'
  //   const language = 'es'
  //   const codes = 'PMI'
  //   // const countryCodes = ''
  //   const offset = '1'
  //   const limit = '10'
  //   await getTransfers({
  //     route,
  //     category,
  //     fields,
  //     language,
  //     codes,
  //     offset,
  //     limit,
  //   })
  // }

  // getTerminals()
  

  const getTerminals = async() => {
    const utcDate = Math.floor(new Date().getTime() / 1000);  
    const assemble = (VITE_API_KEY+VITE_API_SECRET+utcDate);

    const hash = CryptoJS.SHA256(assemble);
    const encryption = (hash.toString(CryptoJS.enc.Hex));
    // console.log({VITE_API_SECRET})
    const data = await axios.get(`${VITE_API_URL}/locations/terminals`, {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': VITE_API_KEY,
          'X-Signature': encryption,
        },
        params: {
          // route,
          // category,
          fields: 'ALL',
          language: 'es',
          codes: 'PMI',
          offset: '1',
          limit: '10',
        },
        
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));

      console.log({data})

  }
  
  
  getTerminals()

  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  )
}

export default App
