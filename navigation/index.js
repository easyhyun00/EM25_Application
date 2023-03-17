import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import Home from '../screens/Home'
import PlantInfo from '../screens/PlantInfo'
import PlantLive from "../screens/PlantLive";
import PlantTimeLine from "../screens/PlantTimeLine";
import PlantSeach from "../screens/PlantSearch";
import Developer from "../screens/Developer";

const Stack = createNativeStackNavigator()

const Navigation = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
                <Stack.Screen name="메인 홈" component={Home}></Stack.Screen>
                <Stack.Screen name="식물 정보 보기" component={PlantInfo}></Stack.Screen>
                <Stack.Screen name="식물 실시간 보기" component={PlantLive}></Stack.Screen>
                <Stack.Screen name="식물 타임라인 보기" component={PlantTimeLine}></Stack.Screen>
                <Stack.Screen name="다른 식물 알아 보기" component={PlantSeach}></Stack.Screen>
                <Stack.Screen name="팀원 정보 보기" component={Developer}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation