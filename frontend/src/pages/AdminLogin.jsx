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

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}api/user/adminsignin`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'teacher');
      navigate('/teacherdashboard');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error during login');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primaryBg">
      <Card className="w-[350px] bg-borderColor text-primaryText">
        <CardHeader className="justify-center">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Login to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
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
              <Button type="submit" className="bg-buttonBg border boder-[#2727A] text-buttonText hover:text-white hover:bg-black ">Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex gap-2 mt-0">
            <p>Don't have an account?</p>
            <Link to="/adminsignup">
              <span className="inline-block font-semibold text-blue-500 hover:text-blue-700 transition duration-300">
                Sign Up
              </span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
