import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { background, icon } from '../../constants';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EnrollmentProcess = () => {
  const { currentUser } = useSelector(state => state.universal);
  const [editable, setEditable] = useState(currentUser === 'admin');
  const [enrollmentInfo, setEnrollmentInfo] = useState({});
  const [newSteps, setNewSteps] = useState([{ text: '', info: '', isReminder: false }]);

  useEffect(() => {
    axios.get('https://backendnorsumaps.onrender.com/getEnrollmentProcess')
      .then((res) => {
        setEnrollmentInfo(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (college, index, key, value) => {
    const updatedInfo = { ...enrollmentInfo };
    updatedInfo[college].steps[index][key] = value;
    setEnrollmentInfo(updatedInfo);
  };

  const handleNewStepChange = (index, key, value) => {
    const updatedNewSteps = [...newSteps];
    updatedNewSteps[index][key] = value;
    setNewSteps(updatedNewSteps);
  };

  const addNewStepField = () => {
    setNewSteps([...newSteps, { text: '', info: '', isReminder: false }]);
  };

  const addNewSteps = (college) => {
    const updatedInfo = { ...enrollmentInfo };
    newSteps.forEach(step => {
      updatedInfo[college].steps.push({ ...step });
    });
    setEnrollmentInfo(updatedInfo);
    setNewSteps([{ text: '', info: '', isReminder: false }]);
  };

  const saveChanges = () => {
    axios.put('https://backendnorsumaps.onrender.com/editEnrolmentProcess', {
      enrollmentData: enrollmentInfo
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setEditable(false);
  };

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, height: '100%' }}>
      <Image source={background.SubBG} alt='alt' style={styles.subBG} />
      <ScrollView>
        <View style={styles.emergencyCard}>
          {Object.keys(enrollmentInfo).length > 0 ? (
            Object.keys(enrollmentInfo).map((college,index) => (
              <View key={college}>
                <Text style={styles.heading}>{enrollmentInfo[college].heading}</Text>
                {enrollmentInfo[college].steps ?
                  enrollmentInfo[college].steps.map((step, index) => (
                    <View key={index} style={{ marginBottom: 5 }}>
                      {editable ? (
                        <>
                          {step.info && (
                            <TextInput
                              style={styles.infoInput}
                              value={step.info}
                              onChangeText={(value) => handleInputChange(college, index, 'info', value)}
                            />
                          )}
                          <TextInput
                            style={step.isReminder ? styles.reminderInput : styles.stepInput}
                            value={step.text}
                            onChangeText={(value) => handleInputChange(college, index, 'text', value)}
                          />
                        </>
                      ) : (
                        <>
                          {step.info && <Text style={styles.info}>{step.info}</Text>}
                          <Text style={step.isReminder ? styles.reminder : styles.step}>{step.text}</Text>
                        </>
                      )}
                    </View>
                  ))
                  : null
                }
                {index > 0 && currentUser === 'admin' ?(
            
                  <View style={styles.newStepContainer}>
                    {newSteps.map((step, index) => (
                      <View key={index}>
                        <TextInput
                          style={styles.newStepInput}
                          placeholder="New Step Info"
                          value={step.info}
                          onChangeText={(value) => handleNewStepChange(index, 'info', value)}
                        />
                        <TextInput
                          style={styles.newStepInput}
                          placeholder="New Step Text"
                          value={step.text}
                          onChangeText={(value) => handleNewStepChange(index, 'text', value)}
                        />
                      </View>
                    ))}
                    <TouchableOpacity style={styles.addStepFieldBtn} onPress={addNewStepField}>
                      <Text style={styles.addStepText}>Add Another Step</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addStepBtn} onPress={() => addNewSteps(college)}>
                      <Text style={styles.addStepText}>Add Steps</Text>
                    </TouchableOpacity>
                  </View>
                ) : ''}
              </View>
            ))
          ) : null}
        </View>
      </ScrollView>
      {currentUser === 'admin' && (
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditable(!editable)}>
          <Image source={icon.EditIcon2} alt='icon' style={styles.editImage} />
        </TouchableOpacity>
      )}
      {editable && (
        <TouchableOpacity style={styles.saveBtn} onPress={saveChanges}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  number: {
    fontSize: 14,
    marginBottom: 5,
  },
  subBG: {
    width: '110%',
    height: '100%',
    position: 'absolute',
  },
  emergencyCard: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'blue',
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  step: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 15,
  },
  reminder: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  infoInput: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  stepInput: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 15,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  reminderInput: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  newStepContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  newStepInput: {
    fontSize: 14,
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  addStepFieldBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addStepBtn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addStepText: {
    color: 'white',
    textAlign: 'center',
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
  saveBtn: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EnrollmentProcess;
