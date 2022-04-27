import axios from 'axios'

const api = axios.create({
    baseURL: process.env.APIURL
})

export async function addApiCongressist(congressist) {
    try {
        console.log(congressist);
        api.post('/congressista', JSON.stringify(congressist), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.log(error);
    }

}