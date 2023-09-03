import ListsContext from "./ListsContext";
import { useState, useReducer } from "react";

const intialState = {
  listsTitle: [],
  lists: [],
  selectedList: {},
  SelectedlistId: "",
  isError: false,
  error: "",
  successMsg: "",
};

function listsReducer(state, action) {
  //Logic to handle the dispatched actions
  if (action.type === "GET_LISTS") {
    const listsTitlesArray = [];
    const listsArray = [];

    // Use map to iterate through lists and items
    action.lists.forEach((list) => {
      listsTitlesArray.push(list.title);
    });

    action.lists.forEach((list) => {
      listsArray.push(list);
    });

    return {
      listsTitle: listsTitlesArray,
      lists: listsArray,
    };
  }

  if (action.type === "SELECTED_LIST") {
    const selectedList = state.lists.find((list) => list.id === action.id);

    return {
      selectedList: selectedList,
      listsTitle: state.listsTitle,
      lists: state.lists,
      SelectedlistId: action.id,
    };
  }
  if (action.type === "ERROR") {
    const error = action.error;
    let isError;
    if (error) {
      isError = true;
    } else {
      isError = false;
    }
    return {
      isError: isError,
      error: error,
      listsTitle: state.listsTitle,
      lists: state.lists,
      SelectedlistId: action.id,
    };
  }

  if (action.type === "SUCCESS") {
    const successMsg = action.msg;
    return {
      successMsg: successMsg,
      listsTitle: state.listsTitle,
      lists: state.lists,
      SelectedlistId: action.id,
    };
  }
}

function ListsProvider(props) {
  const [listState, dispatchLists] = useReducer(listsReducer, intialState);

  //dispatch functions here
  function getLists(lists) {
    dispatchLists({ type: "GET_LISTS", lists });
  }

  function getSelectedList(id) {
    dispatchLists({ type: "SELECTED_LIST", id });
  }

  function getError(error) {
    dispatchLists({ type: "ERROR", error });
  }
  function getSuccess(msg) {
    dispatchLists({ type: "SUCCESS", msg });
  }

  const listsContext = {
    //will add the stats & functions here
    getLists: getLists,
    getSelectedList: getSelectedList,
    getError: getError,
    getSuccess: getSuccess,

    lists: listState.lists,
    listsTitle: listState.listsTitle,
    selectedList: listState.selectedList,
    SelectedlistId: listState.SelectedlistId,
    isError: listState.isError,
    error: listState.error,
  };

  return (
    <ListsContext.Provider value={listsContext}>
      {props.children}
    </ListsContext.Provider>
  );
}
export default ListsProvider;
