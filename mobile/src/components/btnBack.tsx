import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

const BtnBack = () => {
	const { goBack } = useNavigation();
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="mb-4 mt-8"
			onPress={goBack}
        >
			<Feather
				name="arrow-left"
				size={32}
				color={colors.zinc[400]}
			/>
		</TouchableOpacity>
	);
};

export default BtnBack;
