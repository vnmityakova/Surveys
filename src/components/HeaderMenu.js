// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_PATH, SURVEY_LIST } from '../constants/routes';

const HeaderMenu = () => (<div className="headerMenu">
  <span className="item"><Link to={`${ABOUT_PATH}`}>About</Link></span>
  <span className="item"><Link to={`${SURVEY_LIST}`}>Survey List</Link></span>
</div>);

export default HeaderMenu;
