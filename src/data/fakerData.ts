// import { faker } from '@faker-js/faker';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
// }

// interface Category {
//   id: string;
//   name: string;
// }

// const generateUser = (): User => {
//   // Generate a random user ID (assuming it's unique)
//   const id: number = Math.floor(Math.random() * 1000) + 1;

//   // Generate a random username (for demonstration purposes)
//   const username: string = `user${id}`;

//   // Generate a random email (for demonstration purposes)
//   const email: string = `user${id}@example.com`;
//   const password: string = `user${password}`;

//   // Return the generated user object
//   return {
//     id,
//     username,
//     email,
//     password,
//   };
// };

// const generateCategories = (count: number): Category[] => {
//   const categories: Category[] = [];
//   for (let i = 0; i < count; i++) {
//     categories.push({
//       id: faker.datatype.uuid(),
//       name: faker.commerce.department(),
//     });
//   }
//   return categories;
// };

// export { generateUser, generateCategories };
