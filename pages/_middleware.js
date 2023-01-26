import { NextResponse } from "next/server";
import * as jose from 'jose';

export async function middleware(req){
    const { cookies } = req;
    const jwt = req.cookies.OursiteJWT;
    const secret = process.env.SECRET;

    const url = req.url;
    const urltrue = req.nextUrl.clone()
    const urldash = req.nextUrl.clone()

    urltrue.pathname = '/admin'
    urldash.pathname = '/dashboard/users'

    if(url.includes("/admin")){
        if(jwt){
            try{
                await jose.jwtVerify(
                    jwt, new TextEncoder().encode(secret)
                );
                console.log('right jwt')
                return NextResponse.redirect(urldash)
            }catch(e){
                return NextResponse.next();
            }
        }
    }

    if(url.includes("/dashboard")){
        if(jwt === undefined){
            console.log('no cookie')
            return NextResponse.redirect(urltrue)   
        }
        try{
            const test = await jose.jwtVerify(jwt, new TextEncoder().encode(secret));
            console.log('right jwt')
            NextResponse.next()  
            if(url.includes("/users")){
                return NextResponse.next();
            }
            return NextResponse.redirect(urldash)
        }catch(e){
            console.log('errror')
            return NextResponse.redirect(urltrue)
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*','/admin/:path*'],
  }