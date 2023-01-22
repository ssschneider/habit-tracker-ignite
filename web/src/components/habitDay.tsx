import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import Progressbar from "./progressBar";
import dayjs from "dayjs";
import HabitsList from "./habitsList";
import { useState } from "react";

interface HabitDayProps {
	date: Date;
	defaultCompleted?: number;
	amount?: number;
}

const HabitDay = ({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) => {
	const [ completed, setCompleted ] = useState(defaultCompleted)

	const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

	const dayAndMonth = dayjs(date).format('DD/MM')
	const weekday = dayjs(date).format('dddd')

	const handleCompletedHabitsChange = (completed: number) => {
		setCompleted(completed);
	}

	return (
		<Popover.Root>
			<Popover.Trigger
				className={clsx(
					"w-10 h-10 text-white rounded-md flex items-center justify-center border-2 cursor-pointer transition-colors hover:scale-105 duration-500 focus:outline-none focus:ring-violet-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
					{
						"bg-violet-500 border-violet-400":
							completedPercentage >= 80,
						"bg-violet-600 border-violet-500":
							completedPercentage >= 60 &&
							completedPercentage <= 80,
						"bg-violet-700 border-violet-500":
							completedPercentage >= 40 &&
							completedPercentage <= 60,
						"bg-violet-800 border-violet-600":
							completedPercentage >= 20 &&
							completedPercentage <= 40,
						"bg-violet-900 border-violet-600":
							completedPercentage > 0 && completedPercentage < 20,
						"bg-zinc-900 border-zinc-800":
							completedPercentage === 0,
					}
				)}
			/>

			<Popover.Portal>
			<Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col border border-violet-500 focus:outline-none focus:ring-violet-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background">
					<span className="font-semibold text-zinc-500 lowercase">
						{weekday}
					</span>
					<span className="font-extrabold text-3xl leading-tight mt-1">
						{dayAndMonth}
					</span>

					<Progressbar progress={completedPercentage} />

					<HabitsList date={date} onCompletedHabitsChange={handleCompletedHabitsChange}/>

					<Popover.Arrow height={8} width={16} className="fill-violet-500" />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default HabitDay;
