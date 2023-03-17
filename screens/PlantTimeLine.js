import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function PlantTimeLine(){

    const [timeAlign, setTimeAlign] = useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={timeAlign == true ? styles.textOn : styles.textOff} onPress={()=>setTimeAlign(true)}>최신 순으로</Text>
                <Text>{"    "}</Text>
                <Text style={timeAlign == true ? styles.textOff : styles.textOn} onPress={()=>setTimeAlign(false)}>오래된 순으로</Text>
            </View>
            <View style={styles.container3}>
                {data.length <= 6 ? data.map(renderItem):
                data.map(d =>{
                    if (d.key <= 6) {
                        return renderItem(d);
                    }
                })}
            </View>
            <View style={styles.container4}>
                <Text style={{fontSize: 30}}>여기에 페이징 버튼</Text>
            </View>
        </View>
    )
}

const data = [
    {key:"1",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
    {key:"2",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
    {key:"3",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
    {key:"4",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
    {key:"5",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
    {key:"6",url:"https://www.nongsaro.go.kr/cms_contents/301/13333_MF_REPR_ATTACH_01.jpg"},
]


const renderItem=(item) => {
    // const navigation = useNavigation();
    return(
        <Image key={item.key} source={{uri: item.url}} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // 비율
      backgroundColor: '#EDEFE3',
      paddingHorizontal: 40,
      justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    container3: {
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    container4: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    textOn: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textOff: {
        fontSize: 20,
        color: 'gray',
    },
    image: {
        width: '42%',
        aspectRatio: 1,
        marginBottom: 30,
        borderColor: '#BDDC1C', 
        borderWidth: 5
    }
});