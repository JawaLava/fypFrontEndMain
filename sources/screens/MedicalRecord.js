import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Patient from './Patient';
const img_src = require('../assets/background.jpg')
import { styles } from './styles';
import axios from "axios";
import localStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../utilities/api/baseUrl';

export default function MedicalRecord({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disease, setDisease] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicine, setMedicine] = useState('');
  const [prescription,setPrescription] = useState('')


  const [user, setUser] = useState();

  const getMedicalRecord = async () => {

    const userid = await localStorage.getItem("id")

    axios.get(`${baseUrl}/user/` + (userid)).then((res) => {

      setUser(res.data);
      setName(res.data.name);
      setPassword(res.data.password);
      setEmail(res.data.email);
      setPrescription(res.data?.prescription)
      // setPrescription
    })

  }

  useEffect(() => {

    getMedicalRecord()

  }, []);



  const updateRec = async () => {
    const userid = await localStorage.getItem("id")
    axios.put(`${baseUrl}/user/record/` + (userid),
      { name: name, email: email, password: password, disease: disease, allergies: allergies, medicines: medicine,prescription:prescription  }).then((res) => {
        console.log(res,"res");
      })
  }


  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={[styles.textStyle, { fontSize: 48, color: '#000044', textAlign: "center" }]}>Medical Record</Text>
      </View>

      <View style={styles.container8}>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Patient Name: </Text>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} placeholder="Name" disabled defaultValue={user?.name} />
        </View>

        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Diseases: </Text>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} placeholder="Disease" onChangeText={setDisease} defaultValue={user?.disease} />
        </View>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Allergies: </Text>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} placeholder="Allergies" onChangeText={setAllergies} defaultValue={user?.allergies} />
        </View>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Scan Prescription: </Text>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} placeholder="Scanned prescription" onChangeText={setPrescription} defaultValue={user?.prescription} />
        </View>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>Medicines: </Text>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} onChangeText={setMedicine} placeholder="Medicine" defaultValue={user?.medicine} />
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: '#9DA990', width: '40%', paddingVertical: "3%", justifyContent: "center", alignItems: "center", marginTop: '2%' }}
            onPress={() => navigation.navigate(Patient)}>
            <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: "left" }}>
              <Icon2 name="leftcircle" size={20} color="#FFFFFF" /> back</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{ backgroundColor: '#9DA990', width: '50%', paddingVertical: "3%", justifyContent: "center", alignItems: "center", marginTop: '2%' }}
            onPress={() => { updateRec(); alert("user medical record updated") }}>
            <Text style={{ fontSize: 20, color: '#FFFFFF', textAlign: "left" }}>
              <Icon2 name="leftcircle" size={20} color="#FFFFFF" /> Update Record</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>


  );
}
