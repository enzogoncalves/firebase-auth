import {
 getDatabase,
 ref,
 set,
 child,
 push,
 onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"

const form = document.querySelector(".form")

form.addEventListener("submit", (e) => {
 e.preventDefault()
})

function clearInputs() {
 name_input.value = ""
 age_input.value = ""
}

const name_input = document.getElementById("name")
const age_input = document.getElementById("age")
const addUserData_btn = document.getElementById("addUserData")
const usersList = document.getElementById("usersList")

function updateUsers() {
 const db = getDatabase()

 const data = ref(db, "users/")
 onValue(data, (snapshot) => {
  const users = snapshot.val()

  usersList.innerHTML = ""

  for (const user in users) {
   const li = document.createElement("li")
   li.textContent = `${users[user].username}: ${users[user].age}`

   usersList.appendChild(li)
  }
 })
}

function writeUserData(name, age) {
 const db = getDatabase()

 const newUserKey = push(child(ref(db), "posts")).key

 set(ref(db, "users/" + newUserKey), {
  userId: newUserKey,
  username: name,
  age: age,
 })
}

addUserData_btn.addEventListener("click", () => {
 if (name_input.value == "") return
 if (age_input.value.length == 0) return

 writeUserData(name_input.value, age_input.value)

 updateUsers()

 clearInputs()
})

updateUsers()
