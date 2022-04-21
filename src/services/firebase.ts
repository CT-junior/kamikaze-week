import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCn0wsixNrVfnUqdPrMH1vm94ujh_5EMvU",
    authDomain: "kamikaze-week.firebaseapp.com",
    projectId: "kamikaze-week",
    storageBucket: "kamikaze-week.appspot.com",
    messagingSenderId: "318778822340",
    appId: "1:318778822340:web:a6f1f7cc8fbbf35f510391"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function handleUploadImage(imageFile: File){
    const imageRef = ref(storage, imageFile.name + Math.random());

    const downloadUrl = uploadBytes(imageRef, imageFile).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    })

    return downloadUrl;
}