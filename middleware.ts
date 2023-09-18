import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios';
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

// ログインしているかどうかを判別して、ログインしていない場合はサインインページにリダイレクトする
export async function middleware(request: NextRequest) {
    console.log('こんにちは');
    if (!request.nextUrl.pathname.startsWith('/signin') && !request.nextUrl.pathname.startsWith('/signup')) {
        try {
            const res = await http.get('/api/user');
            console.log(res.data);
        } catch (err) {
            console.log(err);
            // return NextResponse.redirect(new URL('/signin', request.url));
        }
    }
}

// // この記述がないとエラーになる
// export const config = {
//     matcher: "/",
// };

