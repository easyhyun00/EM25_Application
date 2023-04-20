import { React } from 'react'
import { View, Text, Image,ScrollView  } from 'react-native';

// 식물 정보 보여주는 모달
export const PlantInfoModal = (props) => {

    const plantModal = props.plantModal
    console.log(plantModal)

    return (
        <View style={{alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Image 
                    source={{uri: plantModal.plantImg}} 
                    style={{width: 190, height: 170, marginBottom: 20, marginTop: 30, borderColor: '#BDDC1C', borderWidth: 5}} >                    
                </Image> 
                <Text style={{fontSize: 40, fontWeight: 'bold'}}> 🪴 {plantModal.plantName} 🪴</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold',marginVertical: 10, alignSelf: 'flex-start',marginLeft: 30}}> 🔎 기본 정보</Text>
                <Text style={{ fontSize: 18,marginHorizontal: 35,lineHeight: 30 }}>{plantModal.plantInfo}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold',marginVertical: 10, alignSelf: 'flex-start',marginLeft: 30}}> 🔎 생육 환경</Text>
                
            </ScrollView>
        </View>
    )
}