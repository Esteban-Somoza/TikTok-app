import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from 'utils'

import useAuthStore from 'store/authStore'

function Navbar() {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <Image className='cursos-pointer' src={Logo} alt='TikTik' layout='responsive' />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile?.userName ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'> 
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' /> {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href='/'>
                <>
                  <Image src={userProfile.image} 
                  width={40} 
                  height={40} 
                  className='rounded-full cursor-pointer' 
                  alt='profile shoot' />
                </>
              </Link>
            )}
            <button type='button' className='px-2' onClick={() => {
              console.log('logout');
              googleLogout();
              removeUser();
            }}>
              <AiOutlineLogout color='red' fontSize={21}/>
            </button>
          </div>
        ) : (
          <div>
            <GoogleLogin onSuccess={(response) => createOrGetUser(response, addUser)} onError={() => console.log('error')} />
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Navbar