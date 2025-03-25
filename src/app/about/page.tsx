"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Template from "@/components/ui/template";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
            <Template>
                <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">About Occulta</h1>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* What is Occulta */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-900 dark:text-white">What is Occulta?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300">
                                Occulta is a modern web application that leverages advanced steganography techniques to hide data or files within images. 
                                Whether you want to conceal sensitive information or simply explore the fascinating world of data hiding, Occulta provides 
                                a user-friendly interface for both encoding and decoding data within images.
                            </p>
                        </CardContent>
                    </Card>

                    {/* How to Use */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-900 dark:text-white">How to Use</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Encoding Data</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    1. Navigate to the Encode page<br />
                                    2. Select the file you want to hide<br />
                                    3. Choose a cover image to conceal your data<br />
                                    4. Click "Encode and Hide File" to process<br />
                                    5. Download the resulting image containing your hidden data
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Decoding Data</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    1. Go to the Decode page<br />
                                    2. Upload the image containing hidden data<br />
                                    3. Click "Extract Hidden File" to process<br />
                                    4. Download the extracted file
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technologies Used */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-900 dark:text-white">Technologies Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>Next.js 14</li>
                                        <li>React 19</li>
                                        <li>TypeScript</li>
                                        <li>Tailwind CSS</li>
                                        <li>Framer Motion</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Features</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>Dark/Light Mode</li>
                                        <li>Responsive Design</li>
                                        <li>Modern UI/UX</li>
                                        <li>File Upload & Preview</li>
                                        <li>Steganography Algorithms</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contribute */}
                    <Card className="bg-white dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="text-2xl text-gray-900 dark:text-white">Contribute</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Occulta is an open-source project, and we welcome contributions from the community! 
                                Whether you're a developer, designer, or documentation writer, there are many ways to help improve the project.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How to Contribute</h3>
                                    <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>Fork the repository</li>
                                        <li>Create a new branch for your feature</li>
                                        <li>Make your changes</li>
                                        <li>Submit a pull request</li>
                                    </ol>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Areas to Contribute</h3>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                        <li>Bug fixes and improvements</li>
                                        <li>New features and functionality</li>
                                        <li>Documentation and tutorials</li>
                                        <li>UI/UX improvements</li>
                                        <li>Testing and quality assurance</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Template>
        </div>
    );
}