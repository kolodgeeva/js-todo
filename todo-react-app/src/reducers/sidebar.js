const defaultSidebarState = {
  isSidebarVisible: false,
};

const sidebar = (state = defaultSidebarState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarVisible: !state.isSidebarVisible,
      };
    default:
      return state;
  }
};
export default sidebar;
