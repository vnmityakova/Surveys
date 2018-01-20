// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Checkbox from 'react-toolbox/lib/checkbox';
import QuestionEditBlock from './QuestionEditBlock';
import QuestionViewerCommon from './QuestionViewerCommon';

type Props = {
  item: Object,
  index: number,
  surveyId: string,
  isEditing: boolean,
  removeQuestion: Function,
  changeQuestion: Function,
};


class Question extends Component {
  props: Props;

  render() {
    const { item } = this.props;

    if (this.props.isEditing) {
      return (
        <QuestionEditBlock />
      );
    }

    return (
      <QuestionViewerCommon // TODO сделать контейнером, тогда QuestionsList мб компонентом
        item={item}
        removeQuestion={this.handleRemove}
        surveyId={this.props.surveyId}
        setIsEdit={this.handleEdit}
        index={this.props.index}
      >
        {this.getQuestionViewerChild()}
      </QuestionViewerCommon>
    );
  }

  handleRemove = () => {
    const questionId = this.props.item.id;
    this.props.removeQuestion(questionId, this.props.surveyId);
  };

  handleEdit = () => {
    this.props.changeQuestion(this.props.item.id, this.props.item);
  };

  /* handleSaveQuestion = (question: Object) => {
    this.setState({
      isEditing: false,
    });
    // this.props.saveQuestion(question, this.props.surveyId);
  }; */

  getQuestionViewerChild = () => {
    const { item } = this.props;
    let questionViewerChild = null;

    if (item.questionType === 'text') {
      questionViewerChild = <p><input type="text" disabled /></p>;
    } else if (item.questionType === 'radio') {
      const radioList = item.answer.map(answer => (
        <RadioButton label={answer.value} value={answer.value} disabled />
        ));
      questionViewerChild = (
        <RadioGroup name="comic">
          {radioList}
        </RadioGroup>
      );
    } else if (item.questionType === 'checkbox') {
      questionViewerChild = item.answer.map(answer => (
        <Checkbox label={answer.value} disabled />
        ));
    } else if (item.questionType === 'dropbox') {
      const items = item.answer.map(answer => ({
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

export default Question;
