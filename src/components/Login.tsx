'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/pages/api/mockapi';
import { User } from '@/data/types';

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      // Call the login function to check if the user exists with the provided credentials
      const user: User | undefined = await login(email, password);

      if (user) {
        // If login is successful, redirect to interests page
        router.push('/interests');
      } else {
        // If login failed, display an error message
        alert('Invalid email or password, Please use the mockdata email and password!!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white text-black border-solid border-2 border-gray-200 rounded-2xl p-8 w-96">
      <h1 className='text-xl font-bold mb-6 text-center'>Login</h1>
      <div className='text-center mb-4'>
        <h3 className='font-bold'>Welcome back to ECOMMERCE</h3>
        <p className='text-xs my-2'>The next gen business marketplace</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required 
            className="mt-1 p-2 w-full border rounded-md" onChange={handleChange} value={formData.email} />
        </div>
        <div className="form-group mb-6 relative">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Enter your password" required 
            className="mt-1 p-2 w-full border rounded-md pr-10" onChange={handleChange} value={formData.password} />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-8 text-sm underline"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded-md mt-4">LOGIN</button>
      </form>
      <hr className='mt-6 border-gray-300'/>
      <div className="flex justify-center mb-8">
        <p className="text-sm mt-8 inline-block ">Don`t have an Account? <Link href="/signup"><span className='font-bold'>SIGN UP</span></Link></p>
      </div>
    </div>
  );
}

export default Login;
