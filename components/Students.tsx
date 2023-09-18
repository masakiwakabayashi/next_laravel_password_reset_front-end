"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Next.js13ではnext/routerではなくnext/navigationからuseRouterをインポートする
import { useRouter } from 'next/navigation';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

const Students = () => {
    // 生徒一覧を格納するstate
    const [students, setStudents] = useState([]);
    // router
    const router = useRouter();

    // LaravelのAPIにリクエストを送り、生徒一覧を取得する関数
    const getStudents = async () => {
        const response = await fetch('http://localhost:8080/api/students');
        const json = await response.json();
        setStudents(json.data);
    }

    // ページが読み込まれたら生徒一覧を取得する
    useEffect(() => {
        getStudents();
    }, []);


    // 生徒のデータを削除する処理
    const deleteStudent = async (id: number) => {
        // APIにリクエストを送信して、データを削除する
        http.delete(`/api/students/${id}`).then(()=>{
            // 完了したら、再度データを取得
            getStudents();
        });
    }


    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            名前
                        </th>
                        <th scope="col" className="px-3 py-3 text-right">
                            <button
                                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                onClick={()=>{
                                    router.push('/students/create');
                                }}
                            >
                                新規登録
                            </button>
                        </th>
                        <th scope="col" className="px-3 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student: any)=>{
                            return (
                                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {student.id}
                                    </th>
                                    <td className="px-6 py-4 text-base">
                                        {student.name}
                                    </td>
                                    <td className="px-3 py-4 text-right">
                                        <button
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={()=>{
                                                router.push(`/students/edit/${student.id}`);
                                            }}
                                        >
                                            編集
                                        </button>
                                    </td>
                                    <td className="px-3 py-4">
                                        <button
                                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            onClick={()=>{
                                                deleteStudent(student.id);
                                            }}
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Students;
