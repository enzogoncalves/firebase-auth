import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signInWithPopup,
 GoogleAuthProvider,
 FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

const form = document.querySelector(".form")

form.addEventListener("submit", (e) => {
 e.preventDefault()
})

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

function clearInputs() {
 email_input.value = ""
 password_input.value = ""
}

const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const createAccount_btn = document.getElementById("create-account-btn")
const signIn_btn = document.getElementById("signIn")
const welcomeMessage_label = document.getElementById("welcome-message")
const signInWithGoogle_btn = document.querySelector(".google")
const signInWithFacebook_btn = document.querySelector(".facebook")

createAccount_btn.addEventListener("click", () => {
 if (email_input.value == "") return
 if (password_input.value.trim().length < 6) return

 createUserWithEmailAndPassword(auth, email_input.value, password_input.value)
  .then((userCredential) => {
   // Signed in
   const user = userCredential.user
   alert("Credenciado com sucesso!")
   welcomeMessage_label.innerText = "Bem vindo!"
   console.log(user)
   clearInputs()
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   console.log(errorCode + errorMessage)
   clearInputs()
  })
})

signIn_btn.addEventListener("click", () => {
 if (email_input.value == "") return
 if (password_input.value == "") return

 signInWithEmailAndPassword(auth, email_input.value, password_input.value)
  .then((userCredential) => {
   // Signed in
   const user = userCredential.user
   alert("Autenticado com sucesso!")
   welcomeMessage_label.innerText = "Autenticado com sucesso!"
   clearInputs()
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   console.log(errorCode + errorMessage)
   clearInputs()
  })
})

signInWithGoogle_btn.addEventListener("click", () => {
 signInWithPopup(auth, googleProvider)
  .then((result) => {
   const user = result.user
   welcomeMessage_label.innerText = `Bem vindo ${user.displayName}`

   console.log(user)
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message

   console.log(errorCode + errorMessage)
  })
})

signInWithFacebook_btn.addEventListener("click", () => {
 signInWithPopup(auth, facebookProvider)
  .then((result) => {
   const user = result.user
   welcomeMessage_label.innerText = `Bem vindo ${user.displayName}`
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message

   console.log(errorCode + errorMessage)
   // ...
  })
})
