import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAvdsMWjL7-8g9V9X1utZy-nB-2qj0BOgo",
    authDomain: "kamikaze-week-a9429.firebaseapp.com",
    projectId: "kamikaze-week-a9429",
    storageBucket: "kamikaze-week-a9429.appspot.com",
    messagingSenderId: "1017277912357",
    appId: "1:1017277912357:web:255d9886dd6c96f1ebb6cc",
    measurementId: "G-3Q7YN3EX6Q"
};

export const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export const db  = getFirestore(app)

export async function handleUploadImage(imageFile: File){
    const imageRef = ref(storage, imageFile.name + Math.random());

    const downloadUrl = uploadBytes(imageRef, imageFile).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    })

    return downloadUrl;
}

