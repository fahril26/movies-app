/* eslint-disable react-hooks/exhaustive-deps */
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
  const [loadingPersentage, setLoadingPercentage] = useState(0);
  const [showPersentageBar, setShowPersentageBar] = useState(true);
  let timeout = null;

  const fetchData = async () => {
    setLoadingPercentage(0);
    setShowPersentageBar(true);
    let count = 0;
    const total = 100;
    let remainder = null;
    let finished = null;

    const interval = setInterval(() => {
      count++;
      setLoadingPercentage(count);
    }, [count]);

    try {
      const response = await axios.get(url, authentication);
      clearInterval(interval);
      remainder = total - count;
      finished = count + remainder;

      setData(response.data);
      setLoading(false);
      setLoadingPercentage(finished);
      timeout = setTimeout(() => {
        setShowPersentageBar(false);
      }, 600);
    } catch (error) {
      setError(error);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    fetchData();

    return () => clearTimeout(timeout);
  }, [url]);

  return { data, loading, error, loadingPersentage, showPersentageBar };
};

export default useFetch;
