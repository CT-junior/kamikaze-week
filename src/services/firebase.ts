import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig =  typeof window !== 'undefined' ? {
    apiKey: "AIzaSyAvdsMWjL7-8g9V9X1utZy-nB-2qj0BOgo",
    authDomain: "kamikaze-week-a9429.firebaseapp.com",
    projectId: "kamikaze-week-a9429",
    storageBucket: "kamikaze-week-a9429.appspot.com",
    messagingSenderId: "1017277912357",
    appId: "1:1017277912357:web:45a1b5106f471f36ebb6cc",
} : {
    apiKey: "AIzaSyAvdsMWjL7-8g9V9X1utZy-nB-2qj0BOgo",
    authDomain: "kamikaze-week-a9429.firebaseapp.com",
    projectId: "kamikaze-week-a9429",
    storageBucket: "kamikaze-week-a9429.appspot.com",
    messagingSenderId: "1017277912357",
    appId: "1:1017277912357:web:45a1b5106f471f36ebb6cc",
    measurementId: "G-X97SKPQK2X"
};

export const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export const db = getFirestore(app)

export async function handleUploadImage(imageFile: File) {
    if (!imageFile) {
        return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
    }
    
    const imageRef = ref(storage, imageFile.name + Math.random());

    const downloadUrl = uploadBytes(imageRef, imageFile).then(async (snapshot) => {
        const downloadUrl = await getDownloadURL(snapshot.ref);

        return downloadUrl;
    })

    return downloadUrl;
}

export async function getCongressists() {
    const dbInstance = collection(db, 'congressistas');
    let congressistas = [];

    await getDocs(dbInstance)
        .then((data) => {
            data.docs.map((item) => {
                congressistas.push({ ...item.data(), id: item.id });
            });
        })

    return congressistas;
}

export async function addCongressist(congressist){
    const dbInstance = collection(db, 'congressistas');
    await setDoc(doc(dbInstance, congressist.clientId), congressist);
}