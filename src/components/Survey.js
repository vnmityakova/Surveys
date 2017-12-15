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
      <h3>
        <Link to={`${EDIT_SURVEY}/${item.id}`}>
          {item.id}
        </Link>
        {item.id} {item.title}
      </h3>
    </li>
  );
};

export default Survey;
