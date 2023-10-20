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

  const changeDataMax = (data) => {
    if (data.total_pages > 500) {
      const newData = { ...data, total_pages: 500 };

      return newData;
    }

    return data;
  };

  const fetchData = async () => {
    setShowPersentageBar(true);
    let getData = null;

    // start loading persentage
    const progressBar = {
      process: 0,
      totalProcess: 100,
      remainderProcess: null,
      finished: null,
    };

    const loadingPersentageBar = setInterval(() => {
      progressBar.process++;
      setLoadingPercentage(progressBar.process);
    }, progressBar.process);
    // end loading persentage

    try {
      const response = await axios.get(url, authentication);
      getData = changeDataMax(response.data);
      setData(getData);
    } catch (error) {
      setError(error);
    } finally {
      clearInterval(loadingPersentageBar);
      progressBar.remainderProcess =
        progressBar.totalProcess - progressBar.process;
      progressBar.finished = progressBar.process + progressBar.remainderProcess;
      setLoadingPercentage(progressBar.finished);
      setLoading(false);
      timeout = setTimeout(() => {
        setShowPersentageBar(false);
        setLoadingPercentage(0);
      }, 800);
    }
  };

  useEffect(() => {
    fetchData();

    return () => clearTimeout(timeout);
  }, [url]);

  return { data, loading, error, loadingPersentage, showPersentageBar };
};

export default useFetch;
