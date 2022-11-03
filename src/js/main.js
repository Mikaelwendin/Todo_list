class Todos {
  constructor(what,isDone) {
    this.isDone = isDone || false;
    this.what = what;
  }
}
let doneContainer = document.getElementById("myList");
let notDoneContainer = document.getElementById("mySecondList");
let objList = [
  new Todos("första saken",  false),
  new Todos( "Andra saken",  false),
  new Todos( "tredje saken",  false),
  new Todos( "fjärde saken",  false),
  new Todos( "femte saken",  false),
  new Todos( "sjätte saken",  false),
  new Todos( "sjunde saken",  false),
  new Todos( "åttonde saken",  false),
];

document.addEventListener("DOMContentLoaded", () => {
  sortList(objList);
});

document.getElementById("btn--sort").addEventListener("click", () => {
  sortList(objList);
});
document.getElementById("btn--delete").addEventListener("click", () => {
  deleteFromList(objList, true, notDoneContainer);
});

document.getElementById("btn").addEventListener("click", () => {
  if (document.getElementById("first").value.length !== 0)
  {
  createToDo(
    document.getElementById("first").value);
    document.getElementById("first").value = "";
  }
  else {
    window.alert("Ya'll need to type somethin'");
  }
});

function addToDo(obj) {
  //sessionStorage.setItem(obj.id, JSON.stringify(obj));
  let toDoItems = document.createElement("li");
  if (obj.isDone === false) {
    doneContainer.appendChild(toDoItems);
  }
  if (obj.isDone === true) {
    notDoneContainer.appendChild(toDoItems);
  }
  toDoItems.classList.add("clickable");
  toDoItems.addEventListener("click", () => {
    handleClick(obj, toDoItems);
  });
  toDoItems.innerText = obj.what;
}

function createToDo(userWhat, isDone) {
  
  let newToDo = new Todos(userWhat, isDone);
  addToDo(newToDo);
  objList.push(newToDo);
}
function handleClick(obj, element) {
  if (obj.isDone === false) {
    obj.isDone = true;
    element.innerText = "Done!";
    element.classList.toggle("disable");
    setTimeout(() =>  {
      element.remove();
      
    }, 1000);
    addToDo(obj);
    
  } else {
    obj.isDone = false;
    element.remove();
    addToDo(obj);
  }
}

function sortList(oList) {
  let element = document.getElementById("myList");
  let sortedList = oList;
  if (sortedList) {
    sortedList.sort((a, b) =>
      a.what > b.what ? 1 : a.what === b.what -1
    );
    element.innerHTML = "";
    for (let i = 0; i < sortedList.length; i++) {
      oList[i] = sortedList[i];
      if (oList[i].isDone === false) {
        addToDo(oList[i]);
      }
    }
  } else {
    window.alert("lol");
  }
}
function deleteFromList(listToSearch, target, element) {
  for (let i = 0; i < listToSearch.length; i++) {
    if (listToSearch[i].isDone === target) {
      listToSearch.splice(i, 1);
    }
    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
  }
}
