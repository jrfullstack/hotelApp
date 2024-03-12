import CryptoJS from 'crypto-js';
import { getEnvVariables } from '../helpers';

const {VITE_API_URL, VITE_API_KEY, VITE_API_SECRET} = getEnvVariables();


interface Props {
  route: string;
  category: string;
  fields: string;
  language: string;
  codes?: string;
  countryCodes?: string;
  offset: string;
  limit: string;
}

export const getTransfers = async({
  route, 
  category,
  fields,
  language,
  codes,
  // countryCodes,
  offset,
  limit, 
}: Props) => {

  const utcDate = Math.floor(new Date().getTime() / 1000);  
  const assemble = (VITE_API_KEY+VITE_API_SECRET+utcDate);

  const hash = CryptoJS.SHA256(assemble);
  const encryption = (hash.toString(CryptoJS.enc.Hex));

  
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Api-Key': VITE_API_KEY,
      'X-Signature': encryption,
    },
    // mode: "cors",npm i
    
    
  };
  const endpoint = `${VITE_API_URL}/${route}/${category}?fields=${fields}&language=${language}&codes=${codes}&pffset=${offset}&limit=${limit}`;
  
  try {
    const resp = await fetch(endpoint, requestOptions);
    const {data} = await resp.json();
    console.log({data})
    
  } catch (error) {
    console.log(error)
  }



}