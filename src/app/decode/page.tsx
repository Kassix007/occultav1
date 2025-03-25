"use client";

import { useState } from "react";
import Image from "next/image";

export default function DecodePage() {
    const [stegoImage, setStegoImage] = useState<File | null>(null);
    const [stegoImagePreview, setStegoImagePreview] = useState<string | null>(null);
    const [decodedFile, setDecodedFile] = useState<{name: string, size: number, url: string} | null>(null);
    const [isDecoding, setIsDecoding] = useState(false);

    const handleStegoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setStegoImage(file);

            // Create preview for the stego image
            const reader = new FileReader();
            reader.onload = (event) => {
                setStegoImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Reset decoded file when new image is selected
            setDecodedFile(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate decoding process
        setIsDecoding(true);

        // This is where you would implement your actual decoding logic
        // For now, we'll simulate with a timeout
        setTimeout(() => {
            // Mock decoded file result
            if (stegoImage) {
                setDecodedFile({
                    name: "decoded_file.txt",
                    size: Math.floor(Math.random() * 100) + 10,
                    url: "#" // In a real app, this would be a URL or blob URL to the decoded file
                });
            }
            setIsDecoding(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Upload an image containing hidden data to extract the original file.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                            {/* Stego Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Image with Hidden Data
                                </label>
                                <div className="mt-1 flex items-center">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-purple-500 dark:text-purple-400 rounded-lg shadow-lg tracking-wide uppercase border border-purple-500 dark:border-purple-400 cursor-pointer hover:bg-purple-500 hover:text-white dark:hover:bg-purple-600 transition duration-200">
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span className="mt-2 text-sm leading-normal">
                                            {stegoImage ? stegoImage.name : "Select stego image"}
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleStegoImageChange}
                                        />
                                    </label>
                                </div>
                                {stegoImage && (
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                        {stegoImage.name} ({(stegoImage.size / 1024).toFixed(2)} KB)
                                    </p>
                                )}
                            </div>

                            {/* Image Preview */}
                            {stegoImagePreview && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Image Preview
                                    </label>
                                    <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <Image
                                            src={stegoImagePreview}
                                            alt="Stego image preview"
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
                                    disabled={!stegoImage || isDecoding}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        !stegoImage || isDecoding
                                            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                                    }`}
                                >
                                    {isDecoding ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Decoding...
                                        </>
                                    ) : (
                                        "Extract Hidden File"
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Results Section */}
                        {decodedFile && (
                            <div className="mt-8 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <h3 className="text-green-800 dark:text-green-300 font-medium">File Successfully Extracted!</h3>
                                <div className="mt-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Filename:</span> {decodedFile.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Size:</span> {decodedFile.size} KB
                                        </p>
                                    </div>
                                    <a
                                        href={decodedFile.url}
                                        download={decodedFile.name}
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                                    >
                                        <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}