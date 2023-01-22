import { View, Text, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { dayMarginBetween, daySize, HabitDay } from "../components/habitDay";
import Header from "../components/header";
import generateDatesFromYearBeginning from "../utils/generateDatesFromYearBeginning";
import { useCallback, useState } from "react";
import api from "../lib/axios";
import Loading from "../components/loading";
import dayjs from "dayjs";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDateSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDateSize - datesFromYearStart.length;

type SummaryProps = Array<{
	id: string;
	date: string;
	completed: number;
	amount: number;
}>

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<SummaryProps | null>(null);

	const { navigate } = useNavigation();

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await api.get("/summary");
			setSummary(response.data);
		} catch (error) {
			Alert.alert(
				"Ops",
				"Não foi possível carregar o sumário de hábitos."
			);
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useFocusEffect(useCallback(() => {
		fetchData();
	}, []));

	if (loading) {
		return (
			<Loading />
		)
	}

	return (
		<View className="flex-1 bg-background px-8 pt-16">
			<Header />
			<View className="flex-row w-full mt-6 mb-2 justify-center">
				{weekdays.map((weekday, index) => {
					return (
						<Text
							className="text-zinc-400 font-bold text-center mx-1 text-xl"
							style={{ width: daySize }}
							key={index}>
							{weekday}
						</Text>
					);
				})}
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 80 }}>
				{ summary &&
					<View className="flex-row flex-wrap">
					{datesFromYearStart.map((date) => {
						{
							const dayWithHabits = summary.find(day => {
								return dayjs(date).isSame(day.date, 'day')
							})
							return (
							<HabitDay
								key={date.toISOString()}
								onPress={() =>
									navigate("habit", {
										date: date.toISOString(),
									})
								}
								date={date}
								amountOfHabits={dayWithHabits?.amount}
								completedHabits={dayWithHabits?.completed}
							/>
						);}
					})}

					{amountOfDaysToFill > 0 &&
						Array.from({ length: amountOfDaysToFill }).map(
							(_, index) => {
								return (
									<View
										className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
										style={{
											width: daySize,
											height: daySize,
											margin: dayMarginBetween,
										}}
										key={index}
									/>
								);
							}
						)}
					</View>
				}
			</ScrollView>
		</View>
	);
};

export default Home;
