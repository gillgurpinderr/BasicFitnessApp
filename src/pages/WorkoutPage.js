import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const WorkoutPage = ({ route }) => {
    const { calorieIntake, bmi } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Workout Plan</Text>
            <Text style={styles.text}>Your BMI: {bmi.toFixed(2)}</Text>
            <Text style={styles.text}>Daily Calorie Intake: {calorieIntake.toFixed(0)} calories</Text>
            {/* Display workout plans based on user's profile */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default WorkoutPage;
