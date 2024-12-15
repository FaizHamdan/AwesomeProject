import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';

const Createdata = () => {
    const jsonUrl = 'http://192.168.11.173:3000/mahasiswa';
    const [nama, setNama] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [waktu, setWaktu] = useState('');
    const [tipe, setTipe] = useState('');


    const submit = () => {
        const data = {
            nama: nama,
            lokasi: lokasi,
            waktu: waktu,
            tipe: tipe,
            
        };
        fetch('http://192.168.11.173:3000/mahasiswa', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data tersimpan');
                setNama('');
                setLokasi('');
                setWaktu('');
                setTipe('');
            })
    }

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Tambah Data Mahasiswa</Text>
                <ScrollView style={styles.form}>
                    <TextInput style= {styles.input} placeholder="Nama" value={nama} onChangeText={(value) => setNama(value)} />
                    <TextInput style= {styles.input}placeholder="Lokasi" value={lokasi} onChangeText={(value) => setLokasi(value)} />
                    <TextInput style= {styles.input}placeholder="Waktu Operasional" value={waktu} onChangeText={(value) => setWaktu(value)} />
                    <TextInput style= {styles.input}placeholder="Booking Tiket" value={tipe} onChangeText={(value) => setTipe(value)} />
                    <Button title="Simpan" style={styles.button} onPress={submit} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Createdata

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 10,
        marginBottom: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    }
})