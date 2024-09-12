'use client';

import { useEffect, useState } from "react";
import useSettings from "./hooks/useSettings";
import { getCountsFromDb } from "./actions/getCounts";
import axios from "axios";
import { CountCard } from "./components/CountCard";

export default function Home() {
  const darkMode = useSettings((state) => state.darkMode);
  const [counts, setCounts] = useState<{ id: string; name: string; count: number; number: string; }[]>([]);
  const [title, setTitle] = useState("");

  const COUNTS_URL = '/api/count';
  const TITLE_URL = '/api/count/title';

  async function fetchData() {
    try {
      const [countsResponse, titleResponse] = await Promise.all([
        axios.get(COUNTS_URL),
        axios.get(TITLE_URL)
      ]);

      const filteredCounts = countsResponse.data.filter((index: any) => index.number !== 'title');
      setCounts(filteredCounts);
      setTitle(titleResponse.data.name);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <div>
      <div className="flex flex-col justify-center text-center items-center min-h-screen">
        <h2 className="text-4xl dark:text-white">{title}</h2>
        <div className="flex flex-col justify-center text-center items-center dark:text-white pt-4 gap-y-4">
          {counts?.map((index) => (
            <div key={index.id} className="text-xl">
              <CountCard id={index.id} name={index.name} value={index.count} number={index.number} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
