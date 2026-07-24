import { ChangeEvent, FormEvent, useState } from 'react';

// Define all possible form field types
type FormFieldValue =
	| string
	| number
	| boolean
	| Date
	| File
	| FileList
	| null
	| undefined
	| FormFieldValue[]
	| { [key: string]: FormFieldValue };

// Enhanced change event type that covers all HTML form elements
type FormChangeEvent =
	| ChangeEvent<HTMLInputElement>
	| ChangeEvent<HTMLTextAreaElement>
	| ChangeEvent<HTMLSelectElement>;

export function useForm<T extends Record<string, FormFieldValue>>(
	initialValues: T,
	onSubmit: (values: T) => Promise<void> | void
) {
	const [values, setValues] = useState<T>(initialValues);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: FormChangeEvent) => {
		const { name, type } = e.target;

		let value: FormFieldValue;

		switch (type) {
			case 'checkbox':
				value = (e.target as HTMLInputElement).checked;
				break;
			case 'file':
				value = (e.target as HTMLInputElement).files || null;
				break;
			case 'number':
				value = e.target.value === '' ? null : Number(e.target.value);
				break;
			case 'date':
				value = e.target.value ? new Date(e.target.value) : null;
				break;
			default:
				value = e.target.value;
		}

		setValues((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await onSubmit(values);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Optional: Add reset functionality
	const resetForm = () => {
		setValues(initialValues);
	};

	return {
		values,
		handleChange,
		handleSubmit,
		isSubmitting,
		resetForm,
		setValues
	};
}
