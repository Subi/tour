import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";



export async function GET(req:NextRequest, res:NextApiResponse) {
    const data =  await prisma.patch.findMany({
        orderBy : {
            state: 'asc'
        },
        include: {
            Author: true
        }
    })
    return NextResponse.json(data)
}

