import { Todos } from "./models/todos";

let doneContainer = document.getElementById("myList");
let notDoneContainer = document.getElementById("mySecondList");
let allToDos = [];

document.addEventListener("DOMContentLoaded", () => {
  loadList(allToDos);
});

document.getElementById("btn--sort").addEventListener("click", () => {
  sortList(allToDos);
});
document.getElementById("btn--delete").addEventListener("click", () => {
  deleteFromList(allToDos, true, notDoneContainer);
});

document.getElementById("btn").addEventListener("click", () => {
  if (document.getElementById("first").value.length !== 0) {
    let newToDo = new Todos(document.getElementById("first").value);
    allToDos.push(newToDo);
    document.getElementById("first").value = "";
    addToDo(allToDos);
  } else {
    window.alert("Ya'll need to type somethin'");
  }
});

function addToDo(toDos) {
  doneContainer.innerHTML = "";
  notDoneContainer.innerHTML = "";
  for (let i = 0; i < toDos.length; i++) {
    let toDoItems = document.createElement("li");
    if (toDos[i].isDone === false) {
      doneContainer.appendChild(toDoItems);
    }
    if (toDos[i].isDone === true) {
      notDoneContainer.appendChild(toDoItems);
    }
    toDoItems.classList.add("clickable");
    toDoItems.addEventListener("click", () => {
      handleClick(toDos[i], toDoItems, toDos);
    });
    toDoItems.innerText = toDos[i].what;
    localStorage.setItem("storageList", JSON.stringify(allToDos));
  }
}

function handleClick(toDo, markUp, toDos) {
  if (toDo.isDone === false) {
    toDo.isDone = true;
    markUp.innerText = "Done!";
    markUp.classList.toggle("disable");
    setTimeout(() => {
      markUp.remove();
      addToDo(toDos);
    }, 1000);
  } else {
    toDo.isDone = false;
    markUp.remove();
    addToDo(toDos);
  }
}

function sortList(toDoToSort) {
  let sortedToDos = toDoToSort;
  if (sortedToDos) {
    sortedToDos.sort((a, b) => (a.what > b.what ? 1 : a.what === b.what - 1));
    for (let i = 0; i < sortedToDos.length; i++) {
      toDoToSort[i] = sortedToDos[i];
    }
    addToDo(toDoToSort);
  } else {
    window.alert("Nåt gick fel");
  }
}
function deleteFromList(toDosToSearch, target, markUp) {
  for (let i = toDosToSearch.length - 1; i >= 0; i--) {
    if (toDosToSearch[i].isDone === target) {
      toDosToSearch.splice(i, 1);
    }

    while (markUp.hasChildNodes()) {
      markUp.removeChild(markUp.firstChild);
    }
  }
  localStorage.setItem("storageList", JSON.stringify(toDosToSearch));
}

function loadList(toDos) {
  let storageToDos = JSON.parse(localStorage.getItem("storageList"));
  if (storageToDos) {
    for (let i = 0; i < storageToDos.length; i++) {
      let newItem = new Todos(storageToDos[i].what, storageToDos[i].isDone);
      toDos.push(newItem);
    }
    addToDo(toDos);
  }
}
