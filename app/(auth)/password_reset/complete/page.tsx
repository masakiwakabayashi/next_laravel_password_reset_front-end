"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/signin');
        }, 3000);
    },[]);

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <p>
                パスワードの再設定が完了しました。
                3秒後にログイン画面にリダイレクトします。
            </p>
        </div>
    );
}

export default Page;
