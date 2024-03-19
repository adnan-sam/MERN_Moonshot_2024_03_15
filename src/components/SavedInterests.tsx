'use client'
import React, { useState, useEffect } from 'react';
// import { interestData } from '@/data/interest'; // Import interestData
import { User } from '@/data/types';
import { useRouter } from 'next/navigation';
import { faker } from '@faker-js/faker';

interface Interest {
  id: number;
  name: string;
}

const SavedInterests = () => {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 6;
  const [interestData, setInterestData] = useState<Interest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const response = await fetch('/api/getCurrUser');
        if (response.ok) {
          const data = await response.json();
          console.log(data.id); // Fetching curr user data from mock data
          if(!data.id) {
            router.push('/login');
          }
          if(data) {
            const fakerData: Interest[] = Array.from({ length: 100 }, (_, index) => ({
              id: index + 1,
              name: faker.commerce.product(),
            }));
            setInterestData(fakerData);
          }
        } else {
          console.error('Failed to fetch last user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching last user:', error);
      }
    };

      fetchCurrUser();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedInterests = [...selectedInterests];
    const targetId = parseInt(event.target.value, 10);

    if (event.target.checked) {
      newSelectedInterests.push(targetId);
    } else {
      const index = newSelectedInterests.indexOf(targetId);
      newSelectedInterests.splice(index, 1);
    }

    setSelectedInterests(newSelectedInterests);
  };

  const totalPages: number = Math.ceil(interestData.length / itemsPerPage);

  const pageNumbers: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentInterests: Interest[] = interestData.slice(indexOfFirstItem, indexOfLastItem);
  const [isLastPageDisplayed, setIsLastPageDisplayed] = useState(false);
  const [isFirstPageDisplayed, setIsFirstPageDisplayed] = useState(false);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setIsFirstPageDisplayed(pageNumber <= 4);
    setIsLastPageDisplayed(totalPages <= pageNumber + 3);
  };

  useEffect(() => {
    setIsLastPageDisplayed(totalPages <= currentPage + 3);
    setIsFirstPageDisplayed(currentPage <= 4);
  }, [currentPage, totalPages]);

    return (
        <div className="flex flex-col gap-4 border-solid border-2 border-gray-200 rounded-2xl p-8 w-96">
          <h1 className="text-xl font-bold text-center">Please mark your interests!</h1>
          <p className="text-center mb-6">We will keep you notified.</p>
          <div className="flex flex-col justify-start ml-4">
            <p className='font-bold mb-3'>My saved interests!</p>
            <div>
              {currentInterests.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={item.id.toString()}
                    value={item.id}
                    checked={selectedInterests.includes(item.id)}
                    onChange={handleChange}
                    className="appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-black checked:border-transparent"
                  />
                  <label htmlFor={item.id.toString()} className="ml-2">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            {/* Pagination feature */}
            <div className="flex justify-start mt-8 mb-4">
              {/* Go to First Page */}
              <button
                className={`text-gray-400 font-bold rounded-full px-1`}
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </button>

              {/* Go to Previous Page */}
              <button
                className={`text-gray-400 font-bold rounded-full px-2`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {!isFirstPageDisplayed && <p className='text-gray-400'>...</p>}
              {/* Page Numbers */}
              {pageNumbers.slice(
                Math.max(0, Math.min(totalPages - 6, currentPage <= 4 ? 0 : currentPage - 3)), 
                Math.min(totalPages, currentPage <= 4 ? 7 : currentPage + 3)
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`font-bold rounded-full px-1 ${currentPage === pageNumber ? 'text-black font-bold' : 'text-gray-400'}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              {!isLastPageDisplayed && <p className='text-gray-400'>...</p>}
              {/* Go to Next Page */}
              <button
                className={`text-gray-400 font-bold px-2 rounded-full`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>

              {/* Go to Last Page */}
              <button
                className={`text-gray-400 font-bold px-1 rounded-full`}
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      );
    };

export default SavedInterests