import dayjs from "dayjs";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import generateDatesFromYearBeginning from "../utils/generateDatesFromYearBeginning";
import HabitDay from "./habitDay";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = Array<{
	id: string;
	date: string;
	completed: number;
	amount: number;
}>

const SummaryTable = () => {
	const [ summary, setSummary ] = useState<Summary>([])

	useEffect(() => {
		api.get("/summary").then(response => {
			setSummary(response.data);
		})
	}, [])

	return (
		<section className="w-full flex">
			<header className="grid grid-rows-7 grid-flow-row gap-3">
				{weekdays.map((weekday, index) => {
					return (
						<div
							className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
							key={index}>
							{weekday}
						</div>
					);
				})}
			</header>

			<div className="grid grid-rows-7 grid-flow-col gap-3">
				{summary.length > 0 && summaryDates.map((date) => {
					const dayInSummary = summary.find(day => {
						return dayjs(date).isSame(day.date, 'day')
					})

					return (
						<HabitDay 
							key={date.toString()}
							date={date}
							amount={dayInSummary?.amount} 
							defaultCompleted={dayInSummary?.completed}
						/>
					)
				})}

				{amountOfDaysToFill > 0 &&
					Array.from({ length: amountOfDaysToFill }).map((_, i) => {
						return (
							<div key={i} className="bg-zinc-900 w-10 h-10 text-white rounded-md flex items-center justify-center border-2 border-zinc-800 opacity-40 cursor-not-allowed" />
						);
					})}
			</div>
		</section>
	);
};

export default SummaryTable;
