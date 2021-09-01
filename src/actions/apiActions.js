import { getToken, setVocabulary } from '../AsyncStorage/AsyncStorage';

const url = 'https://dict-server.herokuapp.com';
// const url = 'http://192.168.8.104:3001';

// const controller = new AbortController();

const getApiData = async (endPoint, method, data, interval) => {
  const token = await getToken();
  const controller = new AbortController();
  const id = interval ? setTimeout(() => controller.abort(), 10000) : null;
  const request = await fetch(`${url}${endPoint}`,
    {
      method: method,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        authorization: token
      },
      body: data ? JSON.stringify(data) : null
    }
  );
  if (id) clearTimeout(id);
  return await request.json();
}

export const login = async (data) => {
  return await getApiData('/api/users/login', 'POST', data)
}

export const register = async (data) => {
  return await getApiData('/api/users/register', 'POST', data);
}

export const writeUser = async (data) => {
  return await getApiData('/api/users', 'PUT', data);
}

export const emailReset = async (data) => {
  return await getApiData('/api/users/emailreset', 'POST', data)
}

export const putData = async (data) => {
  return await getApiData('/api/users', 'PUT', data);
}

export const putLogs = async (data) => {
  return await getApiData('/api/logs', 'PUT', data);
}

export const emptyLogs = async (wordId) => {
  return await getApiData(`/api/logs/wordlogs/${wordId}`, 'GET');
}

export const getUser = async () => {
  do {
    try {
      return await getApiData('/api/users/user', 'GET', null, 10000);
    } catch (e) {};
  } while (true);
}

export const getWordsVocabulary = async () => {
  const result = await getApiData('/api/data/vocabulary', 'GET');
  await setVocabulary(result);
  return result;
}

export const getWordsList = async () => {
  return await getApiData('/api/data/commonlist', 'GET');
}

export const getStatistic = async () => {
  return await getApiData('/api/statistic', 'GET')
}

export const getDataStatistic = async () => {
  const resp = await getApiData('/api/data/statistic', 'GET')
  return resp
}

export const getWordsStatistic = async () => {
  const resp = await getApiData('/api/data/statcount', 'GET');
  return resp
}

export const getDictionary = async (data) => {
  const resp = await getApiData('/api/words/complex', "POST", data);
  return resp
}

export const getDictionaryAll = async (data) => {
  const resp = await getApiData('/api/words/complex/all', "POST", data);
  return resp
}
