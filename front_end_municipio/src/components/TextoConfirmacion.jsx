import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TextoConfirmacion() {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Denuncia Confirmado!</Text>
      <Text style={styles.message}>
        Tu denuncia ya fue enviada, será atendido con brevedad por nuestros agentes.
      </Text>
      <Text style={styles.thanks}>Gracias.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  thanks: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6BDC76',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

