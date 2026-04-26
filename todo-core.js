export const DEFAULT_TAB = "work";
export const ALLOWED_TABS = ["work", "private"];

export function createInitialState() {
  return {
    activeTab: DEFAULT_TAB,
    todosByTab: {
      work: [],
      private: [],
    },
  };
}

export function validateTodoInput({ title, deadline }) {
  if (!title || !title.trim()) {
    return "Task is required.";
  }
  if (!deadline) {
    return "Deadline is required.";
  }
  return "";
}

export function addTodoToState(state, { id, title, deadline }) {
  const nextItem = {
    id,
    title: title.trim(),
    deadline,
  };

  state.todosByTab[state.activeTab].push(nextItem);
  return nextItem;
}

export function removeTodoFromState(state, todoId) {
  const currentList = state.todosByTab[state.activeTab];
  state.todosByTab[state.activeTab] = currentList.filter((todo) => todo.id !== todoId);
}

export function setActiveTab(state, nextTab) {
  if (!ALLOWED_TABS.includes(nextTab)) {
    return false;
  }
  if (state.activeTab === nextTab) {
    return false;
  }
  state.activeTab = nextTab;
  return true;
}

export function getActiveTodos(state) {
  return state.todosByTab[state.activeTab];
}
