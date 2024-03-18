'use client'
import Link from 'next/link';
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { User } from '@/data/types';

const Navbar = () => {
  const [currUser, setCurrUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const response = await fetch('/api/getCurrUser');
        if (response.ok) {
          const data = await response.json();
        //   console.log(data); // Fetching curr user data from mock data
          setCurrUser(data);
        } else {
          console.error('Failed to fetch last user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching last user:', error);
      }
    };

    fetchCurrUser();
}, []);

  return (
    <div className='flex flex-col bg-white text-black'>
        {currUser && currUser.name &&
        // This div will be displayed only if there is a used already logged in, as I'm using mock data so there will be a user already present
          <div className="flex space-x-4 text-xs justify-end px-3 mt-2">
            <Link href="/">
              <p>Help</p>
            </Link>
            <Link href="/">
              <p>Orders & Returns</p>
            </Link>
            {currUser && currUser.name ? <span>{`Hi, ${currUser.name.split(' ')[0]}`}</span> : <span>Loading...</span>}
          </div>
        }
      <nav className="flex max-w-full items-center justify-between pt-2 p-4 space-x-4">
      <div className="font-bold text-lg">
        <Link href="/">
          <p>ECOMMERCE</p>
        </Link>
      </div>
      <div className="hidden md:flex space-x-4 text-sm font-bold">
        <Link href="/">
          <p>Categories</p>
        </Link>
        <Link href="/">
          <p>Sale</p>
        </Link>
        <Link href="/">
          <p>Clearance</p>
        </Link>
        <Link href="/">
          <p>New stock</p>
        </Link>
        <Link href="/">
          <p>Trending</p>
        </Link>
      </div>
      <div className='flex space-x-6'>
        <Link href="/">
            <CiSearch />
        </Link>
        <Link href="/">
            <FiShoppingCart />
        </Link>
      </div>
    </nav>

    {/* Offer */}
    <div className='flex bg-gray-200 text-xs justify-center py-1.5 space-x-2'>
        <FaChevronLeft />
        <p>Get 10% off on business sign up</p>
        <FaChevronRight />
    </div>
    </div>
  );
};

export default Navbar;
