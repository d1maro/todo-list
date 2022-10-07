"use strict";

const inputTask = document.querySelector(".todo__enter");
// inputTask.addEventListener("change", inputHandler);

const addTask = document.querySelector(".todo__add");
addTask.addEventListener("click", inputHandler);

const taskPlace = document.querySelector(".todo__main");

function inputHandler() {
  let taskText = inputTask.value;
  console.log(taskText);
  createTask();
}

function createTask() {
    
}
