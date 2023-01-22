import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useState } from "react";
import BtnBack from "../components/btnBack";
import Checkbox from "../components/checkbox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import api from "../lib/axios";

const availableWeekdays = [
	"Domingo",
	"Segunda-feira",
	"Terça-feira",
	"Quarta-feira",
	"Quinta-feira",
	"Sexta-feira",
	"Sábado",
];

const NewHabit = () => {
	const [weekdays, setWeekdays] = useState<number[]>([]);
	const [ title, setTitle ] = useState(" ")

	const handleToggleWeekdays = (weekdayIndex: number) => {
		if (weekdays.includes(weekdayIndex)) {
			setWeekdays((prevState) =>
				prevState.filter((weekdays) => weekdays != weekdayIndex)
			);
		} else {
			setWeekdays((prevState) => [...prevState, weekdayIndex]);
		}
	};

	const createNewHabit = async () => {
		try {
			if (!title.trim() || weekdays.length === 0) {
				return Alert.alert("Novo hábito", "Todo hábito merece um nome e ser realizado pelo menos uma vez por semana, você não acha?")
			}

			await api.post("/habits", {
				title: title,
				weekDays: weekdays
			})

			setTitle(" ")
			setWeekdays([])

			Alert.alert("Novo hábito", `Parabéns, o hábito de ${title} foi criado com sucesso!`)
		} catch (error) {
			console.log(error);
			Alert.alert("Ops", "Não foi possível criar um novo hábito!")
		}
	}

	return (
		<View className="flex-1 bg-background px-8 pt-8 flex-col">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 24 }}>
				<BtnBack />
				<Text className="text-white font-extrabold text-4xl mb-6">
					Criar Hábito
				</Text>

				<Text className="text-white font-semibold text-lg mt-6">
					Qual seu comprometimento?
				</Text>
				<TextInput
					className="bg-zinc-900 border-2 border-zinc-800 rounded-lg text-white text-lg p-4 mt-3 focus:border-green-600"
					placeholder="Ex: Dormir 8h por dia"
					placeholderTextColor={colors.zinc[400]}
					onChangeText={setTitle}
					value={title}
				/>

				<Text className="text-white font-semibold text-lg mt-6 mb-3">
					Qual a recorrência?
				</Text>

				{availableWeekdays.map((weekday, index) => {
					return (
						<Checkbox
							key={weekday}
							title={weekday}
							checked={weekdays.includes(index)}
							onPress={() => handleToggleWeekdays(index)}
						/>
					);
				})}

				<TouchableOpacity
					className="w-full h-14 bg-green-600 flex-row rounded-md justify-center items-center mt-6"
					activeOpacity={0.7}
					onPress={createNewHabit}>
					<Feather
						name="check"
						size={20}
						color={colors.white}
					/>
					<Text className="text-white font-semibold text-lg ml-3">
						Confirmar
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default NewHabit;
