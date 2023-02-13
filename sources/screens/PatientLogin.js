import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ImageBackground, TextInput, SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';

import Patient from './Patient'
import CreatePatient from './CreatePatient'
import { styles } from './styles';
import axios from 'axios';
import localStorage from '@react-native-async-storage/async-storage'
import { baseUrl } from '../utilities/api/baseUrl';

const image = require('../assets/background.jpg')

export default function PatientLogin({ navigation }) {

  const checkToken = async () => {
    if (await localStorage.getItem('token') != null) {
      navigation.navigate('Patient');
    }
  }



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const LoginStudent = () => {
    axios.post(`${baseUrl}/user/login`, {
      email: email,
      password: password
    }).then(async(response) => {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('id', response.data.register._id);
      if (await localStorage.getItem('token') != null) {
        navigation.navigate(Patient);
      }
    }).catch((error) => {
      console.log(error,"error");
    });
    //   var data = {
    //     Email: Email,
    //     Password: Password
    //   }

      // let result = await fetch(`${baseUrl}/esmart/LoggedInSpecialist.php`,
    //     {
    //       mode: 'no-cors',
    //       method: "Post",
    //       body: JSON.stringify(data),
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     });

    //   //result = await result.json();

    //   if (Email == "a" && Password == "1") {
    //     navigation.navigate(Patient)
    //   }
    //   else {
    //     alert("Invalid Credientals")
    //   }

  }

  useEffect(() => {
    checkToken()
  });


  return (
    <ImageBackground source={image} style={styles.imageBackgroundContainer}>
      <SafeAreaView>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={[styles.textStyle, { fontSize: 50, color: '#88ACBE' }]}>Patient's</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.textStyle, { fontSize: 50, color: '#88ACBE' }]}>Login</Text>
        </View>

        <View style={{ marginTop: '20%' }}>
          <TextInput style={[styles.inputStyle, { color: '#39559E' }]} onChangeText={setEmail} placeholder="Enter Username" placeholderTextColor="#6080D1" />
          <TextInput secureTextEntry={true} style={[styles.inputStyle, { color: '#39559E' }]} onChangeText={setPassword} placeholder="Enter Password" placeholderTextColor="#6080D1" />
        </View>

        <TouchableOpacity style={styles.touchableStyle}
          onPress={() => LoginStudent()}>
          <Text style={{ fontSize: 22, color: '#39559E' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableStyle}
          onPress={() => navigation.navigate(CreatePatient)}>
          <Text style={{ fontSize: 22, color: '#39559E' }}>Create a new account</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}
