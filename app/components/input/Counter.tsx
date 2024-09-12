'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Button from "../Button";

interface CounterProps {
    value: number
    onChange: (value: number) => void;
    onRemove: () => void;
}

const Counter = ({ value, onChange, onRemove }: CounterProps) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const onReduce = useCallback(() => {
        onChange(value - 1);
    }, [value, onChange]);

    const onClear = useCallback(() => {
        onChange(0);
    }, [onChange]);

    return (
        <div>
            <div className="flex flex-row items-center justify-between pt-10">
                <button className="flex flex-col w-10 h-10 mx-32 rounded-full border-[1px] border-neutral-400 items-center justify-center dark:text-white text-black cursor-pointer hover:opacity-80 transition"
                    onClick={onReduce}
                    aria-label="Decrease value">
                    <AiOutlineMinus />
                </button>
                <div className="font-light text-4xl dark:text-white text-black">
                    {value}
                </div>
                <button className="flex flex-col w-10 h-10 mx-32 rounded-full border-[1px] border-neutral-400 items-center justify-center dark:text-white text-black cursor-pointer hover:opacity-80 transition"
                    onClick={onAdd}
                    aria-label="Increase value">
                    <AiOutlinePlus />
                </button>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-10 pt-6">
                <Button className="w-32" label="Clear" onClick={() => onClear()} />
                <Button className="w-32" label="Remove" onClick={() => onRemove()}/>
            </div>
        </div>
    );
}
 
export default Counter;