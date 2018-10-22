// @flow
import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { withRouter } from 'react-router-dom';
import { connect, Connector } from 'react-redux';
import type { Dispatch } from '../types/index';
import { createSurvey, getSurveyList, removeSurvey } from '../actions/survey';
import SurveyLink from '../components/surveyConstructor/SurveyLink';

type OwnProps = {
  surveyList: [],
  history: Object,
  newSurveyId: string,
};

type DispatchProps = {
  getSurveyList: Function,
  createSurvey: Function,
  removeSurvey: Function,
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
      <div className="surveysContainer">
        <div>
          <Button
            label="Создать опрос"
            raised
            primary
            onClick={this.createSurveyHandler}
          />
        </div>

        <div className="surveyList">
          <h3>Опросы</h3>
          <ul className="surveyItems">
            {this.props.surveyList.map((item) => {
              return (<SurveyLink
                item={item}
                removeSurvey={this.props.removeSurvey}
              />);
            })}
          </ul>
        </div>
      </div>
    );
  }

  createSurveyHandler = () => this.props.createSurvey();
}

const mapStateToProps = (state: State) => ({
  surveyList: state.layout.surveyList,
  newSurveyId: state.layout.newSurveyId,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  getSurveyList: () => dispatch(getSurveyList()),
  createSurvey: () => dispatch(createSurvey()),
  removeSurvey: id => dispatch(removeSurvey(id)),
});

const connector: Connector<{}, Props> = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(SurveyList));
