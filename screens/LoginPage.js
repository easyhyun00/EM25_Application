import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {

    const navigation = useNavigation();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential)=>{
            const user =  userCredential.user;
            console.log("성공");
            Alert.alert('로그인 성공', '식물 관리 시스템🪴을 이용해 주셔서 감사합니다.', [
                {text: 'OK', onPress: () => navigation.navigate("메인 홈")},
            ]);
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('code',errorCode);
            Alert.alert('로그인 실패', '이메일과 비밀번호를 다시 확인해주세요 🥲', [
                {text: 'OK', onPress: () => {setEmail(''),setPassword('')}},
            ]);
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>식물 관리 시스템 🪴</Text>
            <TextInput 
                style={styles.input}
                placeholder="이메일 ex) ???@em25.com"
                value={email}
                onChangeText={setEmail}
                //autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
            />          
            <Button 
                title="로그인"
                onPress={handleLogin}
                buttonStyle={{
                    backgroundColor: '#DBEA8D',
                    borderRadius: 6,
                }}
                containerStyle={{
                    width: '70%',
                    margin: 20,
                }}
                titleStyle={{ 
                    fontWeight: 'bold',
                    fontSize: 20,
                    color: 'black',
                }}
            />
            <Text style={{color: 'gray'}}>
                상품 고유의 이메일, 비밀번호를 입력하여 로그인하세요
            </Text>
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
    input: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 20,
        width: '70%',
      },
      button: {
        margin: 20,
        marginBottom: 60,
      },
      text: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'green',
        marginTop: -30,
      },
  });