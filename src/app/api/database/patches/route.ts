import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { GetResult } from "@prisma/client/runtime/library";



export async function GET(req:NextApiRequest, res:NextApiResponse) {
    const data =  await prisma.patch.findMany({
        where: {
            isApproved: true
        }
    })
    return NextResponse.json(data)
}
