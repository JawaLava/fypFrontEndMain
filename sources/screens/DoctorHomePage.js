import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';
import localStorage from '@react-native-async-storage/async-storage'
import { styles } from './styles';

import ContactDoc from './ContactDoc';
import DoctorLogin from './DoctorLogin';
import AccountInfoDoc from './AccountInfoDoc';
import axios from 'axios';
import { baseUrl } from '../utilities/api/baseUrl';

//const img_src = require('../assets/background.jpg')

export default function DoctorHomePage({ navigation }) {

  /*const checkToken = async () => {

    if (await localStorage.getItem('token') == null) {
      navigation.navigate(DoctorLogin);
    }

  }

  useEffect(() => {
    checkToken()
  }, [])*/

  const [state, setState] = useState(false);
  const displayModal = (show) => {
    setState(show)
  };
  const [Med, setMed] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState('');

  async function MED() {
    axios.post(`${baseUrl}/patient/medicine/search`, { med: Med }).then((res) => {
      setResponse(res.data);
      setTimeout(() => {
        setIsLoading(false)
        displayModal(true);
      }, 3000);
    })
    //navigation.navigate(DrugToDrugResult,{paramKey:response})
  }

  const logout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("id");
    navigation.navigate(DoctorLogin)
  }

  if(isLoading){
    return (
      //<ImageBackground source={img_src} style={{flex:1}}>
      <View style={styles.MainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
            <TextInput style={[styles.container, { color: '#ffffff' }]}
              onChangeText={setMed} placeholder="Search Medicine" placeholderTextColor="#ffffff" />
            <Text style={{ textAlign: "right" }}
              onPress={() => { { MED(); } }}>
              <Icon name="search" size={25} color="#d6b2b2" /></Text>
          </View>
  
  
          <View style={{ marginTop: 1 }}>
            <Text style={[styles.container2, { fontSize: 30, color: '#183E9F', width: "100%", textAlign: "center" }]}>Doctor's Profile {'\n'} Select:</Text>
          </View>
  
  
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", borderRadius: 20 }}>
            <TouchableOpacity style={{ backgroundColor: '#9DA990', width: '100%', paddingVertical: "5%" }}
              onPress={() => navigation.navigate(AccountInfoDoc)}>
              <Text style={{ fontSize: 30, color: '#FFFFFF', textAlign: "left" }}>
                <Icon name="user" size={50} color="#FFFFFF" />  Doctor's  Profile</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: "1%", borderRadius: 20 }}>
            <TouchableOpacity style={{ backgroundColor: '#89959A', width: "100%", paddingVertical: "5%" }}
              onPress={() => navigation.navigate(ContactDoc)}>
              <Text style={{ fontSize: 30, color: '#FFFFFF', textAlign: "left" }}>
                <Icon2 name="doctor" size={50} color="#FFFFFF" />  Contact  Specialist</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: "1%", borderRadius: 20 }}>
            <TouchableOpacity style={{ backgroundColor: '#C89090', width: "100%", paddingVertical: "5%" }}
              onPress={logout}>
              <Text style={{ fontSize: 30, color: '#FFFFFF', textAlign: "left" }}>
                LOG OUT</Text>
            </TouchableOpacity>
          </View>
  
  
        </ScrollView >
      </View >
      //</ImageBackground>
  
  
    );
  }

  return (
    <View style={modalstyle.container}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={state}
        onRequestClose={() => {
          Alert.alert('Modal has now been closed.');
        }}>
        <View style={{ backgroundColor: '#9DA990', width: '100%', height: '100%', paddingVertical: "3%", justifyContent: "center", alignItems: "center" }}>
          {(response != '' && response != null) && (
            <Fragment>
              <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{response[0]} {'\n'} </Text>
              <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{response[1]} {'\n'} </Text>
              <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{response[2]} {'\n'} </Text>
              <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{response[3]} {'\n'} </Text>
            </Fragment>
          )}
          <TouchableOpacity onPress={() => {
            displayModal(!state); setIsLoading(true);
          }} style={{ backgroundColor: '#808977', width: '120%', paddingVertical: "5%", justifyContent: "center", alignItems: "center", marginTop: '5%' }} >
            <Text style={{ fontSize: 15, color: '#FFFFFF', textAlign: "left" }}>Close Modal</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  )
  
}
const modalstyle = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A68D80',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  }
});
