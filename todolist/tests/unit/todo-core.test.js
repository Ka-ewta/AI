import { describe, expect, it } from "vitest";
import {
  addTodoToState,
  createInitialState,
  getActiveTodos,
  removeTodoFromState,
  setActiveTab,
  validateTodoInput,
} from "../../todo-core.js";

describe("todo-core", () => {
  it("validates required fields", () => {
    expect(validateTodoInput({ title: "", deadline: "2026-04-27" })).toBe("Task is required.");
    expect(validateTodoInput({ title: "Task", deadline: "" })).toBe("Deadline is required.");
    expect(validateTodoInput({ title: "Task", deadline: "2026-04-27" })).toBe("");
  });

  it("adds todo item to active tab", () => {
    const state = createInitialState();

    addTodoToState(state, {
      id: "todo-1",
      title: "  Write tests  ",
      deadline: "2026-04-30",
    });

    expect(getActiveTodos(state)).toHaveLength(1);
    expect(getActiveTodos(state)[0]).toEqual({
      id: "todo-1",
      title: "Write tests",
      deadline: "2026-04-30",
    });
  });

  it("switches tab and keeps data separated", () => {
    const state = createInitialState();
    addTodoToState(state, { id: "work-1", title: "Work task", deadline: "2026-05-01" });

    expect(setActiveTab(state, "private")).toBe(true);
    addTodoToState(state, { id: "private-1", title: "Private task", deadline: "2026-05-02" });

    expect(state.todosByTab.work).toHaveLength(1);
    expect(state.todosByTab.private).toHaveLength(1);
  });

  it("removes todo from active tab only", () => {
    const state = createInitialState();
    addTodoToState(state, { id: "work-1", title: "Work task", deadline: "2026-05-01" });
    setActiveTab(state, "private");
    addTodoToState(state, { id: "private-1", title: "Private task", deadline: "2026-05-02" });

    removeTodoFromState(state, "private-1");

    expect(state.todosByTab.private).toHaveLength(0);
    expect(state.todosByTab.work).toHaveLength(1);
  });
});
