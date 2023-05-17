import { useState, useEffect, useRef } from 'react';
import Navigation from "./navigation";

import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {

  useEffect(() => {
    console.log("======>")
    // 푸시 알림 채널 설정
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // 오전 7시 00분에 푸시 알림 스케줄링
    const trigger = {
      hour: 14,
      minute: 0,
      repeats: true,
    };

    Notifications.scheduleNotificationAsync({
      content: {
        title: '식물 관리 시스템 🪴',
        body: '지난주와 달라진 식물을 확인하세요:)',
      },
      trigger,
    });

    // 알림 핸들러 설정
    Notifications.setNotificationHandler({
      handleNotification: async () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (일요일) through 6 (토요일)
        if (dayOfWeek === 2) { // 금요일
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        } else {
          return {
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
        }
      },
    });

  }, []);

  return (
    <Navigation />
  );
}
