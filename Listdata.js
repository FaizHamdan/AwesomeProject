import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Linking, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBus, faChevronRight, faMapMarkerAlt, faClock, faCogs, faSearch } from '@fortawesome/free-solid-svg-icons';  // Menambahkan faSearch

const Listdata = () => {
  const jsonUrl = 'http://192.168.11.173:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);  // State for filtered data
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');  // State for search query

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);  // Initially, show all data
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);  // Reset filtered data when refreshed
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  function deleteData(id) {
    fetch(jsonUrl + '/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((json) => {
        alert('Data terhapus');
        refreshPage();
      });
  }

  // Function to open Google Maps with coordinates
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Error opening maps: ", err));
  };

  // Function to filter data based on the search query
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredData(dataUser);  // Show all data if search is empty
    } else {
      const filtered = dataUser.filter((item) =>
        item.nama.toLowerCase().includes(text.toLowerCase())  // Filter based on name
      );
      setFilteredData(filtered);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E0F7FA' }}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Halte</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} size={20} color="#003366" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Nama Halte..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}  // Use filteredData for displaying the list
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={({ id }, index) => id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}  // Ensure the FlatList content can scroll
          keyboardShouldPersistTaps="handled"  // Ensure tap is handled even if the keyboard is visible
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.avatar}>
                    <FontAwesomeIcon icon={faBus} size={40} color="#fff" />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardtitle}>{item.nama}</Text>

                    {/* Lokasi Icon */}
                    <View style={[styles.row, { paddingLeft: 10 }]}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="#003366" />
                      <Text style={styles.cardText}>{item.lokasi}</Text>
                    </View>

                    {/* Waktu Icon */}
                    <View style={[styles.row, { paddingLeft: 10 }]}>
                      <FontAwesomeIcon icon={faClock} size={14} color="#003366" />
                      <Text style={styles.cardText}>{item.waktu}</Text>
                    </View>

                    {/* Tipe Icon */}
                    <View style={[styles.row, { paddingLeft: 10 }]}>
                      <FontAwesomeIcon icon={faCogs} size={14} color="#003366" />
                      <Text style={styles.cardText}>{item.tipe}</Text>
                    </View>
                  </View>
                  <View style={styles.rightIcon}>
                    <FontAwesomeIcon icon={faChevronRight} size={20} color="#fff" />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Buttons section */}
              <View style={styles.buttonsRow}>
                {/* Delete Button */}
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonDelete]}
                    onPress={() =>
                      Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                        { text: 'Tidak', onPress: () => console.log('button tidak') },
                        { text: 'Ya', onPress: () => deleteData(item.id) },
                      ])
                    }
                  >
                    <Text style={styles.buttonText}>Hapus</Text>
                  </TouchableOpacity>
                </View>

                {/* Open Google Maps Button */}
                <View style={styles.buttonWrapper}>
                  {/* Ensure the coordinates exist in the item */}
                  {item.latitude && item.longitude && (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonMap]}
                      onPress={() => openGoogleMaps(item.latitude, item.longitude)}
                    >
                      <Text style={styles.buttonText}>Lihat di Peta</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#003366', // Dark blue background for the title container
    paddingVertical: 15,
    alignItems: 'center',
  },
  title: {
    color: '#FFD700', // Yellow text color
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',  // White background to match input
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,  // Add shadow for better visibility
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    backgroundColor: '#fff',  // White background for the search input
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: '#003366',         // Dark blue text color
  },
  avatar: {
    borderRadius: 100,
    width: 70,
    height: 70, // Adjusted to make avatar size more consistent
    backgroundColor: '#003366', // Dark blue for avatar background
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // Adjusted marginTop to move the icon down a bit
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366', // Dark blue for card title
    marginLeft: 10, // Added margin to separate text from icon
  },
  cardText: {
    fontSize: 14,
    color: '#003366', // Dark blue for card text
    marginLeft: 10, // Added margin to separate text from icon
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // White background for the cards
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10, // Added margin to give space between the text and icon
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5, // Space between rows
    paddingLeft: 20, // Move both icon and text to the right
  },
  buttonsRow: {
    flexDirection: 'row', // Align buttons horizontally next to data
    justifyContent: 'space-between', // Space buttons apart
    alignItems: 'center', // Vertically align buttons with the data
    paddingHorizontal: 20,
    paddingTop: 5, // Add top padding for better spacing
    paddingBottom: 10, // Adjusted bottom padding for better layout
  },
  buttonWrapper: {
    width: '45%', // Limit button width to prevent overlap
    marginHorizontal: 5, // Add margin between buttons
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded button corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDelete: {
    backgroundColor: '#FF5722', // Red color for delete button
  },
  buttonMap: {
    backgroundColor: '#FFD700', // Yellow color for map button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // White color for text inside buttons
  },
});
