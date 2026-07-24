'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

interface DatePickerProps {
	initialDate?: string | Date;
	onDateChange?: (dateString: string) => void;
	disabled?: boolean;
	className?: string;
}

export const DatePicker = ({
	initialDate,
	onDateChange,
	disabled = false,
	className = ''
}: DatePickerProps) => {
	const today = new Date();
	const minDate = new Date(today);
	minDate.setDate(minDate.getDate() + 1);

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedTime, setSelectedTime] = useState('12:00');

	const parseInitialDate = (date?: string | Date): Date | undefined => {
		if (!date) return undefined;

		const parsedDate = new Date(date);
		if (isNaN(parsedDate.getTime())) {
			return undefined;
		}
		return parsedDate;
	};

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		parseInitialDate(initialDate)
	);

	useEffect(() => {
		const newDate = parseInitialDate(initialDate);
		setSelectedDate(newDate);

		if (newDate && initialDate) {
			if (typeof initialDate === 'string' && initialDate.includes(':')) {
				const timeMatch = initialDate.match(/(\d{1,2}):(\d{2})/);
				if (timeMatch) {
					const hours = timeMatch[1].padStart(2, '0');
					const minutes = timeMatch[2];
					setSelectedTime(`${hours}:${minutes}`);
				}
			} else {
				const hours = newDate.getHours().toString().padStart(2, '0');
				const minutes = newDate.getMinutes().toString().padStart(2, '0');
				setSelectedTime(`${hours}:${minutes}`);
			}
		}
	}, [initialDate]);

	const formatDisplayDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const createDateTimeString = (date: Date, time: string) => {
		const [hours, minutes] = time.split(':');
		const dateTime = new Date(date);
		dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
		return dateTime.toLocaleString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	};

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			const dateTimeString = createDateTimeString(date, selectedTime);
			onDateChange?.(dateTimeString);
		}
	};

	const handleTimeChange = (time: string) => {
		setSelectedTime(time);
		if (selectedDate) {
			const dateTimeString = createDateTimeString(selectedDate, time);
			onDateChange?.(dateTimeString);
		}
	};

	const handleConfirm = () => {
		setIsCalendarOpen(false);
		if (selectedDate) {
			const dateTimeString = createDateTimeString(selectedDate, selectedTime);
			onDateChange?.(dateTimeString);
		}
	};

	const handleCancel = () => {
		setIsCalendarOpen(false);
		const validInitialDate = parseInitialDate(initialDate);
		setSelectedDate(validInitialDate);
	};

	let displayValue: string;
	if (selectedDate) {
		displayValue = `${formatDisplayDate(selectedDate)} at ${selectedTime}`;
	} else if (initialDate && typeof initialDate === 'string') {
		displayValue = `${initialDate}`;
	} else {
		displayValue = 'Pick a date and time';
	}

	return (
		<div className={`relative ${className}`}>
			<button
				type="button"
				disabled={disabled}
				className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground inline-flex h-10 w-full items-center justify-start gap-2 rounded-md border px-4 py-2 text-left text-sm font-normal whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
				aria-haspopup="dialog"
				aria-expanded={isCalendarOpen}
				aria-controls="calendar"
				data-state={isCalendarOpen ? 'open' : 'closed'}
				onClick={() => setIsCalendarOpen(!isCalendarOpen)}
			>
				<Image alt="Calendar" src="/calendar-thin.svg" width={20} height={20} />
				{displayValue}
			</button>

			{isCalendarOpen && (
				<div className="absolute z-50 my-2 rounded-xl border bg-white shadow-lg">
					<Calendar
						id="calendar"
						mode="single"
						showTime
						time={selectedTime}
						selected={selectedDate}
						onSelect={handleDateSelect}
						onTimeChange={handleTimeChange}
						fromDate={minDate}
						initialFocus
						className="w-full"
					/>
					<div className="flex justify-end gap-2 border-t p-3">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={handleCancel}
						>
							Cancel
						</Button>
						<Button
							type="button"
							size="sm"
							onClick={handleConfirm}
							disabled={!selectedDate}
						>
							Confirm
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
