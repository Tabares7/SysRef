import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

    

// Guardar token en el almacenamiento local
export const storeToken = async (token) => {
    if (!token) {
        console.error('Error saving token: token is undefined or null');
        return;
    }
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Error saving token', error);
    }
};

// Recuperar token del almacenamiento local
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('authToken');
    } catch (error) {
        console.error('Error retrieving token', error);
    }
};

// Limpiar token del almacenamiento local
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error removing token', error);
    }
};

export const saveUser = async (user) => {
    if (!user) {
        console.error('Error saving user: user is undefined or null');
        return;
    }
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user', error);
    }
}

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        const id = JSON.parse(user);

        const clinic = await fetch(`${API_URL}clinics/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await clinic.json();
        if (clinic.ok){
            console.log('Clinic data', data);
            return data.clinic.name;
        }


    } catch (error) {
        console.error('Error retrieving user', error);
    }
}