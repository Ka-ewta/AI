import { expect } from "@playwright/test";

export class TodoPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.locator("#titleInput");
    this.deadlineInput = page.locator("#deadlineInput");
    this.typeInput = page.locator("#typeInput");
    this.addButton = page.locator("#addBtn");
    this.emptyState = page.locator("#empty");
    this.todoList = page.locator("#list");
  }

  async open() {
    await this.page.goto("/");
    await expect(this.titleInput).toBeVisible();
  }

  async addTodo({ title, deadline, type }) {
    await this.titleInput.fill(title);
    if (deadline) {
      await this.deadlineInput.fill(deadline);
    }
    if (type) {
      await this.typeInput.selectOption(type);
    }
    await this.addButton.click();
  }

  async switchTab(tabName) {
    await this.page.getByRole("button", { name: tabName, exact: true }).click();
  }

  async removeTodoByTitle(title) {
    const row = this.page.locator("li", { hasText: title }).first();
    await row.getByRole("button", { name: "ลบ" }).click();
  }

  todoTitle(title) {
    return this.page.locator(".title", { hasText: title });
  }

  async expectTodoVisible(title) {
    await expect(this.todoTitle(title)).toBeVisible();
  }

  async expectTodoHidden(title) {
    await expect(this.todoTitle(title)).toHaveCount(0);
  }

  async expectEmptyStateVisible() {
    await expect(this.emptyState).toBeVisible();
  }
}
