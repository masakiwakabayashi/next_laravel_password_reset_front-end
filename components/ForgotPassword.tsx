"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [mailSent, setMailSent] = useState(false);
    // ローディングスピナーの状態
    const [loading, setLoading] = useState<boolean>(false);
    // エラーメッセージを格納するstate
    const [errorMessage, setErrorMessage] = useState('');


    const postData = async () => {
        // ローディングアニメーションを開始
        setLoading(true);
        // エラーメッセージを初期化
        setErrorMessage('');
        // CSRF保護の初期化
        axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true }).then((res: any) => {
            console.log(res);
            // パスワードリセットのメールを送信
            http.post('/api/password/reset/request', {email}).then((res: any) => {
                console.log(res.data.mail_sent);
                setMailSent(res.data.mail_sent);
                // ローディングアニメーションを終了
                setLoading(false);
            }).catch((err: AxiosError)=>{
                // err.response.data.messageがエラーメッセージ
                setErrorMessage(err.response?.data.message);
                // ローディングアニメーションを終了
                setLoading(false);
            });
        });
    }

    const loadingStyle: any = {
        display: loading ? "block" : "none",
        position: "absolute",
        zIndex: "10",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.5)",
    }

    return (
        <>
            <div style={loadingStyle} className="loading">
                <div className="h-screen w-screen flex justify-center items-center">
                    <div className="animate-spin h-20 w-20 border-4 border-teal-300 rounded-full border-t-transparent"></div>
                </div>
            </div>
            <div className='h-screen w-screen flex justify-center items-center'>
                {
                    mailSent ? (
                        <div className=''>
                            <p>
                                パスワード再設定メールの送信が完了しました。
                            </p>
                        </div>
                    ) : (
                        <div className='w-1/2'>
                            <input
                                type="text"
                                className='appearance-none border-2 border-teal-300 rounded-full w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:px-8 focus:border-teal-300 my-3 min-w-sm'
                                placeholder='email'
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            /><br/>
                            <div className="py-1 px-4">
                                <p className="text-red-500">{errorMessage}</p>
                            </div>
                            <div>
                                <button
                                    className="shadow bg-teal-300 hover:bg-teal-200 focus:shadow-outline focus:outline-none w-full text-white font-bold py-4 px-5 rounded-full my-3 min-w-sm text-xl"
                                    onClick={()=>{
                                        postData();
                                    }}
                                >パスワード再設定メールを送信</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default ForgotPassword;
