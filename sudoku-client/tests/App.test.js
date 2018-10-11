import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import Header from '../src/components/Header';
import SudokuTable from '../src/components/SudokuTable';

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
  ReactDOM.render(<SudokuTable/>, table);
  ReactDOM.unmountComponentAtNode(table);
})