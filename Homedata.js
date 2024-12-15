import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';

const Homedata = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Banner Informasi - Fitur Unggulan */}
          <View style={styles.bannerCard}>
            <Text style={styles.bannerTitle}>TayoGama</Text>
          </View>

          {/* Header - Halo, mau kemana hari ini? */}
          <Text style={styles.title}>Halo, Mari mulai perjalananmu! Temukan rute dan halte bus terdekat bersama TayoGama.</Text>

          {/* Informasi Gambar */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Informasi TayoGama</Text>
            <Image
              source={require('./Gambar/Tayo.jpg')} // Ganti dengan path gambar yang sesuai
              style={styles.infoImage}
            />
            <Text style={styles.infoDescription}>
              TayoGama adalah aplikasi yang membantu civitas akademika Universitas Gadjah Mada (UGM) dalam menemukan rute terbaik
              menggunakan layanan transportasi ramah lingkungan, termasuk bus listrik Trans Gadjah Mada yang beroperasi di lingkungan kampus.
              Aplikasi ini dirancang untuk mempermudah mobilitas mahasiswa, dosen, dan staf di area kampus dengan cara yang efisien dan ramah lingkungan.
            </Text>

            <Text style={styles.infoTitle}>Informasi Rute</Text>
            <Image
              source={require('./Gambar/Rute.jpg')} // Ganti dengan path gambar yang sesuai
              style={styles.infoImageLarge}
            />
            <Text style={styles.infoDescription}>
              Rute Trans Gadjah Mada menghubungkan berbagai kawasan di dalam kampus UGM dengan dua jalur bus listrik yang telah dioperasikan.
              Setiap jalur memiliki satu armada bus listrik yang siap melayani perjalanan dengan estimasi waktu satu putaran sekitar 1 jam.
              Aplikasi TayoGama memberikan informasi tentang halte-halte yang dilalui dan jam operasional bus untuk memudahkan perjalanan.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Latar belakang biru muda
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Space at the bottom for smoother scroll experience
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // Padding lebih banyak di kiri-kanan agar elemen tidak terlalu rapat ke tepi
    paddingTop: 15, // Memberikan sedikit jarak dari atas
  },
  // Banner - Fitur Unggulan
  bannerCard: {
    paddingVertical: 25, // Meningkatkan tinggi padding untuk membuat teks lebih besar
    backgroundColor: '#003366', // Dark Blue background
    borderRadius: 10,
    marginBottom: 15, // Mengurangi jarak antara banner dan teks berikutnya
    alignItems: 'center',
    paddingHorizontal: 15, // Menambahkan padding horizontal agar teks tidak terlalu menempel
  },
  bannerTitle: {
    fontSize: 28, // Memperbesar ukuran teks judul
    fontWeight: 'bold',
    color: '#FFD700', // Kuning emas
    textAlign: 'center',
  },
  // Header - Halo
  title: {
    fontSize: 20, // Ukuran font sedikit lebih besar untuk menonjolkan teks header
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003366',
    marginTop: 0, // Mengurangi jarak antara banner dan teks header
    marginBottom: 20, // Mengurangi jarak antara teks header dan konten berikutnya
    lineHeight: 28, // Menambah tinggi baris untuk membuat teks lebih mudah dibaca
    paddingHorizontal: 10, // Menambahkan padding kiri-kanan pada judul agar tidak terlalu rapat
  },
  // Info Cards
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20, // Meningkatkan padding agar isi card lebih leluasa
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    marginBottom: 25,
    width: '100%', // Full width untuk info card
    paddingHorizontal: 15, // Padding horizontal di dalam card
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15, // Memberikan jarak lebih banyak antara judul dan gambar
    color: '#003366',
  },
  infoImage: {
    width: '100%', // Full width
    height: 200,
    resizeMode: 'cover', // Menyesuaikan gambar agar tidak terdistorsi
    borderRadius: 15,
    marginBottom: 20, // Menambah jarak antara gambar dan teks deskripsi
  },
  infoImageLarge: {
    width: '100%', // Full width
    height: 350, // Tinggi lebih besar untuk gambar kedua
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 20, // Memberikan jarak antara gambar dan deskripsi
  },
  infoDescription: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'justify', // Teks lebih rapi dan teratur
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15, // Padding kiri-kanan untuk teks deskripsi
  },
});

export default Homedata;
