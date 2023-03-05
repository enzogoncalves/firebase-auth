import {
 getAuth,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 signInWithPopup,
 GoogleAuthProvider,
 FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const createAccount_btn = document.getElementById("create-account-btn")
const signIn_btn = document.getElementById("signIn")
const welcomeMessage_label = document.getElementById("welcome-message")
const signInWithGoogle_btn = document.querySelector(".google")
const signInWithFacebook_btn = document.querySelector(".facebook")

createAccount_btn.addEventListener("click", () => {
 createUserWithEmailAndPassword(auth, email_input.value, password_input.value)
  .then((userCredential) => {
   // Signed in
   const user = userCredential.user
   alert("Credenciado com sucesso!")
   welcomeMessage_label.innerText = "Bem vindo!"
   console.log(user)
   // ...
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   console.log(errorCode + errorMessage)
   // ..
  })
})

signIn_btn.addEventListener("click", () => {
 signInWithEmailAndPassword(auth, email_input.value, password_input.value)
  .then((userCredential) => {
   // Signed in
   const user = userCredential.user
   alert("Autenticado com sucesso!")
   welcomeMessage_label.innerText = "Autenticado com sucesso!"
   console.log(user)
   // ...
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   console.log(errorCode + errorMessage)
   // ..
  })
})

signInWithGoogle_btn.addEventListener("click", () => {
 signInWithPopup(auth, googleProvider)
  .then((result) => {
   const credential = GoogleAuthProvider.credentialFromResult(result)
   const token = credential.accessToken
   const user = result.user
   welcomeMessage_label.innerText = `Bem vindo ${user.displayName}`

   console.log(user)
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   const email = error.customData.email
   const credential = GoogleAuthProvider.credentialFromError(error)

   console.log(errorCode + errorMessage)
   // ...
  })
})

signInWithFacebook_btn.addEventListener("click", () => {
 signInWithPopup(auth, facebookProvider)
  .then((result) => {
   const credential = FacebookAuthProvider.credentialFromResult(result)
   const token = credential.accessToken
   const user = result.user
   welcomeMessage_label.innerText = `Bem vindo ${user.displayName}`

   console.log(user)
  })
  .catch((error) => {
   alert("Deu erro :(  Verifique o console. (F12)")
   const errorCode = error.code
   const errorMessage = error.message
   const email = error.customData.email
   const credential = FacebookAuthProvider.credentialFromError(error)

   console.log(errorCode + errorMessage)
   // ...
  })
})
