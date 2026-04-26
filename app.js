import {
  addTodoToState,
  createInitialState,
  getActiveTodos,
  removeTodoFromState,
  setActiveTab,
  validateTodoInput,
} from "./todo-core.js";

const state = createInitialState();

const dom = {
  form: document.querySelector("#todo-form"),
  titleInput: document.querySelector("#item-title"),
  deadlineInput: document.querySelector("#item-deadline"),
  error: document.querySelector("#form-error"),
  tabs: document.querySelectorAll(".tab"),
  listTitle: document.querySelector("#list-title"),
  itemCount: document.querySelector("#item-count"),
  list: document.querySelector("#todo-list"),
  template: document.querySelector("#todo-item-template"),
};

function generateId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatTabLabel(tab) {
  return tab.charAt(0).toUpperCase() + tab.slice(1);
}

function buildMeta(deadline) {
  return `Deadline: ${deadline}`;
}

function setError(message) {
  dom.error.textContent = message;
}

function clearError() {
  setError("");
}

function addTodo({ title, deadline }) {
  addTodoToState(state, {
    id: generateId(),
    title,
    deadline,
  });
}

function removeTodo(todoId) {
  removeTodoFromState(state, todoId);
}

function updateHeader() {
  const tabLabel = formatTabLabel(state.activeTab);
  const total = getActiveTodos(state).length;
  dom.listTitle.textContent = `${tabLabel} tasks`;
  dom.itemCount.textContent = `${total} item${total === 1 ? "" : "s"}`;
}

function renderList() {
  dom.list.innerHTML = "";
  const todos = getActiveTodos(state);
  if (todos.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "todo-list__empty";
    emptyItem.textContent = "No tasks yet. Add your first item.";
    dom.list.appendChild(emptyItem);
    return;
  }

  todos.forEach((todo) => {
    const itemNode = dom.template.content.firstElementChild.cloneNode(true);
    const titleEl = itemNode.querySelector(".todo-item__title");
    const metaEl = itemNode.querySelector(".todo-item__meta");
    const removeBtn = itemNode.querySelector(".todo-item__remove");

    titleEl.textContent = todo.title;
    metaEl.textContent = buildMeta(todo.deadline);
    removeBtn.dataset.todoId = todo.id;

    dom.list.appendChild(itemNode);
  });
}

function renderTabs() {
  dom.tabs.forEach((tabButton) => {
    const isActive = tabButton.dataset.tab === state.activeTab;
    tabButton.classList.toggle("tab--active", isActive);
  });
}

function render() {
  renderTabs();
  renderList();
  updateHeader();
}

function resetForm() {
  dom.form.reset();
  dom.titleInput.focus();
}

function onSubmit(event) {
  event.preventDefault();

  const payload = {
    title: dom.titleInput.value,
    deadline: dom.deadlineInput.value,
  };

  const validationError = validateTodoInput(payload);
  if (validationError) {
    setError(validationError);
    return;
  }

  clearError();
  addTodo(payload);
  render();
  resetForm();
}

function onTabClick(event) {
  const target = event.currentTarget;
  const nextTab = target.dataset.tab;
  if (!nextTab) {
    return;
  }

  const hasChanged = setActiveTab(state, nextTab);
  if (!hasChanged) {
    return;
  }

  clearError();
  render();
}

function onRemoveClick(event) {
  const removeButton = event.target.closest(".todo-item__remove");
  if (!removeButton) {
    return;
  }

  const { todoId } = removeButton.dataset;
  if (!todoId) {
    return;
  }

  removeTodo(todoId);
  render();
}

function bindEvents() {
  dom.form.addEventListener("submit", onSubmit);
  dom.list.addEventListener("click", onRemoveClick);
  dom.tabs.forEach((tabButton) => {
    tabButton.addEventListener("click", onTabClick);
  });
}

function init() {
  bindEvents();
  render();
}

init();
