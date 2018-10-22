// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import {
  EDIT_SURVEY,
  PASS_SURVEY,
} from '../../constants/routes';
import type { QuestionType } from '../../types/layout';

type Props = {
  item: QuestionType,
  removeSurvey: Function,
};

const SurveyLink = (props: Props) => {
  const { item } = props;

  const removeSurvey = () => {
    props.removeSurvey(item.id);
  };

  return (
    <li key={item.id} className="surveyItem">
      <Link to={`${EDIT_SURVEY}/${item.id}`} className="titleBlock">
        {item.title}
      </Link>

      <span className="buttonBlock left10">
        <IconMenu icon="more_vert" position="topLeft" menuRipple>
          <Link to={`${PASS_SURVEY}/${item.id}`} target="_blank">
            <MenuItem value="view" icon="pageview">Проcмотреть</MenuItem>
          </Link>
          <MenuItem value="delete" icon="delete" caption="Удалить" onClick={removeSurvey} />
        </IconMenu>
      </span>
    </li>
  );
};

export default SurveyLink;
