import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/kamikaze-week-a9429/databases/(default)/documents/'
})