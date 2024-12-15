import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faBus, faMapMarkerAlt, faClock, faTicketAlt, faCogs } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://192.168.11.173:3000/mahasiswa';
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [waktu, setWaktu] = useState('');
  const [tipe, setTipe] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const refreshPage = () => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setNama(item.nama);
    setLokasi(item.lokasi);
    setWaktu(item.waktu);
    setTipe(item.tipe);
  };

  const submit = () => {
    const data = { nama, lokasi, waktu, tipe };

    if (selectedUser) {
      fetch(`http://192.168.11.173:3000/mahasiswa/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          alert('Data tersimpan');
          resetForm();
          refreshPage();
        })
        .catch((error) => console.error(error));
    } else {
      fetch(jsonUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          alert('Data ditambahkan');
          resetForm();
          refreshPage();
        })
        .catch((error) => console.error(error));
    }
  };

  const resetForm = () => {
    setNama('');
    setLokasi('');
    setWaktu('');
    setTipe('');
    setSelectedUser(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#003366" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {selectedUser ? 'Edit Halte' : 'Tambah Halte'}
            </Text>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faBus} size={18} color="#003366" />
                <TextInput
                  placeholder="Nama Halte"
                  value={nama}
                  onChangeText={setNama}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#003366" />
                <TextInput
                  placeholder="Lokasi"
                  value={lokasi}
                  onChangeText={setLokasi}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faClock} size={18} color="#003366" />
                <TextInput
                  placeholder="Waktu Operasional"
                  value={waktu}
                  onChangeText={setWaktu}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faCogs} size={18} color="#003366" />
                <TextInput
                  placeholder="Pelayanan"
                  value={tipe}
                  onChangeText={setTipe}
                  style={styles.input}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={submit}>
                <Text style={styles.submitButtonText}>
                  {selectedUser ? 'Edit' : 'Tambah'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.devider}></View>

            <FlatList
              data={dataUser}
              onRefresh={refreshPage}
              refreshing={refresh}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <View style={styles.card}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon icon={faBus} size={45} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardtitle}>{item.nama}</Text>

                      <View style={styles.infoContainer}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={16} color="#003366" />
                        <Text style={styles.cardText}>{item.lokasi}</Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <FontAwesomeIcon icon={faClock} size={16} color="#003366" />
                        <Text style={styles.cardText}>{item.waktu}</Text>
                      </View>

                      <View style={styles.infoContainer}>
                        <FontAwesomeIcon icon={faCogs} size={16} color="#003366" />
                        <Text style={styles.cardText}>{item.tipe}</Text>
                      </View>
                    </View>

                    <View style={styles.editIcon}>
                      <FontAwesomeIcon icon={faPenToSquare} size={18} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Latar belakang utama
  },
  title: {
    paddingVertical: 18, // Reduced padding for title
    backgroundColor: '#003366', // Warna latar belakang judul
    color: '#FFD700', // Warna teks judul
    fontSize: 22, // Slightly reduced title font size
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 12, // Reduced horizontal padding for compact form
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700', // Border warna kuning
    borderRadius: 6, // Slightly reduced border radius
    paddingVertical: 4, // Further reduced padding
    paddingHorizontal: 8, // Reduced horizontal padding
    width: '100%',
    marginVertical: 4, // Reduced vertical margin for closer inputs
    backgroundColor: '#ffffff', // Warna latar belakang input
  },
  input: {
    flex: 1,
    fontSize: 10, // Further reduced font size
    color: '#003366', // Warna teks input
    paddingLeft: 8, // Reduced padding inside the input field
  },
  submitButton: {
    backgroundColor: '#FFD700', // Warna tombol kirim
    borderRadius: 6, // Reduced border radius
    paddingVertical: 12, // Reduced padding for smaller button
    paddingHorizontal: 24, // Reduced horizontal padding for button
    marginTop: 12, // Reduced margin for button
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 14, // Reduced font size for button text
    fontWeight: 'bold',
    color: '#003366', // Warna teks tombol kirim
  },
  devider: {
    height: 1,
    backgroundColor: '#003366', // Divider warna biru gelap
    marginVertical: 12, // Reduced vertical margin
  },
  avatar: {
    borderRadius: 50,
    width: 70, // Smaller icon size for avatar
    height: 70, // Smaller icon size for avatar
    backgroundColor: '#003366', // Avatar warna biru gelap
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Menempatkan di tengah secara vertikal
    marginRight: 12, // Reduced margin between avatar and content
  },
  cardtitle: {
    fontSize: 14, // Reduced card title size
    fontWeight: 'bold',
    color: '#003366', // Warna teks judul kartu menjadi biru
    marginBottom: 6, // Reduced margin between title and content
  },
  cardText: {
    fontSize: 12, // Reduced card text size
    color: '#003366', // Warna teks isi kartu menjadi biru
    marginLeft: 6, // Reduced space between icon and text
  },
  card: {
    flexDirection: 'row',
    padding: 12, // Reduced padding for cards
    borderRadius: 10, // Slightly reduced card border radius
    backgroundColor: '#ffffff', // Background putih untuk card
    marginBottom: 10, // Reduced margin between cards
    elevation: 4, // Reduced elevation for cards
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
  },
  editIcon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10, // Reduced margin
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6, // Reduced margin between info items
    marginLeft: 6, // Reduced margin left
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#003366', // Warna teks loading
    fontSize: 14, // Reduced font size for loading text
    marginTop: 6, // Reduced top margin
  },
});

export default Createdata;
