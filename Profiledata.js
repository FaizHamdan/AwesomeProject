import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGithub, faLinkedin, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Add a custom hook for hover/press effect using Animated API
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ProfileData = () => {
  const profile = {
    name: 'Faiz Hamdan Zulfa', // Nama dapat diubah langsung di sini
    nim: '22/504512/SV/21651', // NIM dapat diubah langsung di sini
    class: 'B', // Kelas dapat diubah langsung di sini
    socialLinks: [
      { 
        platform: 'GitHub', 
        url: 'https://github.com/FaizHamdan', 
        icon: faGithub, 
        color: '#333' 
      },
      { 
        platform: 'LinkedIn', 
        url: 'https://www.linkedin.com/in/FaizHamdan', 
        icon: faLinkedin, 
        color: '#0077b5' 
      },
      { 
        platform: 'WhatsApp', 
        url: 'https://wa.me/6281353592686', 
        icon: faWhatsapp, 
        color: '#25d366' 
      },
      { 
        platform: 'Instagram', 
        url: 'https://www.instagram.com/faizhamd__', 
        icon: faInstagram, 
        color: '#e1306c' 
      },
    ],
  };

  // Animated press effect for buttons
  const handlePressIn = (event) => {
    // Can change style or trigger animation on press
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section with Gradient Background */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        
        {/* Profile Image */}
        <Image 
          source={require('./Gambar/Foto.jpg')}  // Mengambil gambar lokal dari folder Gambar
          style={styles.profileImage}
        />
      </View>

      <View style={styles.card}>
        {/* Menampilkan Nama, NIM, dan Kelas yang bisa diubah langsung di kode */}
        <Text style={styles.label}>Nama</Text>
        <Text style={styles.value}>{profile.name}</Text>
        
        <Text style={styles.label}>NIM</Text>
        <Text style={styles.value}>{profile.nim}</Text>
        
        <Text style={styles.label}>Kelas</Text>
        <Text style={styles.value}>{profile.class}</Text>

        <Text style={styles.label}>Link Social Media:</Text>
        {profile.socialLinks.map((link, index) => (
          <View key={index} style={[styles.socialCard, { borderColor: link.color }]}>
            <AnimatedTouchableOpacity
              style={styles.socialButton}
              onPress={() => Linking.openURL(link.url)}
              onPressIn={handlePressIn}
              activeOpacity={0.7}
            >
              <FontAwesomeIcon icon={link.icon} size={24} style={[styles.icon, { color: link.color }]} />
              <View style={styles.textContainer}>
                <Text style={[styles.linkText, { color: link.color }]}>{link.platform}</Text>
                <Text style={[styles.description, { color: link.color }]}>
                  Kunjungi profil {link.platform} untuk melihat proyek dan kontribusi.
                </Text>
              </View>
            </AnimatedTouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#003366', // Gradient or solid color for header
    paddingVertical: 25, // Adjusted smaller height for header
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 30, // Reduced font size for a more compact look
    fontWeight: 'bold',
    color: '#FFD700',
  },
  profileImage: {
    width: 100, // Set size of the profile image
    height: 100,
    borderRadius: 50, // Makes the image circular
    marginTop: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  socialCard: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 18,
  },
});

export default ProfileData;
