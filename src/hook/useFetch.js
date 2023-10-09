import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const authentication = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTgzZDE0ZGY0MTZhNjg2ODc5YmY5NmRlNTVkOTM0MCIsInN1YiI6IjY0ZjU5N2Q4NWYyYjhkMDExYjRlZWZlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.df5fG-uEZkEcHhxYf7ImyjnQr3cNnK_SzoDA0XM3nfM`,
  },
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url, authentication);

      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
