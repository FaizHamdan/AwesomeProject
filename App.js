// App.js
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Homedata from './Homedata'; // Import Homedata
import Pesandata from './Pesandata'; // Import Pesandata

const App = () => {
  const [showPesandata, setShowPesandata] = useState(false);

  // Function to handle button click and toggle between screens
  const handleBookingTicket = () => {
    setShowPesandata(true); // Set state to true to show Pesandata
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showPesandata ? (
        <Pesandata /> // Show Pesandata screen
      ) : (
        <Homedata onBookTicket={handleBookingTicket} /> // Show Homedata screen with handler
      )}
    </SafeAreaView>
  );
};

export default App;
