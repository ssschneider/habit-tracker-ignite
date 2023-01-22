import { ActivityIndicator, StyleSheet, View } from "react-native"

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color='#7c3aed' size={"large"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default Loading