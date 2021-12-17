import fire from '../../../configurations/firebase'
export const getProvinces = async () => {
    let provinces = []
    const querySnapshot = await fire.firestore().collection('provinces').get()
    querySnapshot.forEach(doc => { provinces.push({ id: doc.id, ...doc.data() }) })
    return provinces
}
export default getProvinces