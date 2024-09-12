import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    const countDatas = await prisma?.count.findMany();

    return NextResponse.json(countDatas);
};