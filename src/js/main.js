import { Todos } from "./models/todos";

let doneContainer = document.getElementById("myList");
let notDoneContainer = document.getElementById("mySecondList");
let objList = [];

document.addEventListener("DOMContentLoaded", () => {
  loadList(objList);
});

document.getElementById("btn--sort").addEventListener("click", () => {
  sortList(objList);
});
document.getElementById("btn--delete").addEventListener("click", () => {
  deleteFromList(objList, true, notDoneContainer);
});

document.getElementById("btn").addEventListener("click", () => {
  if (document.getElementById("first").value.length !== 0) {
    let newToDo = new Todos(document.getElementById("first").value);
    objList.push(newToDo);
    document.getElementById("first").value = "";
    addToDo(objList);
  } else {
    window.alert("Ya'll need to type somethin'");
  }
});

function addToDo(objectList) {
  doneContainer.innerHTML = "";
  notDoneContainer.innerHTML = "";
  for (let i = 0; i < objectList.length; i++) {
    let toDoItems = document.createElement("li");
    if (objectList[i].isDone === false) {
      doneContainer.appendChild(toDoItems);
    }
    if (objectList[i].isDone === true) {
      notDoneContainer.appendChild(toDoItems);
    }
    toDoItems.classList.add("clickable");
    toDoItems.addEventListener("click", () => {
      handleClick(objectList[i], toDoItems, objectList);
    });
    toDoItems.innerText = objectList[i].what;
    localStorage.setItem("storageList", JSON.stringify(objList));
  }
}

function handleClick(obj, element, objectList) {
  if (obj.isDone === false) {
    obj.isDone = true;
    element.innerText = "Done!";
    element.classList.toggle("disable");
    setTimeout(() => {
      element.remove();
      addToDo(objectList);
    }, 1000);
  } else {
    obj.isDone = false;
    element.remove();
    addToDo(objectList);
  }
}

function sortList(listToSort) {
  let sortedList = listToSort;
  if (sortedList) {
    sortedList.sort((a, b) => (a.what > b.what ? 1 : a.what === b.what - 1));
    for (let i = 0; i < sortedList.length; i++) {
      listToSort[i] = sortedList[i];
    }
    addToDo(listToSort);
  } else {
    window.alert("Nåt gick fel");
  }
}
function deleteFromList(listToSearch, target, element) {
  for (let i = listToSearch.length - 1; i >= 0; i--) {
    if (listToSearch[i].isDone === target) {
      listToSearch.splice(i, 1);
    }

    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
  }
  localStorage.setItem("storageList", JSON.stringify(listToSearch));
}

function loadList(objectList) {
  let storageList = JSON.parse(localStorage.getItem("storageList"));
  if (storageList) {
    for (let i = 0; i < storageList.length; i++) {
      let newItem = new Todos(storageList[i].what, storageList[i].isDone);
      objectList.push(newItem);
    }
    addToDo(objectList);
  }
}
