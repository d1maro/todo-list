"use strict";

// const inputTask = document.querySelector(".todo__enter"); // переменная для задания текста задачи

const addTask = document.querySelector(".todo__add"); // переменная для кнопки, которая добавляет задачу
// addTask.addEventListener("click", inputHandler); // прослушка для кнопки, которая добавляет задачу

const taskPlace = document.querySelector(".todo__main"); // место для задачи, родительский элемент

const removeButtons = document.querySelector(".todo__foot");
// removeButtons.addEventListener("click", removeHandler); // нижний блок с кнопками

const removeComplete = document.querySelector(".foot__delete-complete"); // выбор кнопки для удаления завершенных задач

const removeAll = document.querySelector(".foot__delete-all"); // выбор кнопки для удаления всех задач

// function inputHandler() {
//   let taskText = inputTask.value;
//   createTask(taskText);
// }

function createTask(state, taskText) {
  // функция для создания задачи
  const task = document.createElement("div");
  task.className = "main__task";

  const checkbox = document.createElement("input");
  checkbox.className = "task__checkbox";
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = state;

  const text = document.createElement("label");
  text.className = "task__text";
  state ? text.classList.add("checked") : null;
  text.textContent = taskText;

  const link = document.createElement("a");
  link.className = "task__link";
  link.setAttribute("href", "#");

  // link.addEventListener("click", taskDelete);

  // function taskDelete() {
  //   link.parentElement.remove();
  // }

  const cross = document.createElement("img");
  cross.className = "task__cross";
  cross.setAttribute("width", 16);
  cross.setAttribute("height", 16);
  cross.setAttribute("src", "./cross.svg");

  task.append(checkbox);
  task.append(text);
  task.append(link);

  link.append(cross);

  // taskPlace.append(task);

  return task;
}

function saveTask() {
  // функция сохраняет задачи в локалсторедж
  let arr = []; // создаем пустой массив для хранения
  const tasks = document.querySelectorAll(".main__task"); // выбираем элемент с задачей
  tasks.forEach((elem) => {
    // перебираем все элементы
    arr.push({
      // добавляем в массив объект со статусом задачи и текстом задачи
      status: elem.childNodes[0].checked,
      text: elem.childNodes[1].innerText,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(arr)); // записываем объект с задачей в локал сторедж
  let storageLength = Object.values(
    JSON.parse(localStorage.getItem("tasks"))
  ).length; // получаем "длину" объекта
  return storageLength; // возвращаем "длину"
}

function renderTask(state, text) {
  taskPlace.append(createTask(state, text));
} // вставляем в место для задачи созданный див

(function main() {
  // точка с запятой нужна, это IIFE
  if (localStorage.getItem("tasks")) {
    // условие - локал сторедж должен быть не пустым
    let arr = JSON.parse(localStorage.getItem("tasks")); // заносим в локал сторедж данные из массива
    removeButtons.style.display = "flex"; // показываем нижнюю часть с кнопками
    arr.forEach((elem) => renderTask(elem.status, elem.text)); // отрисовываем данные из массива
  }
})(); // форма записи для Immediately invoked function expression

addTask.addEventListener("click", () => {
  // добавление задач
  const inputTask = document.querySelector(".todo__enter"); // выбор переменной для инпута, куда вводим текст
  removeButtons.style.display = "flex"; // показать кнопки снизу
  renderTask(false, inputTask.value); // отрисовать задачу
  inputTask.value = ""; // очистить поле инпут
  saveTask(); // сохранить задачу в локалсторедж
});

taskPlace.addEventListener("click", (event) => {
  // обрабатываем нажатия на задачу
  let check = event.target; // задаем для значения события переменную
  if (check.type == "checkbox") {
    // если нажимают на чекбокс, присваиваем ему и лейблу атрибут чекд
    check.toggleAttribute("checked");
    check.nextSibling.classList.toggle("checked");
    saveTask(); // сохраняем значение в локал сторедж
  } else {
    // отрабатываем нажатие на крестик
    check.parentNode.parentNode.outerHTML = null; // очищаем всю разметку снаружи события

    let local = saveTask(); // сохраняем значение из функции для сохранения в переменную local

    if (!local) {
      // если переменная локал не имеет значения, убираем нижнюю часть с кнопками и очищаем локал сторедж
      removeButtons.style.display = "none";
      localStorage.clear();
    }
  }
});

removeAll.addEventListener("click", () => {
  // удаляем все задачи по нажатию кнопки
  localStorage.clear(); // очищаем локал сторедж
  taskPlace.innerHTML = ""; // очищаем поле для добавления задач полностью
  removeButtons.style.display = "none"; // убираем нижнюю часть с кнопками
});

removeComplete.addEventListener("click", () => {
  // удаление выполненных задач - здесь дублируется код, можно оптимизировать
  let arr = []; // создаем пустой массив
  const tasks = document.querySelectorAll(".main__task"); // выбираем задачи
  tasks.forEach((elem) => {
    // перебираем задачи
    arr.push({
      status: elem.childNodes[0].checked,
      text: elem.childNodes[1].innerText,
    });
  });

  let items = arr.filter((e) => !e.status); // переменная айтемс для тех элементов, которые были выполнены (то есть лишились статуса)
  taskPlace.innerHTML = ""; // очищаем поле для задачи
  localStorage.setItem("tasks", JSON.stringify(items)); // записываем в локалсторедж фильтрованные данные
  items.forEach((e) => {
    // перебираем и рисуем те, которые не выполнены
    renderTask(e.status, e.text);
  });
});
