import data from './product'
export async function seed(collection: string){
    const url = `https://restapi.fr/api/${collection}`
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}