// @flow
import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import type { SurveyParamsType } from '../../types/layout';
import { PASS_SURVEY } from '../../constants/routes';

type Props = {
  surveyParams: SurveyParamsType,
  surveyId: string,
  changeSurveyTitle: Function,
  setQuestionsPerPage: Function,
};

type OwnState = {
  questionsPerPage: string,
  surveyName: string,
};

class SurveyParamsBlock extends Component {
  props: Props;
  state: OwnState = {
    surveyName: 'Опрос без названия',
    questionsPerPage: '1',
  };

  render() {
    const { surveyName, questionsPerPage } = this.state;
    const { surveyParams } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="surveyName col">
            <input
              type="text"
              name="surveyName"
              placeholder="Название опроса"
              value={surveyParams.title || surveyName}
              onChange={this.handleNameChange}
              className="hoverInput"
            />
          </div>
          <Link to={`${PASS_SURVEY}/${this.props.surveyId}`} className="previewLink" target="_blank">
            Просмотреть
          </Link>
        </div>

        <div className="row">
          <label htmlFor="pageQuestionsNumber" className="col">Вопросов на странице:</label>
          <Select
            name="questions-number"
            value={surveyParams.questionsPerPage || questionsPerPage}
            className="questionsNumber col"
            onChange={this.handlePageQuestionsNumberSelect}
            clearable={false}
            searchable={false}
            options={[
              { value: '1', label: '1' },
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: 'all', label: 'все' },
            ]}
          />
        </div>
      </Fragment>
    );
  }

  handleNameChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    this.props.changeSurveyTitle(this.props.surveyId, value);
  };

  handlePageQuestionsNumberSelect = (valueObj) => {
    this.setState({
      pageQuestionsNumber: valueObj.value,
    });
    this.props.setQuestionsPerPage(valueObj.value, this.props.surveyId);
  };

}

export default SurveyParamsBlock;
