import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';


const ProfilePage = ({ navigation }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('lose');

    const handleCreateProfile = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
      
        const profileRef = firebase.database().ref(`profiles/${uid}`);
      
        const newProfile = {
          weight: parseInt(weight),
          height: parseInt(height),
          age: parseInt(age),
          gender,
          fitnessGoal,
        };
      
        console.log("New profile data:", newProfile);
      
        profileRef.set(newProfile, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Profile created successfully");
            navigation.navigate("Workout");
          }
        });
      };      

    const handleSubmit = () => {
        const bmi = calculateBMI(weight, height);
        const calorieIntake = calculateCalorieIntake(weight, goalWeight, height, age, goal);

        // Save profile data, then navigate to the Workout page
        navigation.navigate('Workout', { calorieIntake, bmi });
    };

    const calculateBMI = (weight, height) => {
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    };

    const calculateCalorieIntake = (weight, goalWeight, height, age, goal) => {
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        const dailyCalorieIntake = bmr * 1.2;

        if (goal === 'gain') {
            return dailyCalorieIntake + 500;
        } else if (goal === 'lose') {
            return dailyCalorieIntake - 500;
        } else {
            return dailyCalorieIntake;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Goal Weight (kg)"
                keyboardType="numeric"
                value={goalWeight}
                onChangeText={setGoalWeight}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setGoal('lose');
                }}
            >
                <Text style={[styles.buttonText, goal === 'lose' && styles.activeGoal]}>Lose Weight</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setGoal('gain');
                }}
            >
                <Text style={[styles.buttonText, goal === 'gain' && styles.activeGoal]}>Gain Weight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Create Profile</Text>
            </TouchableOpacity>
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
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    activeGoal: {
        backgroundColor: 'darkblue',
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 4,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ProfilePage;
