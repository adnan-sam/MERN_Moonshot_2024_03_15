'use client'
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Verification = () => {
    const [userEmail, setEmail] = useState<String | null>(null);
    const [otp, setOtp] = useState<string>('');
    const router = useRouter();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        const fetchCurrUser = async () => {
          try {
            const response = await fetch('/api/getCurrUser');
            if (response.ok) {
              const data = await response.json();
            //   console.log(data); // Fetching curr user data from mock data
            const modifiedEmail = data.email.replace(/^(.{3}).*@/, (match: string, group1: string) => `${group1}***@`);
              setEmail(modifiedEmail);

            } else {
              console.error('Failed to fetch last user:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching last user:', error);
          }
        };
    
        fetchCurrUser();
    }, []);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleVerify = () => {
        const expectedOtp = '12345678'; // Expected OTP
        if (otp === expectedOtp) {
            alert('Verification complete!'); // Show verification complete alert
            router.push('/login'); // Navigate to the login page
        } else {
            alert('Verification failed!, Enter 12345678 as otp'); // Show verification failed alert
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        if (/^\d*$/.test(value) && value.length <= 1) {
            setOtp((prevOtp) => {
                const newOtp = prevOtp.split('');
                newOtp[index] = value;
                return newOtp.join('');
            });

            if (value && index < 7) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && index > 0) {
            setOtp((prevOtp) => {
                const newOtp = prevOtp.split('');
                newOtp[index - 1] = '';
                return newOtp.join('');
            });
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
    <div className="bg-white text-black flex flex-col gap-4 border-solid border-2 border-gray-200 rounded-2xl p-8 w-96">
        <h1 className="text-xl font-bold text-center">Verify your email</h1>
        <div>
            <p className="text-center my-0.5 text-sm">Enter the 8 digit code you have received on</p>
            <p className='text-center text-sm'>{userEmail ? userEmail : "Loading..."}</p>
        </div>
        <div>
            <p className='ml-3.5 text-sm mb-1'>Code</p>
            <div className="flex items-center justify-center">
                {[...Array(8)].map((_, index) => (
                    <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        className="w-7 h-7 border border-gray-300 rounded-md text-center mr-2"
                    />
                ))}
            </div>
        </div>
        <button onClick={handleVerify} className="bg-black text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-white hover:text-black hover:border-black border border-black rounded-md">
            Verify
        </button>
    </div>
  )
}

export default Verification