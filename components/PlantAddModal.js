import { React, useState, useEffect } from 'react'
import { Button } from '@rneui/base';
import { View, Text } from 'react-native';
import { FIREBASE_DB } from '../firebaseConfig';
import { doc, updateDoc, collection, getDocs, query } from 'firebase/firestore';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

// 식물 정보 등록하는 모달
export const PlantAddModal = (props) => {

    const modalVisible2 = props.modalVisible2
    const setModalVisible2 = props.setModalVisible2
    const setPlantInfo = props.setPlantInfo
    const userUid = props.userUid

    const [plantList, setPlantList] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

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
        const washingtonRef = doc(FIREBASE_DB, "Users", userUid);
        await updateDoc(washingtonRef, {
            plantRegistration: boolean,
            plantNo:no,
            plantName:name,
        });
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
                    onPress={() => {setModalVisible2(!modalVisible2), updateData(true,selectedItem.id,selectedItem.title)}} 
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