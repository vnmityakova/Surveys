// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import { connect, Connector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Checkbox from 'react-toolbox/lib/checkbox';
import QuestionViewerCommon from './QuestionViewerCommon';
import { changeQuestion, removeQuestion } from '../../actions/survey';
import type { Dispatch } from '../../types';
import type { QuestionType } from '../../types/layout';


type OwnProps = {
  item: QuestionType,
  match: Object,
};

type DispatchProps = {
  onRemoveQuestion: Function,
  onChangeQuestion: Function,
};

type Props = OwnProps & DispatchProps;

class QuestionViewBlock extends Component {
  props: Props;

  render() {
    const { item } = this.props;

    return (
      <QuestionViewerCommon
        item={item}
        removeQuestion={this.handleRemove}
        surveyId={this.props.match.params.id}
        setIsEdit={this.handleEdit}
      >
        {this.getQuestionViewerChild()}
      </QuestionViewerCommon>
    );
  }

  handleRemove = () => {
    const questionId = this.props.item.id;
    this.props.onRemoveQuestion(questionId, this.props.match.params.id);
  };

  handleEdit = () => {
    this.props.onChangeQuestion(this.props.item.id, this.props.item);
  };

  getQuestionViewerChild = () => {
    const { item } = this.props;
    let questionViewerChild = null;

    if (item.questionType === 'text') {
      questionViewerChild = <p><input type="text" disabled /></p>;
    } else if (item.questionType === 'radio') {
      const radioList = item.answers.map(answer => (
        <RadioButton label={answer.value} value={answer.value} disabled />
      ));
      questionViewerChild = (
        <RadioGroup name="comic">
          {radioList}
        </RadioGroup>
      );
    } else if (item.questionType === 'checkbox') {
      questionViewerChild = item.answers.map(answer => (
        <Checkbox label={answer.value} disabled />
      ));
    } else if (item.questionType === 'dropbox') {
      const items = item.answers.map(answer => ({
        value: answer.value,
        label: answer.value,
      }));
      questionViewerChild = (<Select
        name="form-field-name"
        value={''}
        className="questionTypesSelect top10"
        // onChange={this.handleQuestionTypeSelect}
        placeholder="Выберите тип ответа"
        clearable={false}
        searchable={false}
        options={items}
      />);
    } else if (item.questionType === 'date') {
      questionViewerChild = (<DatePicker
        dateFormat="DD.MM.YYYY"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        disabled
        placeholderText="Выберите дату"
      />);
    }

    return questionViewerChild;
  }

}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onRemoveQuestion: (questionId, surveyId) => dispatch(removeQuestion(questionId, surveyId)),
  onChangeQuestion: (questionId, questionObj) => dispatch(changeQuestion(questionId, questionObj)),
});

const connector: Connector<{}, DispatchProps> = connect(null, mapDispatchToProps);

export default withRouter(connector(QuestionViewBlock));
