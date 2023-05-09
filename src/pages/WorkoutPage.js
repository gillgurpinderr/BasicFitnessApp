import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://workout-planner1.p.rapidapi.com/', {
          headers: {
            'X-RapidAPI-Key': '6810c91e18msh781d690588d932ep13c04fjsn73d625e5fdc1',
            'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com',
          },
          params: {
            time: '30',
            muscle: 'biceps',
            location: 'gym',
            equipment: 'dumbbells'
          },
        });
        setExercises(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercises();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#424242',
  },
  itemDescription: {
    color: '#424242',
  },
});

export default WorkoutPage;
