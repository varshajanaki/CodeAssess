import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeacherDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primaryBg p-4 text-primaryText">
            <Card className="bg-borderColor text-primaryText shadow-lg rounded-lg p-8 max-w-4xl w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold mb-8">Teacher Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <Link to="/QuestionSetting" className="block w-full">
                            <Button className="w-full py-4 px-6 bg-buttonBg text-buttonText rounded-lg hover:bg-buttonBg hover:text-primaryBg focus:outline-none focus:ring-2 focus:ring-buttonBg focus:ring-opacity-50">
                                Set Questions
                            </Button>
                        </Link>
                        <Link to="/displayresult" className="block w-full">
                            <Button className="w-full py-4 px-6 bg-buttonBg text-buttonText rounded-lg hover:bg-buttonBg hover:text-primaryBg focus:outline-none focus:ring-2 focus:ring-buttonBg focus:ring-opacity-50">
                                View Results
                            </Button>
                        </Link>
                       
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherDashboard;
