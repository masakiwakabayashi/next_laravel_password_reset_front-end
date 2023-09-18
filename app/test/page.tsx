"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import axios from 'axios';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const Page = () => {
    const [signInUser, setSignInUser] = useState({});

    const getSignInUser = async () => {
        const signInUser = await http.get('/api/user');
        console.log(signInUser.data);
        setSignInUser(signInUser.data);
    }

    useEffect(() => {
        getSignInUser();
    }, []);

    console.log(signInUser);

    return (
        <div>
            テストページ
        </div>
    );
}

export default Page;
