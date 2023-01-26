import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;


export function middleware(req){
    const { cookies } = req;
    const jwt = cookies.OursiteJWT;
    
    const url = req.url;
    const urltrue = req.nextUrl.clone()
    const urldash = req.nextUrl.clone()
    urltrue.pathname = '/admin'
    urldash.pathname = '/dashboard/users'

    if(url.includes("/admin")){
        console.log('in admin')
        if(jwt){
            try{
                verify(jwt,secret);
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

            verify(jwt,secret);
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