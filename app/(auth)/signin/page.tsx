import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignIn from '@/components/SignIn';

const Page = () => {

    return (
        <div className='flex'>
            <SignIn />
        </div>
    );
}

export default Page;
