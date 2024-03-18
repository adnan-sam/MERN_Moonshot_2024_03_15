'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { SignupData } from '@/data/types';
import { signup } from '@/pages/api/mockapi';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupData>({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(formData);
      // Show success message
      window.alert('User registered successfully!');
      // Redirect to login page after successful signup
      router.push('/verify');
    } catch (error) {
      console.error('Signup failed:', error);
      // Show error message
      window.alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container bg-white text-black border-solid border-2 border-gray-200 rounded-2xl p-8 w-96">
      <h1 className='text-xl font-bold mb-6 text-center'>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input type="text" id="name" name="name" onChange={handleChange} placeholder="Enter your name" required
                 className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" name="email" onChange={handleChange} placeholder="Enter your email" required
                 className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <div className="form-group mb-6">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} placeholder="Enter your password" required
                 className="mt-1 p-2 w-full border rounded-md"/>
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded-md mt-4">CREATE ACCOUNT</button>
      </form>
      <div className="flex justify-center mb-8">
        <p className="text-sm mt-8 inline-block ">Have an Account? <Link href="/login"><span className='font-bold'>LOGIN</span></Link></p>
      </div>
    </div>
  );
}

export default Signup;