'use client';

import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
	ssr: false,
	loading: () => <div className="h-32 animate-pulse rounded-xl bg-gray-100" />
});

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	value,
	onChange,
	placeholder = 'Enter job description...',
	className = '',
	disabled = false
}) => {
	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['link'],
				['clean']
			]
		}),
		[]
	);

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'list',
		'indent',
		'link'
	];

	return (
		<div className={`rich-text-editor ${className}`}>
			<ReactQuill
				theme="snow"
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder={placeholder}
				readOnly={disabled}
				style={{
					backgroundColor: disabled ? '#f9fafb' : 'white'
				}}
			/>
			{/* <style jsx global>{`
				.rich-text-editor .ql-container {
					border-top: none;
					font-size: 14px;
					min-height: 120px;
				}

				.rich-text-editor .ql-toolbar {
					border-bottom: 1px solid #e5e7eb;
				}

				.rich-text-editor .ql-editor {
					min-height: 120px;
					padding: 12px 15px;
				}

				.rich-text-editor .ql-editor.ql-blank::before {
					font-style: normal;
					color: #9ca3af;
				}

				.rich-text-editor .ql-toolbar .ql-stroke {
					fill: none;
					stroke: #374151;
				}

				.rich-text-editor .ql-toolbar .ql-fill,
				.rich-text-editor .ql-toolbar .ql-stroke.ql-fill {
					fill: #374151;
					stroke: none;
				}

				.rich-text-editor .ql-toolbar .ql-picker {
					color: #374151;
				}

				.rich-text-editor .ql-snow.ql-toolbar button:hover,
				.rich-text-editor .ql-snow .ql-toolbar button:hover,
				.rich-text-editor .ql-snow.ql-toolbar button.ql-active,
				.rich-text-editor .ql-snow .ql-toolbar button.ql-active {
					color: #ff7133;
				}

				.rich-text-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
				.rich-text-editor .ql-snow .ql-toolbar button:hover .ql-stroke,
				.rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
				.rich-text-editor .ql-snow .ql-toolbar button.ql-active .ql-stroke {
					stroke: #ff7133;
				}

				.rich-text-editor .ql-snow.ql-toolbar button:hover .ql-fill,
				.rich-text-editor .ql-snow .ql-toolbar button:hover .ql-fill,
				.rich-text-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
				.rich-text-editor .ql-snow .ql-toolbar button.ql-active .ql-fill {
					fill: #ff7133;
				}
			`}</style> */}
		</div>
	);
};
