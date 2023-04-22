import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const WorkoutPage = () => {
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/exercise?query=${weight}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': '583e5473',
          'x-app-key': 'd9b315fa0a6c358e10727e19b9c4de89',
          'x-remote-user-id': '0'
        },
        body: JSON.stringify({
          query: `I lifted ${weight} lbs for ${duration} minutes`
        })
      });
      const json = await response.json();
      setWorkouts(json.exercises);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Workout Plan</Text>
      <Text style={styles.subtitle}>Log your workout:</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Weight (lbs)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.button}>
        <Button title="Add Workout" onPress={fetchWorkouts} color='#fff' />
      </View>
      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <Text style={styles.workoutText}>
            {workout.name}: {workout.nf_calories} calories burned
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#fb5b5a',
    marginBottom: 5,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: '#424242',
  },
  button: {
    backgroundColor: '#00bfa5',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
  },
  workoutContainer: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: 300
  },
  workoutText: {
    fontSize: 16
  }
});

export default WorkoutPage;
