import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import TestPanel from './testPanel';
import { wordsToLearn } from '../../constants';
import { countRoutine, logsRoutine, wordsRoutine } from '../../store/wordsReducer';
import { getDate } from '../../constants';

let step = 10;
let koe = 20;
let direction = true;

const Dobor = ({ words, logs, learnCount, point, countRoutine, logsRoutine, doborFinish }) => {
  const [array] = useState(words);
  const [current, setCurrent] = useState(point);
  const [totalCount] = useState(wordsToLearn - learnCount + 1);
  const [word, setCurrentWord] = useState(array[current]);
  const [waitCount, setLearnCount] = useState(wordsToLearn - learnCount);

  const doAnswer = async (otvet) => {
    const dats = getDate(); //  new Date();
    logs.push({ wordEnId: word.wordEn.id, wordRuId: word.id, answer: otvet, state: 0, mode: false, index: 0, createdAt: dats });
    array.splice(current, 1);
    let point;
    let count = waitCount;
    if (direction) {
      if (otvet) {
        point = current + step;
        step = koe;
        koe = koe * 2;
      } else {
        point = current - 1;
        step = 10;
        koe = 20;
        direction = false;
        count = waitCount - 1;
        setLearnCount(waitCount - 1);
      }
    } else {
      if (otvet) {
        point = current + 1;
        step = 10;
        koe = 20;
        direction = true;
      } else {
        point = current - step;
        step = koe;
        koe = koe * 2;
        count = waitCount - 1;
        setLearnCount(waitCount - 1);
      }      
    }
    point = Math.max(0, Math.min(point, array.length - 1));
    if (count <= 0) {
      wordsRoutine({ words: array, point: current });
      logsRoutine({ logs });
      countRoutine({ learnCount: wordsToLearn });
      doborFinish();
    } else {
      setCurrent(point);
      setCurrentWord(array[point]);
    }
  }

  return (
    <TestPanel word={word} doAnswer={doAnswer} totalCount={totalCount} />
  );

}

Dobor.propTypes = {
  words: PropTypes.arrayOf(PropTypes.object),
  logs: PropTypes.arrayOf(PropTypes.object),
  learnCount: PropTypes.number,
  point: PropTypes.number
};

Dobor.defaultProps = {
  words: [],
  logs: [],
  learnCount: 0,
  point: 0
};

const mapStateToProps = ({ words }) => ({
  words: words.words,
  logs: words.logs,
  learnCount: words.learnCount,
  point: words.point
});

const mapDispatchToProps = { countRoutine, logsRoutine };
export default connect(mapStateToProps, mapDispatchToProps)(Dobor);
