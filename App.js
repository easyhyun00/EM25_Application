import { useEffect } from 'react';
import Navigation from "./navigation";

import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { FIREBASE_DB } from './firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

export default function App() {

  //// 알림 권한 설정
  // useEffect(() => {
  //   Notifications.getPermissionsAsync()
  //     .then((status) => {
  //       if (status.status !== 'granted') {
  //         return Notifications.requestPermissionsAsync();
  //       }
  //     })
  //     .then((status) => {
  //       if (status.status !== 'granted') {
  //         alert('No notification permissions!');
  //         return;
  //       }
  //     });
  // }, []);

  useEffect(() => {

    // 푸시 알림 채널 설정
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // 물을 5번 줬을 때, 급수통 채워달라고 푸시 알림
    onSnapshot(doc(FIREBASE_DB, "farminformation", "push"), (doc) => {
      const water = doc.data().water
      if (water === 5) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: '식물 관리 시스템 🪴',
            body: '💧 급수통의 물을 채워주세요!',
          },
          trigger: null,
        });
      }
    });

    // 시든 잎 감지 되었을 때, 푸시 알림
    onSnapshot(doc(FIREBASE_DB, "farminformation", "leaf"), (doc) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: '식물 관리 시스템 🪴',
          body: '📸 시든 잎이 감지되었습니다!',
        },
        trigger: null,
      });
    });

    // 알림 핸들러 설정
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        };
      },
    });

  },[]);

  return (
    <Navigation />
  );
}