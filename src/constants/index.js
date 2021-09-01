
export const wordsToLearn = 10;
export const wordsLimit = 30;
export const waitDuration = 10;
export const errorsLimit = 3;
export const defIntensity = 55;
export const defLevel = 100;

export const trainingPlane = [
  { state: 0, zone: 0, status: '', interval: 10, experience: 0 },
  { state: 1, zone: 1, status: 'Бронзовый', interval: 20, experience: 1 },
  { state: 2, zone: 1, status: 'Бронзовый', interval: 30, experience: 2 },
  { state: 3, zone: 1, status: 'Бронзовый', interval: 40, experience: 3 },
  { state: 4, zone: 1, status: 'Бронзовый', interval: 50, experience: 4 },
  { state: 5, zone: 1, status: 'Бронзовый', interval: 60, experience: 5 },
  { state: 6, zone: 2, status: 'Серебряный', interval: 120, experience: 10 },
  { state: 7, zone: 2, status: 'Серебряный', interval: 240, experience: 15 },
  { state: 8, zone: 2, status: 'Серебряный', interval: 360, experience: 20 },
  { state: 9, zone: 2, status: 'Серебряный', interval: 480, experience: 25 },
  { state: 10, zone: 2, status: 'Серебряный', interval: 600, experience: 30 },
  { state: 11, zone: 3, status: 'Золотой', interval: 1200, experience: 50 },
  { state: 12, zone: 3, status: 'Золотой', interval: 1200, experience: 60 },
  { state: 13, zone: 3, status: 'Золотой', interval: 1200, experience: 70 },
  { state: 14, zone: 3, status: 'Золотой', interval: 2400, experience: 80 },
  { state: 15, zone: 3, status: 'Золотой', interval: 2400, experience: 90 },
  { state: 16, zone: 3, status: 'Золотой', interval: 100000000, experience: 100 }
]

// const date = new Date();
// const minutes = 1200;
// date.setMinutes(date.getMinutes() + minutes);
// date.getTime() - dtt.getTime();
// date.getMinutes() - dtt.getMinutes();

let currentDate;
const startDate = new Date();

export const getDate = () => {
  if (currentDate) {
    const date = (new Date(currentDate)).getTime() + (new Date()).getTime() - (new Date(startDate)).getTime();
    return new Date(date);
  };
  return new Date()
}

export const setDate = value => {
  currentDate = new Date(value);
}
