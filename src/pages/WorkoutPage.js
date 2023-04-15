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
      <Text style={styles.text}>Log your workout:</Text>
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (lbs)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button title="Add Workout" onPress={fetchWorkouts} />
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: 200,
    height: 40,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#eee',
    borderRadius: 10
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
