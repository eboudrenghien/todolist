// Afficher les sélecteurs
const todoText = document.querySelector(".todotext");
const todoAjout = document.querySelector(".todo-ajout");
const todoList = document.querySelector(".todo-list"); 
const filtre = document.getElementById("filtre-todo")

document.addEventListener("DOMContentLoaded", getTaches)
todoAjout.addEventListener("click", addTodo);
todoList.addEventListener("click",supprimerCheck);
filtre.addEventListener("input", filtreTodo);

function addTodo(event) {
    event.preventDefault();
    // création d'une div to do list
    const todoDiv = document.createElement("div"); //permet de créer une div si on clique sur le bouton ajout
    // création de la class div précédente (todo)
    todoDiv.classList.add("todo");
    // création d'une liste non ordonnée
    const newTodo = document.createElement("li");
    newTodo.innerText = todoText.value;
    //texte pour tester si ça marche
 
    // ajoute une class todo-item
    newTodo.classList.add("todo-item");
    //permet de créer un enfant (newTodo, liste) à la div todoDiv
    todoDiv.appendChild(newTodo);
    saveLocalTaches(todoText.value);
    console.log("hi")

    // création du bouton check
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    // création du bouton delete;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

      // création du bouton editer; 
      //création du bouton input avec une image;
      // difficulté rencontré : relier l'image à input;
      // Solution trouver (voir essai.js)
      const editButton = document.createElement("button");
      editButton.innerHTML='<i class="fa-solid fa-ellipsis"></i>';
      editButton.classList.add("edit-button");
      todoDiv.appendChild(editButton);

    // ajouter notre tâche à la liste todo
    todoList.appendChild(todoDiv);
    todoText.value = ""; 
}

// Bouton supprimer
function supprimerCheck(e){
  const tache = e.target;   
  if(tache.classList[0] === "delete-button"){
    const todo = tache.parentElement;
    removeLocaleTaches(todo);
  todo.remove();
  }
  if(tache.classList[0] === "check-button"){
    const todo = tache.parentElement;    
    todo.classList.toggle("completed");
  }
}

// Filtre
function filtreTodo(e){
  const taches = todoList.childNodes;
  taches.forEach(function(todo){
    switch (e.target.value){
      case "toutes":
        todo.style.display = "flex";
        break;
      case "termine":
        if (todo.classList.contains("completed")){
          todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
      break;
    case "encours":
      if (!todo.classList.contains("completed")){
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
      break;
    }
  });
}

// Sauvegarde

function saveLocalTaches(todo){
  let taches;
  if (localStorage.getItem("taches") === null){
    taches = [];
  } else{
    taches = JSON.parse(localStorage.getItem("taches"))
  }
  taches.push(todo);
  localStorage.setItem("taches", JSON.stringify(taches));
}

function getTaches(){
  let taches;
  if (localStorage.getItem("taches") === null){
    taches = [];
  } else{
    taches = JSON.parse(localStorage.getItem("taches"));
  }
  taches.forEach(function(todo){
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo");
    // création d'une liste non ordonnée
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // création du bouton check
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    checkButton.classList.add("check-button");
    todoDiv.appendChild(checkButton);

    // création du bouton delete;
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

      // création du bouton editer; 
      const editButton = document.createElement("button");
      editButton.innerHTML='<i class="fa-solid fa-ellipsis"></i>';
      editButton.classList.add("edit-button");
      todoDiv.appendChild(editButton);
    todoList.appendChild(todoDiv);
  })
}

function removeLocaleTaches(todo){
  let taches;
  if (localStorage.getItem("taches") === null){
    taches = [];
  } else{
    taches = JSON.parse(localStorage.getItem("taches"));
  }
  const todoIndex = todo.children[0].innerText;
  taches.splice(taches.indexOf(todoIndex),1);
  localStorage.setItem("taches", JSON.stringify(taches));
}
    // fonction qui édite, deux propostions;
    // fonction sauvegarder;
    // fonction annuler. 