import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import api from "../lib/axios";

const weekdays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];

const NewHabitForm = () => {
	const [ title, setTitle ] = useState("")
	const [ weekDays, setWeekDays ] = useState<number[]>([])

	const createNewHabit = (event: FormEvent) => {
		event.preventDefault()

		if (!title || weekDays.length === 0) {
			alert("Você precisa dar um nome ao seu hábito e/ou se comprometer pelo menos uma vez na semana!")
			return
		}

		api.post("/habits", {
			title, 
			weekDays
		}).then(() => alert("Hábito criado com sucesso!"))

		setTitle("")
		setWeekDays([])
	}

	const handleToggleWeekday = (weekday: number) => {
		if (weekDays.includes(weekday)) {
			const weekdaysWithoutRemovedOne = weekDays.filter(day => day !== weekday)

			setWeekDays(weekdaysWithoutRemovedOne)
		} else {
			const weekdaysWithAddedOne = [...weekDays, weekday]
			setWeekDays(weekdaysWithAddedOne)
		}
	};

	return (
		<form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
			<label
				htmlFor="title"
				className="font-semibold leading-tight">
				Qual é o seu hábito?
			</label>

			<input
				type="text"
				id="title"
				placeholder="Ex: Dormir 8h por dia, etc..."
				className="p-4 rounded-lg mt-2 bg-zinc-800 focus:outline-none placeholder:text-zinc-400"
				onChange={event => setTitle(event.target.value!)}
				value={title}
				autoFocus
			/>

			<label
				htmlFor=""
				className="font-semibold leading-tight mt-4">
				Qual é a recorrência?
			</label>

			<div className="mt-3 flex flex-col gap-2">
				{weekdays.map((weekday, index) => {
					return (
						<Checkbox.Root
							key={weekday}
							className="flex items-center gap-3 group focus:outline-none"
							checked={weekDays.includes(index)}
							onCheckedChange={() => handleToggleWeekday(index)}
							>
								<div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-violet-900 group-focus:ring-2 group-focus:ring-offset-2 group-focus:ring-offset-background">
								<Checkbox.Indicator>
									<Check
										size={20}
										className="text-white"
									/>
								</Checkbox.Indicator>
							</div>
							<span className="text-white leading-tight text-lg">
								{weekday}
							</span>
						</Checkbox.Root>
					);
				})}
			</div>

			<button
				type="submit"
				className="w-full flex justify-center items-center gap-3 bg-green-600 rounded-lg p-2 text-lg mt-6 font-semibold hover:bg-green-500 hover:scale-105 duration-500 focus:outline-none focus:ring-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background">
				<Check
					size={20}
					weight="bold"
				/>
				Confirmar
			</button>
		</form>
	);
};

export default NewHabitForm;
