import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import Animated, { BounceIn, ZoomOut } from "react-native-reanimated";

interface Props extends TouchableOpacityProps {
    title: string,
	checked?: boolean;
}

const Checkbox = ({ checked = false, title, ...rest }: Props) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			className="flex-row gap-3 mb-2 items-center"
            {...rest}
        >
			{checked ? (
				<Animated.View 
					className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
					entering={BounceIn}
					exiting={ZoomOut}
				>
					<Feather size={20} name="check" color={colors.white} />
				</Animated.View>
			) : 
                <View className="h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800"/>
            }
            <Text className="text-white font-semibold text-base">
                {title}
            </Text>
		</TouchableOpacity>
	);
};

export default Checkbox;
