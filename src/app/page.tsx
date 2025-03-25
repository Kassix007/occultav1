"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Template from "@/components/ui/template";
import Link from "next/link";
export default function Home()
{
  return (

  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">

    <Template>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Occulta - Hide in Plain Sight</h1>

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <Link href="/encode" passHref>
            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Encode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Hide any supported type of file/data within a cover image
                </p>
              </CardContent>
            </Card>
      </Link>
        <Link href="/decode" passHref>
            <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Decode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Retrieve file/data from Occulted Image
                </p>
              </CardContent>
            </Card>
        </Link>
    </div>

    </Template>
        </div>
  );
}
