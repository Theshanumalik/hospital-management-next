"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Leaves = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>Holydays</CardTitle>
        <CardDescription>Manage your holydays</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-3">Yet to implement</div>
      </CardContent>
    </Card>
  );
};

export default Leaves;
