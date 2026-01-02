import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StudentSignup = () => {
  const [rollnumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/studentsignup`, {
        rollnumber,
        password
      });
      console.log(response.data);
      alert('Signup successful!');
      navigate('/studentlogin');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error during signup');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primaryBg">
      <Card className="w-[350px] bg-borderColor text-primaryText">
        <CardHeader className="justify-center">
          <CardTitle>Student Sign Up</CardTitle>
          <CardDescription>Sign up for a student account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rollnumber">Roll Number</Label>
                <Input
                  id="rollnumber"
                  name="rollnumber"
                  type="text"
                  required
                  value={rollnumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Enter your Roll Number"
                  className="bg-borderColor text-primaryText border border-buttonBg focus:ring-2 focus:ring-buttonBg"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the Password"
                  className="bg-borderColor text-primaryText border border-buttonBg focus:ring-2 focus:ring-buttonBg"
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            <div className="flex flex-col items-center mt-4">
              <Button type="submit" className="bg-buttonBg text-buttonText">Sign Up</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className='flex gap-2 mt-0'>
            <p>Have an account?</p>
            <Link to={'/studentlogin'}>
              <span className="inline-block font-semibold text-blue-500 hover:text-blue-700 transition duration-300">
                Sign In
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentSignup;
