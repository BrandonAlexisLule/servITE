import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/register/card";
import { supabase } from "../../lib/supabase";


interface HomeScreenProps {
  session: Session;
  onSignOut: () => void;
}

function HomeScreen({ }: HomeScreenProps) {
  const [servicios, setServicios] = useState<any[]>([]);
  const [filteredServicios, setFilteredServicios] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tiposServicio, setTiposServicio] = useState<string[]>([]);

  useEffect(() => {
    fetchServicios();
    fetchTiposServicio();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterType, servicios]);

  const fetchTiposServicio = async () => {
  const { data, error } = await supabase
    .from("service_catalog")
    .select("type_service");

  if (error) {
    console.error("Error al obtener tipos de servicio:", error);
  } else {
    const tiposUnicos = Array.from(new Set(data.map((item) => item.type_service)));
    setTiposServicio(tiposUnicos);
  }
};

  const fetchServicios = async () => {
    const { data, error } = await supabase.from("service_catalog").select("*");
    if (error) {
      console.error("Error al obtener servicios:", error);
    } else {
      setServicios(data);
    }
  };

  const applyFilters = () => {
    let filtered = servicios;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name_service.includes(searchTerm)
      );
    }

    if (filterType) {
      filtered = filtered.filter((item) => item.type_service === filterType);
    }

    setFilteredServicios(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeHolder={"Buscar..."}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="options-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredServicios}
        keyExtractor={(item) => item.id_service}
        renderItem={({ item }) => <Card servicio={item} />}
        style={styles.list}
      />

      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por tipo de servicio</Text>
            {tiposServicio.map((tipo) => (
              <Pressable
                key={tipo}
                style={styles.filterOption}
                onPress={() => {
                  setFilterType(tipo);
                  setShowFilterModal(false);
                }}
              >
                <Text>{tipo}</Text>
              </Pressable>
            ))}
            <Pressable
            style={styles.filterOption}
            onPress={() => {
            setFilterType(null);
            setShowFilterModal(false);
            }}
            >
            <Text>Todos</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#fff' 
  },
  logo: { 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    marginRight: 5,
  },
  searchIcon: {
    position: 'absolute',
    right: 60,
  },
  filterButton: {
    margin : 8,
    width: 40,
    height: 40,
    backgroundColor: '#5c6bc0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
    modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterOption: {
    paddingVertical: 10,
  },

});