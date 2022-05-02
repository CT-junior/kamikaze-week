import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig =  typeof window !== 'undefined' ? {
    apiKey: "AIzaSyAvpF88GU-QlHVOOlg0V4IWPRUX-dtuQxs",
    authDomain: "kamikaze-week-71e6b.firebaseapp.com",
    projectId: "kamikaze-week-71e6b",
    storageBucket: "kamikaze-week-71e6b.appspot.com",
    messagingSenderId: "542458291260",
    appId: "1:542458291260:web:1117cd0b332951c93fcf39"
} : {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
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

export async function addFirebaseCongressist(congressist){
    const dbInstance = collection(db, 'congressistas');
    await setDoc(doc(dbInstance, congressist.clientId), congressist);
}

export async function getCongressistByEmail(email: string){
    const dbInstance = collection(db, 'congressistas');
    const found = query(dbInstance, where("email", "==", email));

    const result = await getDocs(found);

    return(result.docs[0].data());
}

export async function addSpectator(congressistId: string, workshopId: string){
    const congressistRef = doc(db, 'congressistas', congressistId);
    const congressist = await getDoc(congressistRef);
    const data = congressist.data();

    const dbInstance = collection(db, 'palestras', workshopId, 'espectadores');
    await setDoc(doc(dbInstance, data.clientId), data);
}