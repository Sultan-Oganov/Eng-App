import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthScenes from './authscenes';
import WorkScenes from './workscenes';

// import { clearAll } from "./AsyncStorage/AsyncStorage";
// clearAll()

const Home = ({ isAuth }) => {

  return (
    isAuth 
      ? <WorkScenes />
      : <AuthScenes />
  );
}

Home.propTypes = {
  isAuth: PropTypes.bool
};

Home.defaultProps = {
  isAuth: false
};

const mapStateToProps = ({ users }) => ({
  isAuth: users.isAuth
});

export default connect(mapStateToProps)(Home);
