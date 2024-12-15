import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons'; // Import faBus icon

// Sample halt data (you would ideally fetch this from an API or use this JSON directly)
const availableStops = [
  { id: '1', nama: 'Halte GSP', lokasi: 'Sayap Barat GSP', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.786782746833777, longitude: 110.3779934719205 },
  { id: '2', nama: 'Halte Perpustakaan Pusat', lokasi: 'Sayap Utara GSP', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.781232237824129, longitude: 110.36757007239207 },
  { id: '3', nama: 'Halte Kehutanan', lokasi: 'Depan Fakultas Kehutanan', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.773773686892483, longitude: 110.36831400789553 },
  { id: '4', nama: 'Halte Pertanian', lokasi: 'Depan Fakultas Pertanian', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926202, longitude: 110.6718403 },
  { id: '5', nama: 'Halte Peternakan', lokasi: 'Depan Fakultas Peternakan', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926222, longitude: 110.6718403 },
  { id: '6', nama: 'Halte Wisdom Park', lokasi: 'Depan Wisdom Park', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926232, longitude: 110.6718403 },
  { id: '7', nama: 'Halte Ilmu Budaya', lokasi: 'Depan Fakultas Ilmu Budaya', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926262, longitude: 110.6718403 },
  { id: '8', nama: 'Halte University Club', lokasi: 'Depan University Club', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926142, longitude: 110.6718403 },
  { id: '9', nama: 'Halte Jalan Medika', lokasi: 'Jalan Medika FKKMK', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.6926242, longitude: 110.6718403 },
  { id: '10', nama: 'Halte Teknik', lokasi: 'Depan Tugu Fakultas Teknik', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.762175582339016, longitude: 110.3441179614524 },
  { id: '11', nama: 'Halte Biologi', lokasi: 'Depan Fakultas Biologi', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.762175582339016, longitude: 110.3441179614524 },
  { id: '12', nama: 'Halte Mipa', lokasi: 'Depan Fakultas Mipa', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.786782746833777, longitude: 110.3779934719205 },
  { id: '13', nama: 'Halte Kerohanian', lokasi: 'Depan Fasilitas Kerohanian', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.786782746833777, longitude: 110.3779934719205 },
  { id: '14', nama: 'Halte TILC', lokasi: 'Depan Gedung TILC', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.786782746833777, longitude: 110.3779934719205 },
  { id: '15', nama: 'Halte Kemuning', lokasi: 'Jalan Kemuning  Utara Vokasi', waktu: '06.30 - 16.30', tipe: 'Offline atau Online', latitude: -7.786782746833777, longitude: 110.3779934719205 }
];

const Pesandata = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [ticketCount, setTicketCount] = useState(1); // Default to 1 ticket
  const [orderTime, setOrderTime] = useState(null); // Track order time
  const [haltName, setHaltName] = useState(''); // Name of the halt
  const [orderExpiryTime, setOrderExpiryTime] = useState(null); // Track ticket expiry time
  const [page, setPage] = useState(1); // Track the current page for button display
  const itemsPerPage = 5; // Number of buttons to show per page

  // Handle order action
  const handleOrder = (selectedHalt) => {
    // Show confirmation before proceeding with the order
    Alert.alert(
      'Konfirmasi Booking',
      `Apakah Anda yakin ingin booking tiket di ${selectedHalt.nama}?`,
      [
        {
          text: 'Batal',
          onPress: () => console.log('Pemesanan dibatalkan'),
          style: 'cancel',
        },
        {
          text: 'Pesan Tiket',
          onPress: () => {
            setHaltName(selectedHalt.nama);
            setOrderPlaced(true);
            const currentTime = Date.now();
            setOrderTime(currentTime); // Set the current time as order time
            const expiryTime = currentTime + 2 * 60 * 60 * 1000; // Set expiry time to 2 hours from now
            setOrderExpiryTime(expiryTime);
            Alert.alert('Booking Successful', `Anda telah berhasil booking ${ticketCount} tiket di ${selectedHalt.nama}.`);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Handle order cancellation
  const handleCancelOrder = () => {
    setOrderPlaced(false);
    setOrderTime(null);
    setOrderExpiryTime(null);
    setHaltName(''); // Clear halt name when the order is cancelled
    Alert.alert('Booking Dibatalkan', `Booking tiket di ${haltName} telah dibatalkan.`);
  };

  // Handle order completion
  const handleCompleteOrder = () => {
    setOrderPlaced(false);
    setOrderTime(null);
    setOrderExpiryTime(null);
    setHaltName('');
    Alert.alert('Perjalanan Selesai',
        `Perjalanan Anda dari ${haltName} telah selesai. Terima kasih telah menggunakan layanan kami! Semoga perjalanan Anda menyenangkan dan sampai jumpa di perjalanan berikutnya!`);
  };

  // Function to load more items (pagination)
  const loadMoreStops = () => {
    setPage(page + 1);
  };

  // Get the current set of stops to display
  const displayedStops = availableStops.slice(0, page * itemsPerPage);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Booking Tiket</Text>
        <Text style={styles.subtitle}>Pilih Halte Yang Ingin Anda Tuju!</Text>
      </View>

      {/* Scrollable Buttons */}
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {displayedStops.map((stop) => (
          <TouchableOpacity
            key={stop.id}
            style={styles.button}
            onPress={() => handleOrder(stop)} // Trigger booking on button press
          >
            <Text style={styles.buttonText}>{stop.nama}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* "Load More" Button */}
      {displayedStops.length < availableStops.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreStops}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}

      {/* Order Confirmation */}
      {orderPlaced && (
        <View style={styles.orderConfirmation}>
          <View style={styles.ticketInfo}>
            <FontAwesomeIcon icon={faBus} size={30} color="#fff" style={styles.icon} />
            <Text style={styles.orderText}>Tiket telah dibooking untuk naik di halte : <Text style={styles.haltName}>{haltName}</Text></Text>
            <Text style={styles.orderText}>Jumlah Tiket: {ticketCount}</Text>
            <Text style={styles.orderText}>Waktu Pemesanan: {new Date(orderTime).toLocaleString()}</Text>
          </View>

          {/* Cancel Order Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
            <Text style={styles.cancelButtonText}>Batal Pesanan</Text>
          </TouchableOpacity>

          {/* Complete Order Button */}
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteOrder}>
            <Text style={styles.completeButtonText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Light Blue background
    padding: 20,
  },
  header: {
    marginBottom: 30,
    backgroundColor: '#003366', // Blue background for header
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    color: '#FFD700', // Yellow title text color
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0066CC', // Blue background for buttons
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    width: '80%', // Make buttons wide
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadMoreButton: {
    backgroundColor: '#4CAF50', // Green background for load more button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  loadMoreText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  orderConfirmation: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0066CC', // Blue background for order confirmation
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  haltName: {
    fontStyle: 'italic',
    color: '#FFD700', // Yellow text for halt name
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red background for cancel button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#FFD700', // Green background for complete button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pesandata;
