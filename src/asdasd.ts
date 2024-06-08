import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

export default function middleware(req:NextRequest) {
    let verify = Cookies.get('verify');
    console.log(verify);
    let url = req.url;
    if (!verify && url.includes('/student-form')) {
        return NextResponse.redirect(new URL('/student-login', req.url))
    }
    if(!verify && url.includes('/trainer-form')) {
        return NextResponse.redirect(new URL('/trainer-login', req.url))
    }
    return NextResponse.next();
}