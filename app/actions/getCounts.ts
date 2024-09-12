import { getServerSession } from "next-auth";

import prisma from "@/app/libs/prismadb";

export type Count = {
    name: string,
    value: number,
    number: string
}

export const getCountsFromDb = async ()=> {
    const countDatas = await prisma?.count.findMany();

    return countDatas;
};

