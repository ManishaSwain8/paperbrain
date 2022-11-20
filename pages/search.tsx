import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Layout from './layout';

const Search = () => {
  const [query, setQuery] = useState('');
  const { user } = useUser();
  const router = useRouter();
  console.log(user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search/${query}`);
  }
  
  return (
    <Layout>
      <div className='flex h-screen items-center justify-center w-screen'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} className='flex flex-col items-center p-6 w-[60vw]'>
          <div className='p-8'>
            <h1 className='text-4xl text-gray-900 font-bold'>Looking for Papers?</h1>
            <h1 className='text-2xl text-gray-500 font-bold'>We have got you covered.</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-2">
            <input type="text" className="bg-white text-green-600 h-14 w-full px-12 rounded-full border-2 focus:outline-none " value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your Search" />
            <button className="border m-3 border-black py-1 w-24 text-sm rounded-full  hover:bg-slate-700 hover:text-slate-50" type='submit'>Search</button>
          </form>
        </motion.div>
        {
          user &&
          <motion.div initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-4 right-12 py-8 px-8 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <img className="block mx-auto h-12 rounded-full sm:mx-0 sm:shrink-0" src={user.picture} alt={user.nickname} />
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  {user.name}
                </p>
                <p className="text-slate-500 font-medium">
                  {user.email}
                </p>
              </div>
              <Link scroll={false} href='/api/auth/logout' className="px-4 py-1 mt-8 transition-all text-sm text-green-600 font-semibold rounded-full border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus-2 focus-green-600 focus-offset-2">
                Logout
              </Link>
            </div>
          </motion.div>
        }
      </div >
    </Layout>
  )
}

export default Search