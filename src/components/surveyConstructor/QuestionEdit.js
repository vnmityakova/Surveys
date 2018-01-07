// @flow
import React, { Component } from 'react';
import Select from 'react-select';
import QuestionConstructor from './QuestionConstructor';

type Props = {
  addQuestionAnswerItem: Function,
};

type OwnState = {
  selectedQuestionType: string,
  question: string,
};

class QuestionEdit extends Component {
  props: Props;
  state: OwnState = {
    selectedQuestionType: undefined,
    question: '',
  };

  render() {
    return (
      <section className="addItem top10">
        <textarea
          name="question"
          placeholder="Введите вопрос"
          onChange={this.handleChange}
          value={this.state.question}
          className="questionText"
        /><br />
        <Select
          name="selectedQuestionType"
          value={this.state.selectedQuestionType}
          className="questionTypesSelect top10"
          onChange={this.handleQuestionTypeSelect}
          placeholder="Выберите тип ответа"
          clearable={false}
          searchable={false}
          options={[
            { value: 'text', label: 'текст' },
            { value: 'radio', label: 'радиобатоны' },
            { value: 'checkbox', label: 'чекбоксы' },
            { value: 'date', label: 'дата' },
            { value: 'dropbox', label: 'выпадающий список' },
          ]}
        />
        <QuestionConstructor
          selectedQuestionType={this.state.selectedQuestionType}
          addQuestionAnswerItem={this.handleAddQuestion}
        />
      </section>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleQuestionTypeSelect = (valueObj) => {
    this.setState({
      selectedQuestionType: valueObj.value,
    });
  };

  handleAddQuestion = (item) => {
    const questionAnswerItem = {
      ...item,
      question: this.state.question,
    };
    this.setState({
      question: '',
      questionType: 'text',
    });
    this.props.addQuestionAnswerItem(questionAnswerItem);
  }

}

export default QuestionEdit;
