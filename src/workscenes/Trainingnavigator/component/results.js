import { trainingPlane, getDate } from '../../../constants';
import { putLogs } from '../../../actions/apiActions';

const calcResults = async (user, vocabulary, learnVocabulary, vocabularyRoutine, learnRoutine) => {
  const findWord = (enId, ruId) => {
    for (let i = 0; i < vocabulary.length; i++) {
      if (vocabulary[i].id === enId && vocabulary[i].wordRus[0].id === ruId) {
        return i;
      }
    }
    return -1;
  }

  const getNewPlane = (logg, real) => {
    if (logg.plane) {
      let minutes = (real.getTime() - logg.plane.getTime()) / 60000;
      let line = logg.state;
      minutes = minutes - trainingPlane[line].interval;
      if (minutes <= 0) {
        return Math.min(trainingPlane.length - 1, line + 1);
      }
      do {
        if (line < trainingPlane.length - 1 && minutes >= trainingPlane[line + 1].interval) {
          line++;
          minutes = minutes - trainingPlane[line].interval;
          if (line == 16 || trainingPlane[line].zone != logg.wordzone) {
            return Math.min(trainingPlane.length - 1, line);
          }
        } else {
          break;
        }
      } while (true);
      return Math.min(trainingPlane.length - 1, line);
    }
    return 1;
  }

  let count = 0;
  let experience = 0;
  let exppirOne = 0;
  let line = 0;
  const logs = [];
  const dats = getDate(); // new Date();
  learnVocabulary.forEach(item => {
    if (Boolean(item.time)) {
      const wordIndex = findWord(item.id, item.wordRus[0].id);
      if (wordIndex >= 0) {
        exppirOne = 0;
        const oldLine = item.wordRus[0].loggs[0].state;
        if (item.errors === 0) {
          count++;
          line = getNewPlane(item.wordRus[0].loggs[0], item.time);
          for (let i = item.wordRus[0].loggs[0].state + 1; i <= line; i++) {
            exppirOne = exppirOne + trainingPlane[i].experience;
          }
          experience = experience + exppirOne;
        } else {
          const log = item.wordRus[0].loggs[0];
          switch (log.wordzone) {
            case 3:
              line = log.state - 2;
              break;
            case 2:
              line = Math.max(6, log.state - 3);
              break;
            case 1:
              line = 1;
              break;
            default:
              line = 0;
          }
        }
        let newPlane = getDate(); // new Date();
        newPlane.setMinutes(newPlane.getMinutes() + trainingPlane[line].interval);
        let index = item.wordRus[0].loggs[0].index;
        index = (index) ? index + 1 : 1;
        for (let i = 0; i < item.falseAttempts; i++) {
          const newLogg = {
            mode: true,
            answer: false,
            plane: newPlane,
            state: oldLine,
            wordstate: trainingPlane[oldLine].status,
            wordzone: trainingPlane[oldLine].zone,
            timing: item.timing,
            experience: 0,
            wordEnId: item.id,
            wordRuId: item.wordRus[0].id,
            index,
            createdAt: dats
          };
          index ++;
          vocabulary[wordIndex].wordRus[0].loggs.splice(0, 0, newLogg);
          logs.push(newLogg);
        }
        const newLogg = {
          mode: true,
          answer: (item.errors === 0),
          plane: newPlane,
          state: line,
          wordstate: trainingPlane[line].status,
          wordzone: trainingPlane[line].zone,
          timing: item.timing,
          experience: exppirOne,
          userId: user.id,
          wordEnId: item.id,
          wordRuId: item.wordRus[0].id,
          index,
          createdAt: dats
        };
        vocabulary[wordIndex].wordRus[0].loggs.splice(0, 0, newLogg);
        item.wordRus[0].loggs.splice(0, 0, newLogg);
        logs.push(newLogg);
      }
    }
  })

  // procView(vocabulary);

  vocabularyRoutine({ vocabulary });
  learnRoutine({ learnVocabulary, learnState: false });
  putLogs(logs);
  return { count, experience }
}

export default calcResults;
