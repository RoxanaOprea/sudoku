import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Header from '../src/components/Header';
import Sudoku from '../src/components/Sudoku';
import Buttons from '../src/components/Buttons';
import Grid from '../src/components/Grid';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders', () => {
  const table = document.createElement('div');
  ReactDOM.render(<Sudoku/>, table);
  ReactDOM.unmountComponentAtNode(table);
});

it('renders', () => {
  const buttons = document.createElement('div');
  ReactDOM.render(<Buttons/>, buttons);
  ReactDOM.unmountComponentAtNode(buttons);
});

it('renders', () => {
  const ul = document.createElement('ul');
  ReactDOM.render(<Grid/>, ul);
  ReactDOM.unmountComponentAtNode(ul);
})