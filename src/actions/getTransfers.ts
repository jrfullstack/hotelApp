import CryptoJS from 'crypto-js';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL, VITE_API_KEY, VITE_API_SECRET } = getEnvVariables();

interface Props {
  route: string;
  category: string;
  fields: string;
  language: string;
  codes?: string;
  offset: string;
  limit: string;
}

export const getTransfers = async ({
  route,
  category,
  fields,
  language,
  codes,
  offset,
  limit,
}: Props) => {
  const utcDate = Math.floor(new Date().getTime() / 1000);
  // const assemble2 = `${VITE_API_KEY}${VITE_API_SECRET}${utcDate}`;
  const assemble = VITE_API_KEY+VITE_API_SECRET+utcDate;

  // console.log(assemble2)
  // console.log(process.env.VITE_API_KEY)  

  const hash = CryptoJS.SHA256(assemble);
  const encryption = hash.toString(CryptoJS.enc.Hex);

  const queryParams = `fields=${encodeURIComponent(fields)}&language=${encodeURIComponent(
    language
  )}&codes=${encodeURIComponent(codes || '')}&offset=${encodeURIComponent(
    offset
  )}&limit=${encodeURIComponent(limit)}`;

  const endpoint = `${VITE_API_URL}/${route}/${category}?${queryParams}`;

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': VITE_API_KEY,
      'X-Signature': encryption,
    },
    
  };

  try {
    const resp = await fetch(endpoint, requestOptions);

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
    }

    const data = await resp.json();
    console.log({ data });
  } catch (error) {
    console.error(error);
  }
};
