import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(() => {
                navigation.navigate('Profile');
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
            });
    };

    const handleRegister = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then(() => {
                navigation.navigate('Profile');
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    Alert.alert('Error', 'The password is too weak.');
                } else if (errorCode === 'auth/email-already-in-use') {
                    Alert.alert('Error', 'Email is already in use.');
                } else {
                    Alert.alert('Error', errorMessage);
                }
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
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
});

export default LoginPage;
