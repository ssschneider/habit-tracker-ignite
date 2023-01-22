import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

const NoHabits = () => {
    const { navigate } = useNavigation()
	return (
		<Text className="text-zinc-400 text-base text-center mt-6">
			Você ainda não cadastrou nenhum hábito para hoje. Que tal começar
			agora? {"         "}
            <Text className="text-violet-500 text-base text-center font-semibold underline active:text-violet-400" onPress={() => navigate("newHabit")}>
                Cadastrar novo hábito
            </Text>
		</Text>
	);
};

export default NoHabits
