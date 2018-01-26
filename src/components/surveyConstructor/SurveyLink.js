// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import {
  EDIT_SURVEY,
  PASS_SURVEY,
} from '../../constants/routes';
import type { QuestionType } from '../../types/layout';

type Props = {
  item: QuestionType,
};

const SurveyLink = (props: Props) => {
  const item = props.item;

  return (
    <li key={item.id}>
      <p>
        <Link to={`${EDIT_SURVEY}/${item.id}`}>
          {item.title}
        </Link>{' '}
        <Link to={`${PASS_SURVEY}/${item.id}`}>
          (Пройти)
        </Link>
      </p>
    </li>
  );
};

export default SurveyLink;
