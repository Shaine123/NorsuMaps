import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { background, icon } from '../../constants';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmergencyScreen = ({ isEditable }) => {
  const [data, setData] = useState();

  const [fireStationNumbers, setFireStationNumbers] = useState({});
  const [policeStationNumbers, setPoliceStationNumbers] = useState({});
  const [cdrmmoNumbers, setCdrmmoNumbers] = useState({});
  const [cpsoNumbers, setCpsoNumbers] = useState({});
  const [ambulanceNumber, setAmbulanceNumber] = useState('');
  const [healthOfficeNumber, setHealthOfficeNumber] = useState('');
  const [norecoNumbers, setNorecoNumbers] = useState({});
  const [coastGuardNumbers, setCoastGuardNumbers] = useState({});

  const [newAgencyName, setNewAgencyName] = useState('');
  const [newAgencyNumber, setNewAgencyNumber] = useState('');
  const [dynamicAgencies, setDynamicAgencies] = useState({}); 

  const { buildingNew, currentUser } = useSelector(state => state.universal);

  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getEmergencyInfo')
      .then((res) => {
        setData(res.data);
        setFireStationNumbers(res.data[0].fireStationNumbers || {});
        setPoliceStationNumbers(res.data[0].policeStationNumbers || {});
        setCdrmmoNumbers(res.data[0].cdrmmoNumbers || {});
        setCpsoNumbers(res.data[0].cpsoNumbers || {});
        setAmbulanceNumber(res.data[0].ambulanceNumber || '');
        setHealthOfficeNumber(res.data[0].healthOfficeNumber || '');
        setNorecoNumbers(res.data[0].norecoNumbers || {});
        setCoastGuardNumbers(res.data[0].coastGuardNumbers || {});
        setDynamicAgencies(res.data[0].dynamicAgencies || {});
      });
  }, []);

  const renderTextOrInput = (value, setValue) => (
    true ? (
      <TextInput
        style={styles.number}
        value={value}
        onChangeText={setValue}
      />
    ) : (
      <Text style={styles.number}>{value}</Text>
    )
  );

  const updateEmergency = () => {
    axios.put('https://backendnorsumaps.onrender.com/editEmergencyInfo', {
      id: data[0]._id,
      fireStationNumbers: fireStationNumbers,
      policeStationNumbers: policeStationNumbers,
      cdrmmoNumbers: cdrmmoNumbers,
      cpsoNumbers: cpsoNumbers,
      ambulanceNumber: ambulanceNumber,
      healthOfficeNumber: healthOfficeNumber,
      norecoNumbers: norecoNumbers,
      coastGuardNumbers: coastGuardNumbers,
      dynamicAgencies: dynamicAgencies, // <-- Add this line
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const addNewAgency = () => {
    const newAgency = {
      [newAgencyName]: {
        number1: newAgencyNumber,
      },
    };

    axios.post('https://backendnorsumaps.onrender.com/addEmergencyInfo', newAgency)
      .then(res => {
        setDynamicAgencies({
          ...dynamicAgencies,
          [newAgencyName]: { number1: newAgencyNumber }
        });
        setData([...data, res.data]);
        setNewAgencyName('');
        setNewAgencyNumber('');
      })
      .catch(err => console.log(err));
  };

  const addNewPhoneNumber = (agency, setAgency, newNumberKey) => {
    setAgency({
      ...agency,
      [newNumberKey]: '',
    });
  };

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, height: '100%' }}>
      <Image source={background.SubBG} alt="alt" style={styles.subBG} />
      <ScrollView>
        <View style={styles.emergencyCard}>
          <Text style={styles.mainTitle}>EMERGENCY INFORMATION</Text>
          <Text style={styles.title}>In case of Fire or any Emergency:</Text>
          <Text style={styles.subtitle}>Bayawan City Fire Station Hotline Numbers:</Text>
          {Object.keys(fireStationNumbers).map((key) => renderTextOrInput(fireStationNumbers[key], (text) => setFireStationNumbers({ ...fireStationNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(fireStationNumbers, setFireStationNumbers, `number${Object.keys(fireStationNumbers).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }
  

          <Text style={styles.subtitle}>Bayawan City Police Station Hotline Numbers:</Text>
          {Object.keys(policeStationNumbers).map((key) => renderTextOrInput(policeStationNumbers[key], (text) => setPoliceStationNumbers({ ...policeStationNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(policeStationNumbers, setPoliceStationNumbers, `number${Object.keys(policeStationNumbers).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }

          <Text style={styles.subtitle}>Bayawan CDRRMO:</Text>
          {Object.keys(cdrmmoNumbers).map((key) => renderTextOrInput(cdrmmoNumbers[key], (text) => setCdrmmoNumbers({ ...cdrmmoNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(cdrmmoNumbers, setCdrmmoNumbers, `number${Object.keys(cdrmmoNumbers).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
               </TouchableOpacity>
  
             )
          }
       
          <Text style={styles.subtitle}>Bayawan CPSO:</Text>
          {Object.keys(cpsoNumbers).map((key) => renderTextOrInput(cpsoNumbers[key], (text) => setCpsoNumbers({ ...cpsoNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(cpsoNumbers, setCpsoNumbers, `number${Object.keys(cpsoNumbers).length + 1}`)}>
                <Text style={styles.addNumber}>Add Number</Text>
              </TouchableOpacity>
             )
          }

          <Text style={styles.subtitle}>Ambulance Request:</Text>
          {Object.keys(ambulanceNumber).map((key) => renderTextOrInput(ambulanceNumber[key], (text) => setAmbulanceNumber({ ...ambulanceNumber, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(ambulanceNumber, setAmbulanceNumber, `number${Object.keys(ambulanceNumber).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }

          <Text style={styles.subtitle}>Bayawan City Health Office:</Text>
          {Object.keys(healthOfficeNumber).map((key) => renderTextOrInput(healthOfficeNumber[key], (text) => setHealthOfficeNumber({ ...healthOfficeNumber, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(healthOfficeNumber, setHealthOfficeNumber, `number${Object.keys(healthOfficeNumber).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }
 
          <Text style={styles.subtitle}>NORECO II Hotline Numbers:</Text>
          {Object.keys(norecoNumbers).map((key) => renderTextOrInput(norecoNumbers[key], (text) => setNorecoNumbers({ ...norecoNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(norecoNumbers, setNorecoNumbers, `number${Object.keys(norecoNumbers).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }
        

          <Text style={styles.subtitle}>Philippine Coast Guard:</Text>
          {Object.keys(coastGuardNumbers).map((key) => renderTextOrInput(coastGuardNumbers[key], (text) => setCoastGuardNumbers({ ...coastGuardNumbers, [key]: text })))}
          {
             currentUser === 'admin' && (
              <TouchableOpacity onPress={() => addNewPhoneNumber(coastGuardNumbers, setCoastGuardNumbers, `number${Object.keys(coastGuardNumbers).length + 1}`)}>
              <Text style={styles.addNumber}>Add  Number</Text>
            </TouchableOpacity>
             )
          }

             {Object.keys(dynamicAgencies).map((agency) => (
            <View key={agency}>
              <Text style={styles.subtitle}>{agency}:</Text>
              {Object.keys(dynamicAgencies[agency]).map((key) => renderTextOrInput(dynamicAgencies[agency][key], (text) => setDynamicAgencies({
                ...dynamicAgencies,
                [agency]: {
                  ...dynamicAgencies[agency],
                  [key]: text
                }
              })))}
              {
                 currentUser === 'admin' && (
                  <TouchableOpacity onPress={() => addNewPhoneNumber(dynamicAgencies[agency], (newNumbers) => setDynamicAgencies({
                    ...dynamicAgencies,
                    [agency]: newNumbers
                  }), `number${Object.keys(dynamicAgencies[agency]).length + 1}`)}>
                    <Text style={styles.addNumber}>Add Number</Text>
                  </TouchableOpacity>
                 )
              }
            </View>
          ))}
         
        </View>

       {
         currentUser === 'admin' && (
          <View style={styles.newAgencyCard}>
          <Text style={styles.title}>Add New Agency</Text>
          <TextInput
            style={styles.number}
            placeholder="Agency Name"
            value={newAgencyName}
            onChangeText={setNewAgencyName}
          />
          <TextInput
            style={styles.number}
            placeholder="Agency Number"
            value={newAgencyNumber}
            onChangeText={setNewAgencyNumber}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addNewAgency}>
            <Text style={styles.addBtnText}>Add Agency</Text>
          </TouchableOpacity>
        </View>
         )
       }
      </ScrollView>
      {currentUser === 'admin' && (
        <TouchableOpacity style={styles.editBtn} onPress={updateEmergency}>
          <Image source={icon.EditIcon2} alt='icon' style={styles.editImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  newAgencyCard: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  number: {
    fontSize: 16,
    marginBottom: 5,
  },
  addNumber: {
    color: 'blue',
    marginBottom: 10,
  },
  editBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'whitesmoke',
    height: 60,
    width: 60,
    borderRadius: 40,
    padding: 15,
  },
  editImage: {
    width: 30,
    height: 30,
  },
  addBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  subBG: {
    position: 'absolute',
    width: '120%',
    height: '100%',
  },
});

export default EmergencyScreen;
