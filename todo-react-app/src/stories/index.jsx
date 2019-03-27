import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import AddBtn from '../components/AddBtn';
import TodoItem from '../components/Todo/TodoItem';

import '../index.css';

const item = { id: '1', description: 'test', isDone: true };

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Elements')} />);

storiesOf('Elements', module)
  .add('My Add Btn', () => <AddBtn onToggleSidebarClick={action('clicked')} />)
  .add('My Todo Item', () => <TodoItem item={item} />);
