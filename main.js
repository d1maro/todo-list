"use strict";

const inputTask = document.querySelector(".todo__enter");
// inputTask.addEventListener("change", inputHandler);

const addTask = document.querySelector(".todo__add");
addTask.addEventListener("click", inputHandler);

const taskPlace = document.querySelector(".todo__main");

function inputHandler() {
  let taskText = inputTask.value;
  createTask(taskText);
}

function createTask(taskText) {
  const task = document.createElement("div");
  task.className = "main__task";

  const checkbox = document.createElement("input");
  checkbox.className = "task__checkbox";
  checkbox.setAttribute("type", "checkbox");

  const text = document.createElement("label");
  text.className = "task__text";
  text.textContent = taskText;

  const link = document.createElement("a");
  link.className = "task__link";
  link.setAttribute("href", "#");

  link.addEventListener("click", taskDelete);

  function taskDelete() {
    link.parentElement.remove();
  }

  const cross = document.createElement("img");
  cross.className = "task__cross";
  cross.setAttribute("width", 16);
  cross.setAttribute("height", 16);
  cross.setAttribute("src", "./cross.svg");

  task.append(checkbox);
  task.append(text);
  task.append(link);

  link.append(cross);

  taskPlace.append(task);

  return task;
}
