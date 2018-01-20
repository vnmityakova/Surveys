// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import { Button } from 'react-toolbox/lib/button';

type Props = {
  surveyParams: Object,
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
      <div>
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
          <Button label="Просмотреть" raised className="col" />
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
      </div>
    );
  }

  handleNameChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.changeSurveyTitle(this.props.surveyId, e.target.value);
  };

  handlePageQuestionsNumberSelect = (valueObj) => {
    this.setState({
      pageQuestionsNumber: valueObj.value,
    });
    this.props.setQuestionsPerPage(valueObj.value, this.props.surveyId);
  };

}

export default SurveyParamsBlock;