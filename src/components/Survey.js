// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import {
  EDIT_SURVEY,
} from '../constants/routes';

type Props = {
  item: Object,
};

const Survey = (props: Props) => {
  const item = props.item;

  return (
    <li key={item.id}>
      <p>
        <Link to={`${EDIT_SURVEY}/${item.id}`}>
          {item.title}
        </Link>
      </p>
    </li>
  );
};

export default Survey;
