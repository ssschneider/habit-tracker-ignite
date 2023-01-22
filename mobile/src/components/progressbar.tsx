import { useEffect } from "react"
import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface Props {
    progress?: number
}

const Progressbar = ( {progress = 0}: Props) => {
    const sharedProgress = useSharedValue(progress)

    const animationStyle = useAnimatedStyle(() => {
        return {
            width: `${sharedProgress.value}%`
        }
    })

    useEffect(() => {
        sharedProgress.value = withTiming(progress)
    }, [progress])

    return (
        <View className="w-full bg-zinc-700 h-3 rounded-xl mt-4">
            <Animated.View 
                className="bg-violet-600 h-3 rounded-xl" 
                style={animationStyle}
            />
        </View>
    )
}

export default Progressbar