import { NextResponse } from "next/server";

const secret = process.env.SECRET;


export function middleware(req){
    const { cookies } = req;
    const jwt = req.cookies.OursiteJWT;
    
    const url = req.url;
    const urltrue = req.nextUrl.clone()
    const urldash = req.nextUrl.clone()
    const urldemerde = req.nextUrl.clone()
    const urldemerde1 = req.nextUrl.clone()
    urltrue.pathname = '/admin'
    urldash.pathname = '/dashboard/users'
    urldemerde.pathname = '/'+JSON.stringify(req.cookies.OursiteJWT)
    urldemerde1.pathname = '/test'
    if(url.includes("/admin")){
        console.log('in admin')
        if(jwt){
            try{
                fetch('/api/ver_jwt');
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
            fetch('/api/ver_jwt');
            console.log('right jwt')
            return NextResponse.redirect(urldemerde1)   
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