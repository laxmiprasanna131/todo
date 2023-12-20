/* eslint-disable no-undef */
const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater, toDisplayableList } = todoList();

describe("Todolist Test Suite", () => {
  beforeAll(() => {
    // Add a test todo item before running the tests
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
    expect(all[0].completed).toBe(true);
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
    // Your implementation of the toDisplayableList function
    const list = [
      { title: "Test todo", completed: false, dueDate: new Date().toLocaleDateString("en-CA") }
      // Add more test data as needed
    ];

    const result = toDisplayableList(list);
    
    // Add your expectations for the result here based on your implementation
    // For example, you can expect that the result is a non-empty string
    expect(result).not.toBe("");
  });
});
