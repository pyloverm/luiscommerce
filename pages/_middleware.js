import { NextResponse } from "next/server";
import * as jose from 'jose';

export async function middleware(req){
    const { cookies } = req;
    const jwt = req.cookies.OursiteJWT;
    const secret = process.env.SECRET;

    const url = req.url;
    const urltrue = req.nextUrl.clone()
    const urldash = req.nextUrl.clone()
    const urldemerde = req.nextUrl.clone()
    const urldemerde1 = req.nextUrl.clone()
    const urldemerde2 = req.nextUrl.clone()
    urltrue.pathname = '/admin'
    urldash.pathname = '/dashboard/users'
    urldemerde.pathname = '/'+JSON.stringify(req.cookies.OursiteJWT)
    
    urldemerde1.pathname = '/test'
    urldemerde2.pathname = '/test2'
    if(url.includes("/admin")){
        console.log('in admin')
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
            return NextResponse.redirect(urldemerde)   
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
            return NextResponse.redirect(urldemerde2)
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*','/admin/:path*'],
  }