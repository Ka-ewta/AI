/**
 * Simple in-memory todo app state (no DB).
 * Each tab owns its own list for clarity and maintainability.
 */
const state = {
  activeTab: "work",
  todosByTab: {
    work: [],
    private: [],
  },
};

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

function getActiveTodos() {
  return state.todosByTab[state.activeTab];
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

function validateForm({ title, deadline }) {
  if (!title.trim()) {
    return "Task is required.";
  }
  if (!deadline) {
    return "Deadline is required.";
  }
  return "";
}

function addTodo({ title, deadline }) {
  const nextItem = {
    id: generateId(),
    title: title.trim(),
    deadline,
  };
  getActiveTodos().push(nextItem);
}

function removeTodo(todoId) {
  const items = getActiveTodos();
  const nextItems = items.filter((todo) => todo.id !== todoId);
  state.todosByTab[state.activeTab] = nextItems;
}

function updateHeader() {
  const tabLabel = formatTabLabel(state.activeTab);
  const total = getActiveTodos().length;
  dom.listTitle.textContent = `${tabLabel} tasks`;
  dom.itemCount.textContent = `${total} item${total === 1 ? "" : "s"}`;
}

function renderList() {
  dom.list.innerHTML = "";
  const todos = getActiveTodos();
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

  const validationError = validateForm(payload);
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
  if (!nextTab || nextTab === state.activeTab) {
    return;
  }

  state.activeTab = nextTab;
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
