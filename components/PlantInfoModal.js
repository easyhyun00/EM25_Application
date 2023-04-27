import { React } from 'react'
import { View, Text, Image,ScrollView  } from 'react-native';

// 식물 정보 보여주는 모달
export const PlantInfoModal = (props) => {

    const plantModal = props.plantModal
    console.log(plantModal)

    return (
        <View style={{alignItems: 'center'}}>
            {/* <ScrollView contentContainerStyle={{ alignItems: 'center' }}> */}
                <Image 
                    source={{uri: plantModal.plantImg}} 
                    style={{width: 180, height: 150, marginBottom: 18, marginTop: 18, borderColor: '#BDDC1C', borderWidth: 5}} >                    
                </Image> 
                <Text style={{fontSize: 38, fontWeight: 'bold',marginBottom:10}}> 🪴 {plantModal.plantName} 🪴</Text>
                <Text style={{fontSize: 22, fontWeight: 'bold',marginVertical: 10, alignSelf: 'flex-start',marginLeft: 30}}> 🔎 기본 정보</Text>
                <Text style={{ fontSize: 18,marginHorizontal: 35,lineHeight: 30 }}>{plantModal.plantInfo ? plantModal.plantInfo : null }</Text>
                <Text style={{fontSize: 22, fontWeight: 'bold',marginVertical: 10, alignSelf: 'flex-start',marginLeft: 30}}> 🔎 생육 환경</Text>
                <View style={{ flexDirection: 'row',marginHorizontal: 35,lineHeight: 30, alignSelf: 'flex-start',marginBottom: 10}}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold' }}>온도   </Text>
                    <Text style={{ fontSize: 18 }}>{plantModal.plantTemperatureLow} ~ {plantModal.plantTemperatureHigh}℃</Text>
                </View>
                <View style={{ flexDirection: 'row',marginHorizontal: 35,lineHeight: 30, alignSelf: 'flex-start',marginBottom: 10}}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold' }}>습도   </Text>
                    <Text style={{ fontSize: 18 }}>{plantModal.plantHumidity}</Text>
                </View>
                <View style={{ flexDirection: 'row',marginHorizontal: 35,lineHeight: 30, alignSelf: 'flex-start',marginBottom: 10}}>
                    <Text style={{ fontSize: 18,fontWeight: 'bold' }}>광도   </Text>
                    <Text style={{ fontSize: 18 }}>
                        {plantModal.plantLight == 1 ? "높은 광도 (1,500~10,000 Lux)" :
                        plantModal.plantLight == 2 ? "중간, 높은 광도 (800~10,000 Lux)" : 
                        "낮은, 중간, 높은 광도 (300~10,000 Lux)" }
                    </Text>
                </View>
            {/* </ScrollView> */}
        </View>
    )
}