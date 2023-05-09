import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const WorkoutPage = ({ route }) => {
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

        // Get the response data
        const data = response.data;

        // Flatten the data
        let flattenedData = [];
        ["Warm Up", "Exercises", "Cool Down"].forEach((key) => {
          data[key].forEach((item) => {
            flattenedData.push({
              id: data._id,
              type: key,
              ...item
            });
          });
        });

        console.log('Flattened data:', flattenedData);
        setExercises(flattenedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setExercises([]);
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item); // Log the item
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.type}: {item.Exercise}</Text>
        <Text style={styles.itemDescription}>{item.Time || `${item.Sets} sets of ${item.Reps}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default WorkoutPage;
