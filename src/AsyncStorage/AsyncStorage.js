import AsyncStorage from '@react-native-async-storage/async-storage'

export const setData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('token', jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        return JSON.parse(token)
    } catch (e) {

    }
}

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }
}

export const removeValue = async () => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (e) {
        // remove error
    }
}

let arrWords = []

export const addLearnWords = async (word) => {
    try {
        arrWords.push(word)
        let jsonWord = JSON.stringify(arrWords);
        await AsyncStorage.setItem("Learn", jsonWord);
    } catch {

    }
};

export const getLearnWords = async () => {
    try {
        const word = await AsyncStorage.getItem("Learn");
        return JSON.parse(word);
    } catch {

    }
}

export const getVocabulary = async () => {
    try {
        const words = await AsyncStorage.getItem("Vocabulary");
        return JSON.parse(words);
    } catch {
        return null;
    }
}

export const setVocabulary = async (words) => {
    try {
        const jsonWords = JSON.stringify(words);
        await AsyncStorage.setItem("Vocabulary");
    } catch {

    }
}
export const setWordCountAsync = async (count) => {
    try {
        const jsonWords = JSON.stringify(count);
        await AsyncStorage.setItem("WordCount", jsonWords);
    } catch {

    }
}

export const getWordCountAsync = async () => {
    try {
        const count = await AsyncStorage.getItem("WordCount");
        return count;
    } catch {
        return null;
    }
}
export const removeWordCountAsync = async () => {
    try {
        await AsyncStorage.removeItem('WordCount')
    } catch (e) {
        // remove error
    }

}


export const setCurrentDay = async () => {
    try {
        let d = new Date().getDate();
        const jsonWords = JSON.stringify(d);
        await AsyncStorage.setItem("CurrentDay", jsonWords);
    } catch (e) {

    }
}

export const deleteDay = async () => {
    try {
        await AsyncStorage.removeItem('CurrentDay')
    } catch (e) {
        // remove error
    }
}
