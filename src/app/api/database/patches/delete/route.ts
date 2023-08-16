import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";




export async function POST(req:NextRequest, res:NextApiResponse) {
    const {data} = await req.json()
    const result =  await prisma.patch.delete({where:{id: data.id}})
}
