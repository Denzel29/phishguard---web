import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';

interface ApplicationDeadlinePickerProps {
	value?: Date;
	onChange?: (date: Date) => void;
}

const ApplicationDeadlinePicker = ({
	value,
	onChange
}: ApplicationDeadlinePickerProps) => {
	const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025
	const [isOpen, setIsOpen] = useState(false);

	const selectedDate = value;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDay = firstDay.getDay();

		const days = [];

		for (let i = 0; i < startingDay; i++) {
			const prevMonth = new Date(year, month - 1, 0);
			const day = prevMonth.getDate() - startingDay + i + 1;
			days.push({ day, isCurrentMonth: false, isPrevMonth: true });
		}

		for (let day = 1; day <= daysInMonth; day++) {
			days.push({ day, isCurrentMonth: true, isPrevMonth: false });
		}

		const remainingCells = 42 - days.length;
		for (let day = 1; day <= remainingCells; day++) {
			days.push({ day, isCurrentMonth: false, isPrevMonth: false });
		}

		return days;
	};

	const navigateMonth = (direction: number) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

	const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
		if (isCurrentMonth) {
			const newDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				day
			);
			if (onChange) {
				onChange(newDate);
			}
			setIsOpen(false);
		}
	};

	const formatSelectedDate = (date: Date) => {
		if (!date) return '';
		const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
		return date.toLocaleDateString('en-US', options);
	};

	const days = getDaysInMonth(currentDate);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className="flex items-center gap-3 rounded-xl border border-gray-200 p-2">
					<Calendar className="h-5 w-5 flex-shrink-0 text-gray-500" />
					<button
						type="button"
						className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 transition-colors"
					>
						<span>
							{selectedDate ? formatSelectedDate(selectedDate) : 'Set Deadline'}
						</span>
					</button>
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0" align="start">
				<div className="p-4">
					<div className="mb-4 flex items-center justify-between">
						<button
							type="button"
							onClick={() => navigateMonth(-1)}
							className="rounded p-1 hover:bg-gray-100"
						>
							<ChevronLeft className="h-4 w-4 text-gray-600" />
						</button>
						<h3 className="text-sm font-medium text-gray-900">
							{months[currentDate.getMonth()]} {currentDate.getFullYear()}
						</h3>
						<button
							type="button"
							onClick={() => navigateMonth(1)}
							className="rounded p-1 hover:bg-gray-100"
						>
							<ChevronRight className="h-4 w-4 text-gray-600" />
						</button>
					</div>

					<div className="mb-2 grid grid-cols-7">
						{daysOfWeek.map((day) => (
							<div
								key={day}
								className="py-2 text-center text-xs font-medium text-gray-500"
							>
								{day}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">
						{days.map((dayObj, index) => (
							<button
								key={index}
								type="button"
								onClick={() =>
									handleDateSelect(dayObj.day, dayObj.isCurrentMonth)
								}
								className={`flex h-8 w-8 items-center justify-center rounded text-sm hover:bg-orange-50 ${
									dayObj.isCurrentMonth
										? 'text-gray-900 hover:bg-orange-50'
										: 'text-gray-400'
								} ${
									selectedDate &&
									selectedDate.getDate() === dayObj.day &&
									dayObj.isCurrentMonth &&
									selectedDate.getMonth() === currentDate.getMonth() &&
									selectedDate.getFullYear() === currentDate.getFullYear()
										? 'bg-orange-600 text-white hover:bg-orange-700'
										: ''
								} `}
							>
								{dayObj.day}
							</button>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ApplicationDeadlinePicker;
