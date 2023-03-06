import {
 getStorage,
 ref,
 uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js"

const storage = getStorage()

const uploadFile_btn = document.getElementById("uploadFile")
const uploadBar = document.getElementById("uploadBar")

uploadFile_btn.addEventListener("change", (e) => {
 const file = e.target.files[0]

 const documentRef = ref(storage, `documents/${file.name}`)

 const upload = uploadBytesResumable(documentRef, file)

 upload.on(
  "state_changed",
  (snapshot) => {
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
   uploadBar.value = progress
  },
  (error) => {
   alert(error)
  },
  () => {
   alert("Enviado com sucesso")
  }
 )

 console.log(file)
})
