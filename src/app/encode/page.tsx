"use client";

import { useState } from "react";
import Image from "next/image";

export default function EncodePage() {
    const [fileToHide, setFileToHide] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

    const handleFileToHideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileToHide(e.target.files[0]);
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverImage(file);

            // Create preview for the cover image
            const reader = new FileReader();
            reader.onload = (event) => {
                setCoverImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the encoding logic or API call
        console.log("File to hide:", fileToHide);
        console.log("Cover image:", coverImage);
        // Add your encoding logic here
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Upload a file to hide and a cover image to conceal it within.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {/* File to Hide Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    File to Hide
                                </label>
                                <div className="mt-1 flex items-center">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-blue-500 dark:text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 dark:border-blue-400 cursor-pointer hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition duration-200">
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-sm leading-normal">
                                            {fileToHide ? fileToHide.name : "Select a file"}
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileToHideChange}
                                        />
                                    </label>
                                </div>
                                {fileToHide && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        {fileToHide.name} ({(fileToHide.size / 1024).toFixed(2)} KB)
                                    </p>
                                )}
                            </div>

                            {/* Cover Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cover Image
                                </label>
                                <div className="mt-1 flex items-center">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-green-500 dark:text-green-400 rounded-lg shadow-lg tracking-wide uppercase border border-green-500 dark:border-green-400 cursor-pointer hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition duration-200">
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-sm leading-normal">
                                            {coverImage ? coverImage.name : "Select an image"}
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                        />
                                    </label>
                                </div>
                                {coverImage && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        {coverImage.name} ({(coverImage.size / 1024).toFixed(2)} KB)
                                    </p>
                                )}
                            </div>

                            {/* Image Preview */}
                            {coverImagePreview && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Cover Image Preview
                                    </label>
                                    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Image
                                            src={coverImagePreview}
                                            alt="Cover image preview"
                                            fill
                                            style={{ objectFit: "contain" }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Encode and Hide File
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}