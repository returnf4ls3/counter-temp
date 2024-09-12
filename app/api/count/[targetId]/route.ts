import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

interface IParams {
    targetId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const targetId = params.targetId;
    
    const count = await prisma.count.findUnique({
        where: {
            number: targetId
        }
    });

    return NextResponse.json(count);
}

export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {
    const session = await getServerSession();

    if (!session) {
        return NextResponse.json({ error: "Invalid session"}, { status: 401 });
    }   

    const body = await request.json();

    const targetId = params.targetId;

    let targetCount: any = 0;
    const totalCount = await prisma.count.findUnique({
        where: {
            number:targetId
        }
    })

    targetCount = totalCount?.count + body.amount;

    const countDB = await prisma.count.update({
        where: {
            number: targetId
        },
        data: {
            count: targetCount
        }
    });

    return NextResponse.json(countDB);
}