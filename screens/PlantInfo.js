import { React, useState } from 'react'
import { Button, SearchBar } from '@rneui/base';
import { View, Text, StyleSheet, Image, Modal } from 'react-native'

/*
    식물 정보를 등록했으면 plantInfo 1, 등록 안했으면 0
    plantInfo가 1, 0인지에 따라 정보 보여주기

    온도습도광 정보는 센서로 측정해서 DB로 값 보내서, DB에서 가져온 값
*/

export default function PlantInfo() {

    const [ plantInfo, setPlantInfo] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const ModalInfo = (
        <View>
            <Button
                title="닫기"
                onPress={() => {plantInfo == 0 ? setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}
                buttonStyle={{
                    backgroundColor: '#DBEA8D',
                }}
                titleStyle={{ 
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                }}
                containerStyle={{
                    marginBottom: 10,
                }}
            >
            </Button>
            {plantInfo == 0 ? <PlantAddModal /> : <PlantInfoModal />}
            {plantInfo == 1 ? null : (
                <View style={{alignItems: 'center'}}>
                    <Button 
                        title="등록하기"
                        onPress={() => {setModalVisible2(!modalVisible2), setPlantInfo(1)}}
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
                </View>) }
        </View> 
    )

    return (
        <View style={styles.container}>
            <View>
                { plantInfo == 0 ? 
                <View style={styles.container1}>
                    <Text style={styles.question}>?</Text>
                </View> : 
                <Image 
                    source={{uri: "https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"}} 
                    style={{width: 230, height: 210, marginBottom: 35, marginTop: -20, borderColor: '#BDDC1C', borderWidth: 5}} >                    
                </Image> }
            </View>
            <View>
                <Text style={styles.plantName}>
                    {plantInfo == 0 ? "식물 정보가 없습니다." : "🌿 대만 고무 나무 🌿"}
                </Text>
            </View>
            <View>
                <Text style={styles.plantStatus}>🌡️ 온도 : ??? ℃</Text>
                <Text style={styles.plantStatus}>💧 습도 : ??? %</Text>
                <Text style={styles.plantStatus}>☀️ 광 : ??? LUX</Text>
            </View>
            <View>
                <Button 
                    title={plantInfo == 0 ? "식물 정보 등록하기" : "식물 정보 더 보기"}
                    onPress={() => {plantInfo == 0 ? setModalVisible2(true) : setModalVisible(true)}}
                    titleStyle={{ 
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: 'black',
                    }}
                    buttonStyle={{
                        backgroundColor: 'white',
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
            <Modal
                    animationType="slide"
                    presentationStyle={"formSheet"}
                    transparent={false}
                    visible={plantInfo == 0 ? modalVisible2 : modalVisible}
                    onRequestClose={() => {plantInfo == 0 ? setModalVisible2(!modalVisible2) : setModalVisible(!modalVisible)}}> 
                    <View>
                        {ModalInfo}
                    </View>
            </Modal>
        </View>
    )
}

const PlantInfoModal = () => {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 50}}>여기에 식물 정보</Text>
        </View>
    )
}

const PlantAddModal = () => {

    return (
        <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginVertical: 50}}>나의 식물 정보 등록하기</Text>
            <Text style={{fontSize: 18, fontWeight: '500', marginBottom: 20}}>여기에 검색창 만들어서 식물 등록하게 할 거임</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    plantName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    plantStatus: {
        fontSize: 28,
        fontWeight: 500,
        marginBottom: 30,
    },
    container1: {
        width: 230, 
        height: 210, 
        marginBottom: 35, 
        marginTop: -20,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
      },
      question: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#000000',
      },
});