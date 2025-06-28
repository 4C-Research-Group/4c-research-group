"use client";

import { useState } from "react";
import RichTextEditor from "@/components/ui/rich-text-editor";
import RichTextContent from "@/components/ui/rich-text-content";

export default function TestRichTextPage() {
  const [content, setContent] = useState(`
    <h1>Welcome to the Rich Text Editor Demo</h1>
    <p>This is a demonstration of the rich text editor capabilities for the 4C Research blog system.</p>
    
    <h2>Features Available</h2>
    <ul>
      <li><strong>Headings</strong> - Multiple heading levels (H1-H6)</li>
      <li><strong>Text Formatting</strong> - Bold, italic, underline, strikethrough</li>
      <li><strong>Lists</strong> - Ordered and unordered lists</li>
      <li><strong>Links and Images</strong> - Easy insertion of media</li>
      <li><strong>Code Blocks</strong> - For technical content</li>
      <li><strong>Blockquotes</strong> - For highlighting important information</li>
    </ul>
    
    <h3>Sample Code Block</h3>
    <pre><code>function helloWorld() {
  console.log("Hello, 4C Research!");
}</code></pre>
    
    <h4>Sample Blockquote</h4>
    <blockquote>
      This is a sample blockquote that demonstrates how quoted text will appear in the blog posts.
    </blockquote>
    
    <h5>Text Alignment</h5>
    <p style="text-align: center;">This text is centered.</p>
    <p style="text-align: right;">This text is right-aligned.</p>
    
    <h6>Color and Styling</h6>
    <p>You can use <span style="color: #3b82f6;">colored text</span> and <span style="background-color: #fef3c7;">highlighted text</span> to make your content more engaging.</p>
  `);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Rich Text Editor Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test the rich text editor functionality below. Edit the content and
            see how it renders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Rich Text Editor
            </h2>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your content here..."
              label="Content Editor"
            />
          </div>

          {/* Preview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Live Preview
            </h2>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 min-h-[400px]">
              <RichTextContent content={content} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            HTML Output
          </h2>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              <code>{content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
