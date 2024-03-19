import { User } from './types';

// Mock data storage
export let users: User[] = [
  {
    id: 1,
    name: 'Adnan Sameer',
    email: 'adnan@example.com',
    password: 'password2'
  },  
  {
      id: 2,
      name: 'Swapnil Agarwal',
      email: 'swapnil@example.com',
      password: 'password1'
    },
    // When we get a POST request then the new user who signs up, his/her data also get's add here but due to redirection to verification component the data also get's vanished from here
    // I'm applying for frontend role so using all this mock data, but api is working fine, you can check console for the result, over there the new userData array is shown.
  ];