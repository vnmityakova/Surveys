// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, Connector } from 'react-redux';
import type { Dispatch } from '../types/index';
import { createSurvey, getSurveyList } from '../actions/survey';
import Survey from '../components/Survey';

type OwnProps = {
  surveyList: [],
  history: Object,
  newSurveyId: string,
};

type DispatchProps = {
};

type Props = OwnProps & DispatchProps;

class SurveyList extends Component {
  props: Props;

  componentWillMount() {
    this.props.getSurveyList();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.newSurveyId.length) {
      this.props.history.push(`/surveys/edit/${nextProps.newSurveyId}`);
      // TODO можно ли сюда перенести clearNewSurveyId()?
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <button onClick={this.createSurveyHandler}>Создать опрос</button>
        </div>

        <div>
          Список опросов:
          <ul>
            {this.props.surveyList.map((item) => {
              return (<Survey
                item={item}
              />);
            })}
          </ul>
        </div>
      </div>
    );
  }

  createSurveyHandler = () => {
    this.props.createSurvey();
  }

}

const mapStateToProps = (state: State) => ({
  surveyList: state.layout.surveyList,
  newSurveyId: state.layout.newSurveyId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getSurveyList: () => dispatch(getSurveyList()),
  createSurvey: () => dispatch(createSurvey()),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(SurveyList));
