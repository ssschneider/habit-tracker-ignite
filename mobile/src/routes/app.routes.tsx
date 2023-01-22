import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Habit from "../screens/habits";
import Home from "../screens/home";
import NewHabit from "../screens/newHabit";

const { Navigator, Screen } = createNativeStackNavigator()

const AppRoutes = () => {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen name="home" component={Home}/>
            <Screen name="habit" component={Habit}/>
            <Screen name="newHabit" component={NewHabit}/>
        </Navigator>
    )
}

export default AppRoutes