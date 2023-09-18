"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doSignUp = async () => {
        // CSRF保護の初期化
        axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true }).then((res: any) => {
            // 登録するユーザーのデータ
            const requestBody = {
                name: name,
                email: email,
                password: password,
            };
            // APIにリクエストを送信して、データを登録する
            http.post("/api/register", requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res)=>{
                console.log(res);
            });
        });
    }

    return (
        <div>
            <p className='py-2 px-4'>
                Sign Up
            </p>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='name'
                onChange={(e) => {
                    setName(e.target.value);
                }}
            /><br/>
            <input
                type="text"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='email'
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            /><br/>
            <input
                type="password"
                className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm'
                placeholder='password'
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <div>
                <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3"
                    onClick={()=>{
                        doSignUp();
                    }}
                >送信</button>
            </div>
        </div>
    );
}

export default SignUp;
