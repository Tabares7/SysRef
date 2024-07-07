import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { storeToken, storeClinicId } = useAuth();  // Usamos storeClinicId en lugar de setClinicId

   

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://192.168.0.8:5000/api/clinics/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            setLoading(false);
            if (response.ok) {
                console.log('Login successful', data);
                if (data.token && data.id) {  // Asegúrate de que el backend envíe clinicId junto con el token
                    await storeToken(data.token);
                    await storeClinicId(data.id);  // Guarda el clinicId usando el método adecuado
                    navigation.navigate('Dashboard');
                } else {
                    setError('Login failed: Token or Clinic ID not received');
                }
            } else {
                setError('Login failed: ' + data.message);
            }
        } catch (error) {
            setLoading(false);
            setError('Login error: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
});
