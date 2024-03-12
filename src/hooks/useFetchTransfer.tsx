import { useEffect, useState } from "react"

interface FetchResult {
  data: unknown[];
  isLoading: boolean;
}

export const useFetchTransfer = () => {

  const [data, setData] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState( true );
  

  const url = "https://api.test.hotelbeds.com/transfer-cache-api/1.0/locations/terminals?fields=ALL&language=es&codes=PMI&offset=1&limit=10";

  const apiKey = '6c283a51234f840091c29b61fdb0a8cf';

  const getTransfers = async () => {

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Api-key': apiKey,
        }
      });
      const responseData = await resp.json();
      setData(responseData);
      setIsLoading(false);

    } catch (error) {

      console.error('Error fetching data:', error);
      setIsLoading(false);
    }

  };

  useEffect(() => {
    getTransfers()
  }, [])

  return {
    data,
    isLoading
  } as FetchResult;
}
