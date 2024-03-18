import { User, SignupData } from '@/data/types';
import { users } from "@/data/userData";

// Signup API endpoint
export const signup = async (userData: SignupData): Promise<void> => {
    // Assuming some validation is done on the userData
    const { name, email, password } = userData;
    const newUser: User = { id: users.length + 1, name, email, password };
    users.push(newUser);
    console.log(users);
  };

// Login API endpoint
export const login = async (email: string, password: string): Promise<User | undefined> => {
    // Check if the user exists with the given email and password
    const user = users.find((u) => u.email === email && u.password === password);
    return user;
  };



