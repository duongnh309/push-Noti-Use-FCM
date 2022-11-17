import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfigNoti } from "./constants";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfigNoti);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging: firebase.messaging.Messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BKmQwpcsabFYXHKmuWFMCm3m_8JipeCZqWfuTtj63UGrv4yDOnFaH3Yn3HdFJBka0dOQJT1PKuLkeSySWsET-vg",
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
