import { React, useState, useEffect } from 'react'
import { Button } from '@rneui/base';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB } from '../firebaseConfig';
import { doc, updateDoc, collection, getDocs, query, getDoc } from 'firebase/firestore';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

// 식물 정보 등록하는 모달
export const PlantAddModal = (props) => {

    const navigation = useNavigation();

    const modalVisible2 = props.modalVisible2
    const setModalVisible2 = props.setModalVisible2
    const setPlantInfo = props.setPlantInfo
    const userUid = props.userUid
    const setPlantName = props.setPlantName

    const setPlantModal = props.setPlantModal
    const setHumidityInfo = props.setHumidityInfo
    const setTemperHighInfo = props.setTemperHighInfo
    const setTemperLowInfo = props.setTemperLowInfo
    const setLightInfo = props.setLightInfo

    const [plantList, setPlantList] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    const [input, setInput] = useState(true)

    useEffect(() => {
        getPlant();
    }, []);

    const getPlant = async () => {
        console.log("userEffect")

        const usersCollectionRef = collection(FIREBASE_DB, "Plants");

        const qry = await query(usersCollectionRef);
        const data = await getDocs(qry);
        const newData = data.docs.map(doc => ({
            ...doc.data()
        }))
        plantListinfo = []
        for (let i = 0; i < newData.length; i++) {
            plantListinfo.push({id: newData[i].plantNo, title: newData[i].plantName})
        }
        setPlantList(plantListinfo)
    }

    const updateData = async (boolean,no,name) => {
        console.log("updateDate")
        setPlantInfo(boolean);
        setPlantName(name);
        const washingtonRef = doc(FIREBASE_DB, "Users", userUid);
        await updateDoc(washingtonRef, {
            plantRegistration: boolean,
            plantNo:no,
            plantName:name,
        });
        getPlantInfo(no)
    }

     // 해당 번호에 대한 식물 정보 가져오기
     const getPlantInfo = async (plantNo) => {
        const docRef = doc(FIREBASE_DB, "Plants", plantNo)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setPlantModal(docSnap.data());
            setHumidityInfo(docSnap.data().plantHumidity)
            setTemperHighInfo(docSnap.data().plantTemperatureHigh)
            setTemperLowInfo(docSnap.data().plantTemperatureLow)
            const lightinfo = docSnap.data().plantLight
            if (lightinfo == 1) {
                setLightInfo(1500)
            } else if (lightinfo == 2) {
                setLightInfo(800)
            } else {
                setLightInfo(300)
            }
        }
    }


    function handlePress() {
        if (selectedItem === null) {
          Alert.alert('식물 정보를 입력해주세요');
        } else {
            // 정보 등록

            setModalVisible2(!modalVisible2);
            updateData(true,selectedItem.id,selectedItem.title);

            Alert.alert('정보가 등록되었습니다.');
        }
    }

    return (
        <View style={{marginHorizontal: 30}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 50, alignItems: 'center',marginBottom: 30}}>나의 식물 정보 등록하기</Text>
            <Text style={{marginBottom: 10}}>등록할 식물을 선택하세요.</Text>
            <AutocompleteDropdown
                onSelectItem={setSelectedItem}
                closeOnSubmit={false}
                dataSet={plantList}
            />
            {/* <Button title="button" onPress={() => console.log(selectedItem)}/> */}
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Button 
                    title="등록하기"
                    //onPress={() => {setModalVisible2(!modalVisible2), updateData(true,selectedItem.id,selectedItem.title)}} 
                    onPress={handlePress}
                    titleStyle={{ 
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'black',
                    }}
                    buttonStyle={{
                        backgroundColor: '#DBEA8D',
                        borderColor: 'transparent',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 170,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                />
            </View>
        </View>
    )
}