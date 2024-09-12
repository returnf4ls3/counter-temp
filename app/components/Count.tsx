'use client';

import { useEffect, useState } from "react";
import Counter from "./input/Counter";
import Button from "./Button";
//import { getCountsFromLocalStorage, saveCountsToLocalStorage } from "../actions/getCounts";

const Count = () => {
    const [counts, setCounts] = useState<number[]>(() => {
        //const savedCounts = getCountsFromLocalStorage();
        //return savedCounts !== null ? savedCounts : [];
        return [];
    });

    useEffect(() => {
        if (counts[0] == null) addCounter();
    });

    useEffect(() => {
        //saveCountsToLocalStorage(counts);
    }, [counts]);

    const setCount = (index: number, value: number) => {
        const newCounts = [...counts];
        newCounts[index] = value;
        setCounts(newCounts);
    };
    
    const addCounter = () => {
        setCounts([...counts, 0]);
    };
    
    const removeCounter = (index: number) => {
        const newCounts = counts.filter((_, i) => i !== index);
        setCounts(newCounts);
    }

    return ( 
        <div className="w-auto flex flex-col justify-center items-center space-y-8 pt-10">
            {counts.map((count, index) => (
                <div key={index}>
                    <Counter value={count} onChange={(value) => setCount(index, value)} onRemove={() => removeCounter(index)} />
                </div>
            ))}
        </div>
    );
}
 
export default Count;