// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import { throttle } from 'lodash';
import { connect, Connector } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import QuestionEditConstructor from './QuestionEditConstructor';
import type { Dispatch, State } from '../../types';
import { cancelEdit, changeQuestion, saveQuestion } from '../../actions/survey';
import type { QuestionType } from '../../types/layout';

type DispatchProps = {
  editingQuestion: QuestionType,
  onChangeQuestion: Function,
  saveQuestion: Function,
  cancelEdit: Function,
};

class QuestionEditBlock extends Component {
  props: DispatchProps;

  render() {
    const { question, index, questionType, answers, id } = this.props.editingQuestion;
    const options = [
      { value: 'text', label: 'текст' },
      { value: 'radio', label: 'радиобатоны' },
      { value: 'checkbox', label: 'чекбоксы' },
      { value: 'date', label: 'дата' },
      { value: 'dropbox', label: 'выпадающий список' },
    ];
    return (
      <section className="editItem question top10">
        <h3>{index}.</h3>
        <textarea
          name="question"
          placeholder="Введите вопрос"
          onChange={throttle(this.handleChange, 150)}
          value={question}
          className="questionText"
        /><br />
        <Select
          name="selectedQuestionType"
          value={questionType}
          className="questionTypesSelect top10"
          onChange={this.handleQuestionTypeSelect}
          placeholder="Выберите тип ответа"
          clearable={false}
          searchable={false}
          options={options}
        />
        <QuestionEditConstructor
          selectedQuestionType={questionType}
          answers={answers}
          id={id}
          key={id}
        />
        <Button className="top10" label="Сохранить вопрос" raised onClick={this.handleSaveQuestion} />
        <Button className="top10" label="Отменить" raised onClick={this.handleCancelEdit} />
      </section>
    );
  }

  handleChange = (e) => {
    this.props.onChangeQuestion(this.props.editingQuestion.id, { // TODO раз 1 за раз редактируется, то и props не нужен
      question: e.target.value,
    });
  };

  handleQuestionTypeSelect = (valueObj) => {
    this.props.onChangeQuestion(this.props.editingQuestion.id, {
      questionType: valueObj.value,
    });
  };

  handleCancelEdit = () => {
    this.props.cancelEdit();
  };

  handleSaveQuestion = () => {
    this.props.saveQuestion();
  };

}

const mapStateToProps = (state: State) => {
  return {
    editingQuestion: state.layout.editingQuestion,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeQuestion: (questionId, questionObj) => dispatch(changeQuestion(questionId, questionObj)),
  saveQuestion: () => dispatch(saveQuestion()),
  cancelEdit: () => dispatch(cancelEdit()),
});

const connector: Connector<State, DispatchProps> = connect(mapStateToProps, mapDispatchToProps);

export default connector(QuestionEditBlock);
