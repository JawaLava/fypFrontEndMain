import TextRecognition from '@react-native-ml-kit/text-recognition';
import { Alert } from 'react-native';


export const LaunchCameraGallery = async (media, setLoading) => {

    let array = []

    try {

        if (!media.didCancel) {

            const result = await TextRecognition.recognize(media?.assets[0]?.uri);

            for (let block of result.blocks) {

                for (let line of block.lines) {
                    array.push(line.text)
                }

            }

            let printArray = array.map((i) => i + "\n")

            Alert.alert('Recognized Text', printArray.toString(), [{ text: 'Upload', onPress: () => { uploadText(array, setLoading) }, style: 'cancel' }, { text: 'Cancel', onPress: () => { } },], { cancelable: true });

        }

    } catch (error) {
        console.log(error, "error");
    }

};


const uploadText = async (array, setLoading) => {

    try {

        if (array.length > 0) {

            setLoading(true)

            postData("http://192.168.10.12:5000/api/medicine/addMedicine", { medicines: array })
                .then((resp) => {

                    if (resp?.error == false) {
                        Alert.alert("Progress", "Data Saved Succesfully")
                    }
                })
                .catch((err) => {
                    console.log(err, "error");
                })

            setLoading(false)

        } else {
            Alert.alert("Error", "No Scanned Data")
        }

    } catch (error) {
        console.log(error, "error");
    }

}

async function postData(url = '', data = {}) {

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json()

    } catch (error) {
        console.log(error, "error");
        return false
    }
}