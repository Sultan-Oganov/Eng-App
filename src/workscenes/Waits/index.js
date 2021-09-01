import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Spinner from '../../Spinner';
// import { getVocabulary, setVocabulary } from '../../AsyncStorage/AsyncStorage';
import { getWordsVocabulary, getWordsList } from '../../actions/apiActions';
import { wordsRoutine } from '../../store/wordsReducer';

const Wait = ({ navigation, wordsRoutine }) => {

  const testWords = async () => {
    let words = await getWordsList();
    let point = Math.round(words.length /  2);
    wordsRoutine({ words, point });
    words = await getWordsVocabulary();  //  await getVocabulary() || await getVocabulary();
    if (words && words.length > 0) {
      navigation.push('Dashboard');
      return;
    }
    navigation.push('Start');
  }

  useEffect(() => {
    testWords();
  })

  return (
    <View style={styles.container}>
      <Spinner />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex'
  }
});

const mapDispatchToProps = { wordsRoutine };
export default connect(null, mapDispatchToProps)(Wait);
