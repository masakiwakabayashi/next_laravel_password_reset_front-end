"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { AxiosError } from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // エラーメッセージを格納するstate
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const postData = async () => {
        // エラーメッセージを初期化
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        // CSRF保護の初期化
        axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true }).then((res: any) => {
            console.log(res);
            // ログイン処理
            http.post('/api/login', {email, password}).then((res: any) => {
                console.log(res);
            }).catch((err: AxiosError)=>{
                if (err.response?.data.errors) {
                    if (err.response?.data.errors.email) {
                        setEmailErrorMessage(err.response?.data.errors.email[0]);
                    }
                    if (err.response?.data.errors.password) {
                        setPasswordErrorMessage(err.response?.data.errors.password[0]);
                    }
                } else {
                    setEmailErrorMessage('');
                    setPasswordErrorMessage(err.response?.data.message);
                }
            });
        });
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='w-1/2'>
                <input
                    type="text"
                    className='appearance-none border-2 border-teal-300 rounded-full w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:px-8 focus:border-teal-300 my-3 min-w-sm'
                    placeholder='email'
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <div className="py-1 px-4">
                    <p className="text-red-500">{emailErrorMessage}</p>
                </div>
                <input
                    type="password"
                    className='appearance-none border-2 border-teal-300 rounded-full w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:px-8 focus:border-teal-300 my-3 min-w-sm'
                    placeholder='password'
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className="py-1 px-4">
                    <p className="text-red-500">{passwordErrorMessage}</p>
                </div>
                <div>
                    <button
                        className="shadow bg-teal-300 hover:bg-teal-200 focus:shadow-outline focus:outline-none w-full text-white font-bold py-4 px-5 rounded-full my-3 min-w-sm text-xl"
                        onClick={()=>{
                            postData();
                        }}
                    >ログイン</button>
                </div>
                <div className='text-center text-gray-500'>
                    <Link href="/forgot_password">
                        パスワードを忘れた場合
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;