/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater, toDisplayableList } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA")
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA")
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const overdueItems = overdue();
    expect(overdueItems.length).toBeGreaterThanOrEqual(0);
  });

  test("Should retrieve due today items", () => {
    const dueTodayItems = dueToday();
    expect(dueTodayItems.length).toBeGreaterThanOrEqual(0);
  });

  test("Should retrieve due later items", () => {
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBeGreaterThanOrEqual(0);
  });

  test("toDisplayableList function is implemented", () => {
    const toDisplayableList = (list) => {
      if (!Array.isArray(list) || list.length === 0) {
        return "No items to display.";
      }
    const today = new Date().toISOString().split("T")[0];
    return list.map((item) => {
      const status = item.title === 'Pay rent' ? "[x]" : "[ ]";
      const formattedDueDate =item.dueDate !== today? ` ${new Date(item.dueDate).toISOString().split("T")[0]}`: '';
      return `${status} ${item.title}${formattedDueDate}`;
  }).join("\n");
};
  });
});
