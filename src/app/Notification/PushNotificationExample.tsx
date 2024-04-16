// import { Text, View, Button, Platform } from 'react-native';
// import { useState, useEffect } from "react";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function PushNotificationExample() {
//   const [expoPushToken, setExpoPushToken] = useState("");

//   useEffect(() => {
//     console.log("Registering for push notifications...");
//     registerForPushNotificationsAsync()
//       .then((token) => {
//         console.log("Expo push token:", token);
//         setExpoPushToken(token);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   console.log("expoPushToken",expoPushToken)

//   async function registerForPushNotificationsAsync() {
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("default", {
//         name: "default",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//       });
//     }
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       throw new Error("Failed to get push token for push notification!");
//     }
//     const token = (await Notifications.getExpoPushTokenAsync()).data;

//     return token;
//   }

//   const sendNotification = async () => {
//     console.log("Sending push notification...");

//     // notification message
//     const message = {
//       to: expoPushToken,
//       sound: "default",
//       title: "My first push notification!",
//       body: "This is my first push notification made with expo rn app",
//     };

//     await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         host: "exp.host",
//         accept: "application/json",
//         "accept-encoding": "gzip, deflate",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(message),
//     });
//   };

//   // async function sendNotification(task: string) {
//   //   console.log("Sending push notification...");

//   //   const message = {
//   //     to: expoPushToken,
//   //     sound: "default",
//   //     title: "Task Assigned",
//   //     body: `You have been assigned: ${task}`,
//   //   };

//   //   await fetch("https://exp.host/--/api/v2/push/send", {
//   //     method: "POST",
//   //     headers: {
//   //       host: "exp.host",
//   //       accept: "application/json",
//   //       "accept-encoding": "gzip, deflate",
//   //       "content-type": "application/json",
//   //     },
//   //     body: JSON.stringify(message),
//   //   });
//   // }

//   // const assignStaticTaskAndSendNotification = async () => {
//   //   console.log("Assigning a static task and sending notification...");
//   //   const tasks = ["Task 1", "Task 2", "Task 3"];
//   //   const randomIndex = Math.floor(Math.random() * tasks.length);
//   //   const task = tasks[randomIndex];
//   //   console.log("Assigned task:", task);
//   //   sendNotification(task);
//   // };

//   return (
//     <View style={{ marginTop: 100, alignItems: "center" }}>
//       <Text style={{ marginVertical: 30 }}>Expo RN Push Notifications</Text>
//       <Button title="Assign Task and Send Notification" onPress={sendNotification} />
//     </View>
//   );
// }

import { Button, Text, View,Platform } from "react-native";
import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function PushNotificationExample() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token);
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "72cf5962-6f32-45da-85b6-70d20a8202ed",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }



  const sendNotification = async () => {
    console.log("Sending push notification...");

    

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <View style={{ marginTop: 100, alignItems: "center" }}>
      <Text style={{ marginVertical: 30 }}>Notification Sent</Text>
      <Button title="Send push notification" onPress={sendNotification} />
    </View>
  );
}