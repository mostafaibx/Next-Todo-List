import React from "react";

const ListsContext = React.createContext({
  getLists: () => {},
  getSelectedList: () => {},
  getError: () => {},
  getSuccess: () => {},

  lists: [],
  listsTitle: [],
  selectedList: {},
  SelectedlistId: "",
  isError: false,
  error: "",
  successMsg: "",
});

export default ListsContext;
