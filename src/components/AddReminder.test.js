import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';

import AddReminder from './AddReminder';
import rootReducer from '../reducers';

const middlewares = [thunk];

const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

describe('Add Remider - Modal', () => {
  let store;
  let component;

  beforeEach(() => {
    store = storeFactory({});
    component = render(
      <Provider store={store}>
        <AddReminder />
      </Provider>
    );
  });

  test('renders without crashing', () => {
    expect(component).toBeDefined();
  });

  test('should validate if field title is empty', () => {
    const { container, getByText } = component;

    const button = container.querySelector('.add-reminder-button');

    fireEvent.click(button);

    const titleError = getByText('Please input your reminder name.');

    expect(titleError).toBeDefined();
  });

  test('should not show error message if reminder title has valid value', () => {
    const { container } = component;

    const button = container.querySelector('.add-reminder-button');
    const reminderTitle = container.querySelector(
      '#create_reminder_reminderTitle'
    );

    fireEvent.change(reminderTitle, { target: { value: 'my new reminder' } });
    fireEvent.click(button);

    // expect(queryByTestId('Please input your reminder name.')).toBeNull();
  });

  test('should allow only 30 chars if value if greater than 30', () => {
    const { container, getByText } = component;

    const reminderTitle = container.querySelector(
      '#create_reminder_reminderTitle'
    );

    fireEvent.change(reminderTitle, {
      target: {
        value: 'super large text with more than 30 chars'
      }
    });

    const titleError = getByText('Only 30 characters are allowed.');

    expect(titleError).toBeDefined();
  });
});
