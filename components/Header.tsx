"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const Header = () => {
    const [signInUser, setSignInUser] = useState({
        id: '',
        name: '',
        email: '',
        account_type_id: '',
    });

    // ログアウトの処理
    const doLogout = async () => {
        http.post('/api/logout').then((res: any) => {
            console.log(res);
        })
    }




    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">Rodin</span>
                </div>
                <div className="block lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                    </div>
                    <div className="flex">
                        <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mx-2">
                            マイページ
                        </button>
                        <button
                            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mx-2"
                            onClick={()=>{
                                doLogout();
                            }}
                        >
                            ログアウト
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;