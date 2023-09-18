"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from "next/navigation";
import { AxiosError } from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    // トークンとメールアドレスの検証結果
    const [isVerified, setIsVerified] = useState(false);
    // トークンとメールアドレスの検証エラーメッセージ
    const [errorMessage, setErrorMessage] = useState('');
    // 動的ルーティングのパスを取得して、そこからトークンを取得する
    const pathname = usePathname();
    const pathnameSegments = pathname.split('/');
    const token = pathnameSegments[pathnameSegments.length - 1];
    // searchParamsでURLのパラーメタからメールアドレスを取得する
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    // router
    const router = useRouter();
    // ローディングスピナーの状態
    const [loading, setLoading] = useState<boolean>(false);
    // パスワードと確認パスワードのエラーメッセージを格納するstate
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState('');


    // ページがレンダリングされたらトークンとメールアドレスの検証を実行する
    useEffect(()=>{
        console.log(token);
        console.log(email);
        doVerifyTokenAndEmail();
    },[]);


    // トークンとメールアドレスの検証
    const doVerifyTokenAndEmail = async () => {
        // CSRF保護の初期化
        axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true }).then((res: any) => {
            console.log(res);
            // URLに含まれているトークンとメールアドレスが有効かどうかを検証
            http.post('/api/password/reset/verify', {email, token}).then((res: any) => {
                console.log(res.data.verified);
                setIsVerified(res.data.verified);
                if (!res.data.verified) {
                    setErrorMessage(res.data.message);
                }
            });
        });
    }

    // パスワードのリセット
    const doResetPassword = async () => {
        // エラーメッセージを初期化
        setPasswordErrorMessage('');
        setPasswordConfirmationErrorMessage('');
        // ローディングアニメーションを開始
        setLoading(true);
        // CSRF保護の初期化
        axios.get('http://localhost:8080/sanctum/csrf-cookie', { withCredentials: true }).then((res: any) => {
            console.log(res);
            // パスワードリセット
            http.post('/api/password/reset', {password, password_confirmation, email, token}).then((res: any) => {
                console.log(res);
                // パスワード変更完了画面に遷移
                router.push('/password_reset/complete');
            }).catch((err: AxiosError)=>{
                // ローディングアニメーションを終了
                setLoading(false);
                if (err.response?.data.errors) {
                    if (err.response?.data.errors.password) {
                        setPasswordErrorMessage(err.response?.data.errors.password[0]);
                    }
                    if (err.response?.data.errors.password_confirmation) {
                        setPasswordConfirmationErrorMessage(err.response?.data.errors.password_confirmation[0]);
                    }
                }
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
            <div>
            {
                isVerified ? (
                    <div className='h-screen w-screen flex justify-center items-center'>
                        <div className='w-1/2'>
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
                            <input
                                type="password"
                                className='appearance-none border-2 border-teal-300 rounded-full w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:px-8 focus:border-teal-300 my-3 min-w-sm'
                                placeholder='password confirmation'
                                onChange={(e) => {
                                    setPasswordConfirmation(e.target.value);
                                }}
                            />
                            <div className="py-1 px-4">
                                <p className="text-red-500">{passwordConfirmationErrorMessage}</p>
                            </div>
                            <div>
                                <button
                                    className="shadow bg-teal-300 hover:bg-teal-200 focus:shadow-outline focus:outline-none w-full text-white font-bold py-4 px-5 rounded-full my-3 min-w-sm text-xl"
                                    onClick={()=>{
                                        doResetPassword();
                                    }}
                                >パスワードを変更</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>{errorMessage}</>
                )
            }
        </div>
        </>
    );
}

export default ResetPassword;
