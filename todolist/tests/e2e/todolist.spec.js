import { test } from "@playwright/test";
import { TodoPage } from "./pages/todo-page.js";

test("add and remove todo in work tab", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  const title = "Finish report e2e";
  await todoPage.switchTab("Work");
  await todoPage.addTodo({
    title,
    deadline: "2026-04-30",
    type: "work",
  });

  await todoPage.expectTodoVisible(title);

  await todoPage.removeTodoByTitle(title);
  await todoPage.expectTodoHidden(title);
});

test("work and private tabs keep independent todos", async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.open();

  const workTitle = "Work kickoff e2e";
  const privateTitle = "Buy groceries e2e";

  await todoPage.switchTab("Work");
  await todoPage.addTodo({
    title: workTitle,
    deadline: "2026-05-01",
    type: "work",
  });
  await todoPage.expectTodoVisible(workTitle);

  await todoPage.switchTab("Private");
  await todoPage.expectTodoHidden(workTitle);
  await todoPage.addTodo({
    title: privateTitle,
    deadline: "2026-05-02",
    type: "private",
  });
  await todoPage.expectTodoVisible(privateTitle);

  await todoPage.switchTab("Work");
  await todoPage.expectTodoVisible(workTitle);
  await todoPage.expectTodoHidden(privateTitle);
});
