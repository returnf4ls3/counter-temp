'use client';

import { useEffect, useState } from "react";
import useSettings from "./hooks/useSettings";
import axios from "axios";
import { CountCard } from "./components/CountCard";

export default function Home() {
  const darkMode = useSettings((state) => state.darkMode);
  const [counts, setCounts] = useState<{ id: string; name: string; count: number; number: string; }[]>([]);
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState(0);

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

  const calcTotalMoney = () => {
    let t = 0;
    
    counts.forEach((item) => {
      t += ((item.count) * 10);
    });
    setTotal(t);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calcTotalMoney();
  }, [counts]);

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
          <div className="text-xl pt-8">
            <p>10월 1일 납부하실 금액</p>
            <p>{total}원</p>
          </div>
        </div>
      </div>
    </div>
  );
}
