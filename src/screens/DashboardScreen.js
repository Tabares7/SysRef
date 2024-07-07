// screens/DashboardScreen.js
import React, { useEffect , useState} from 'react';
import { View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const DashboardScreen = ({navigation}) => {


  return (
    <View style={styles.container} >
      <Text style={styles.title}>Dashboard Screen</Text>
      <View style={styles.section}>
      <View style={styles.card}>
      <Text style={styles.subtitle}>Bienvenido a la pantalla de inicio</Text>
      </View>
      <View style={styles.card}>
      <Text style={styles.subtitle}>Bienvenido la pantalla de inicio</Text>
      </View>
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    padding: 20,
  },
  section:{
    flex: 1,
    flexDirection: 'row',
    gap:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "blue" 
  },
  subtitle:{
    color: "white",
    fontSize:18,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  card:{
    backgroundColor: '#2d22de',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    height:150,
    width: 150
  }
});


export default DashboardScreen;
