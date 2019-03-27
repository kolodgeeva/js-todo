import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import AddBtn from '../components/AddBtn';

import { toggleSidebar } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { onLoadTodos } = this.props;
    onLoadTodos();
  }

  render() {
    const {
      onAddTodo,
      sidebar,
      todos,
      onSaveTodo,
      onDeleteTodo,
      onToggleSidebarClick,
    } = this.props;
    return (
      <div>
        <Sidebar
          onAddTodo={onAddTodo}
          isSidebarVisible={sidebar.isSidebarVisible}
          onToggleSidebarClick={onToggleSidebarClick}
        />
        <div className="wrapper" id="content">
          <Header />
          <Main
            todos={todos}
            onSaveTodo={onSaveTodo}
            onDeleteTodo={onDeleteTodo}
          />
          <AddBtn onToggleSidebarClick={onToggleSidebarClick} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onLoadTodos: PropTypes.func.isRequired,
  onAddTodo: PropTypes.func.isRequired,
  onSaveTodo: PropTypes.func.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleSidebarClick: PropTypes.func.isRequired,
  sidebar: PropTypes.shape({ isSidebarVisible: PropTypes.bool }).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      isDone: PropTypes.bool,
    })),
  })),
};

App.defaultProps = {
  todos: [],
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleSidebarClick: () => dispatch(toggleSidebar),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
