import { Session, getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest):Promise<any> {
    const session: Session | null  =  await getServerSession(options);
    
    return NextResponse.json({
        authenticated: !!session,
        session
    })
}