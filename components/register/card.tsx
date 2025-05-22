import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Card = ({ servicio }: any) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{servicio.name_service}</Text>
        <Icon name="bookmark-outline" size={20} color="black" />
      </View>
      <Text style={styles.cardDescription}>Descripción: {servicio.description}</Text>
      <Text style={styles.cardTipo}>Tipo: {servicio.type_service}</Text>
      <Text style={styles.cardTipo}>Perfil: {servicio.profile}</Text>
    </View>
  </View>
);

export default Card

const styles = StyleSheet.create({
    card: {
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#b0e0e6',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 12,
    marginTop: 5,
  },
  cardTipo: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
  },
})