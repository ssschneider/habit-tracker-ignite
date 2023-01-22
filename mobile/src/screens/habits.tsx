import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import BtnBack from "../components/btnBack";
import dayjs from "dayjs";
import Progressbar from "../components/progressbar";
import Checkbox from "../components/checkbox";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import generateProgressPercentage from "../utils/generateProgressPercentage";
import NoHabits from "../components/noHabits";
import clsx from "clsx";

interface Params {
	date: string;
}

interface dayInfoProps {
	possibleHabits: {
		id: string;
		title: string;
	}[];
	completedHabits: string[]
}

const Habit = () => {
	const [ loading, setLoading ] = useState(true)
	const [ dayInfo, setDayInfo ] = useState<dayInfoProps | null >(null)
	const [ completedHabits, setCompletedHabits ] = useState<string[]>([])

	const route = useRoute();
	const { date } = route.params as Params;

	const parsedDate = dayjs(date)
	const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')
	const habitsProgress = dayInfo?.possibleHabits.length ?
		generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) 
		: 0;

	const fetchHabits = async () => {
		try {
			setLoading(true)
			const response = await api.get("/day", {
				params: { date }
			})
			setDayInfo(response.data);
			setCompletedHabits(response.data.completedHabits)
		} catch (error) {
			console.log(error);
			Alert.alert("Ops", "Não foi possível carregar os seus hábitos de hoje.")
		} finally {
			setLoading(false)
		}
	}

	const handleToggle = async (habitId: string) => {
		try {
			await api.patch(`/habits/${habitId}/toggle`)
			if (completedHabits.includes(habitId)) {
				setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
			} else {
				setCompletedHabits(prevState => [...prevState, habitId])
			}
		} catch (error) {
			console.log(error);
			Alert.alert("Ops", "Não foi possível atualizar o seu hábito.")
		}
		
	}

	useEffect(() => {
		fetchHabits()
	}, [])

	if (loading) {
		return (
			<Loading />
		)
	}

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<ScrollView
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 80 }}>
				<BtnBack />
				<Text className="text-zinc-400 mb-1 font-semibold text-base lowercase">
					{dayOfWeek}
				</Text>
				<Text className="text-white text-4xl font-extrabold mb-4">
					{dayAndMonth}
				</Text>
                <Progressbar progress={habitsProgress}/>

                <View className={clsx("mt-6", {
					["opacity-50"]:  isDateInPast
				})}>
					{dayInfo?.possibleHabits ? 
						dayInfo?.possibleHabits.map(habit => {
							return (
							<Checkbox key={habit.id} title={habit.title} checked={completedHabits.includes(habit.id)} onPress={() => handleToggle(habit.id)} disabled={isDateInPast}/>
							)
					}) : <NoHabits />}
                </View>

				{isDateInPast && (
					<Text className="text-zinc-400 text-center text-base mt-10">
						Calma, aí! Editar hábitos de um dia que já passou não é nada legal.
					</Text>
				)}              
			</ScrollView>
		</View>
	);
};

export default Habit;
