"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropProps {
    onFileSelect: (file: File) => void;
    accept?: Record<string, string[]>;
    label: string;
    icon: React.ReactNode;
    color: string;
    fileName?: string;
    fileSize?: number;
}

export function DragDrop({ onFileSelect, accept, label, icon, color, fileName, fileSize }: DragDropProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple: false,
    });

    return (
        <div>
            <div
                {...getRootProps()}
                className={`w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-${color}-500 dark:text-${color}-400 rounded-lg shadow-lg tracking-wide uppercase border border-${color}-500 dark:border-${color}-400 cursor-pointer hover:bg-${color}-500 hover:text-white dark:hover:bg-${color}-600 transition duration-200 ${
                    isDragActive ? `bg-${color}-500 text-white dark:bg-${color}-600` : ""
                }`}
            >
                <input {...getInputProps()} />
                {icon}
                <span className="mt-2 text-sm leading-normal">
                    {fileName || label}
                </span>
            </div>
            {fileName && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {fileName} ({(fileSize! / 1024).toFixed(2)} KB)
                </p>
            )}
        </div>
    );
} 