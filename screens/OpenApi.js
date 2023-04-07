import React from 'react';
import { parseString } from 'react-native-xml2js';
import { FIREBASE_DB } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { View, Button } from 'react-native';

// OpenAPI 요청을 보낼 URL
const openAPIUrl = 'http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=20230307TZHBL77P7AHNDPB2Q&numOfRows=217';
const openAPIUrl2 = 'http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=20230307TZHBL77P7AHNDPB2Q&cntntsNo=';

const addDB = async (no,name,imageUrl,info,temperHigh,temperLow,humidity,light,plantWater) => { // 데이터 쓰기
    const data = {
        plantNo: no,
        plantName: name,
        plantImg: imageUrl,
        plantInfo: info,
        plantTemperatureHigh: temperHigh,
        plantTemperatureLow: temperLow,
        plantHumidity: humidity,
        plantLight: light,
        plantWater: plantWater,
    }
    await setDoc(doc(FIREBASE_DB,'Plants',no),data);
};

const parseXMLAndSaveToFirestore = async () => {
    response = await fetch(openAPIUrl);
	t_xml = await response.text(); // 텍스트 형태로 가져오고

    parseString(t_xml, async function (err, result) {
        for (let index = 0; index < 217; index++) { // 217개 까지 있음
            const no = result.response.body[0].items[0].item[index].cntntsNo[0];
            const name = result.response.body[0].items[0].item[index].cntntsSj[0];
            const image = result.response.body[0].items[0].item[index].rtnStreFileNm[0];
            const imageIndex = image.indexOf('|');
            const imageResult = imageIndex !== -1 ? image.substring(0,imageIndex) : image
            const imageUrl = 'https://www.nongsaro.go.kr/cms_contents/301/'+imageResult
            
            detail = await fetch(openAPIUrl2+no);
            d_xml = await detail.text();

            parseString(d_xml,function(err,result) { // 우선 식물 설명, 온도, 습도, 광 출력함
                const info = result.response.body[0].item[0].fncltyInfo[0];
                const temperature = result.response.body[0].item[0].grwhTpCodeNm[0];
                const humidity = result.response.body[0].item[0].hdCodeNm[0];
                var light = result.response.body[0].item[0].lighttdemanddoCodeNm[0];

                const leaf = result.response.body[0].item[0].lefcolrCodeNm[0]

                if (leaf.includes("금색, 노란색") || leaf.includes("빨강, 분홍, 자주색") || leaf.includes("여러색 혼합") || leaf.includes("기타")) {
                    // 잎색이 금노빨분자혼기 62개
                } else { // 나머지 155개
                    const flower = result.response.body[0].item[0].flclrCodeNm[0]
                    if(flower === "") {
                        // 광도값 조정
                        if (light === "높은 광도(1,500~10,000 Lux)") {
                            light = "1"
                        } 
                        else if(light === "중간 광도(800~1,500 Lux),높은 광도(1,500~10,000 Lux)") {
                            light = "2"
                        } 
                        else {
                            light = "3"
                        }

                        //온도값 최대최소
                        if (temperature.includes("~")) {
                            const pattern = /(\d+)~(\d+)/;
                            const matches = temperature.match(pattern);
                            const temperLow = matches[1]
                            const temperHigh = matches[2]

                            var plantWater = result.response.body[0].item[0].watercycleSummerCodeNm[0]
                            if (plantWater == "") {

                            } else {
                                if (plantWater === "항상 흙을 축축하게 유지함(물에 잠김)"){
                                    plantWater = "1"
                                }
                                else if (plantWater === "흙을 촉촉하게 유지함(물에 잠기지 않도록 주의)"){
                                    plantWater = "2"
                                }
                                else if (plantWater === "토양 표면이 말랐을때 충분히 관수함" ){
                                    plantWater = "3"
                                }
                                else if (plantWater === "화분 흙 대부분 말랐을때 충분히 관수함") {
                                    plantWater = "4"
                                }
                                console.log(no,"  ",plantWater)
                                addDB(no,name,imageUrl,info,temperHigh,temperLow,humidity,light,plantWater); // 꽃이 없고, 잎색이 위에 있는 색이 없을 경우 96개
                            }
    
                        }
                    }
                }
            });
        }
    });
}

export default function OpenApi(){

    return (
        <View>
            <Button 
                title="Open API"
                onPress={()=>parseXMLAndSaveToFirestore()}>
            </Button>
        </View>
    )
}