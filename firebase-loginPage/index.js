// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import {
  getDatabase,
  ref,
  child,
  onValue,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_BJdu1fprte_8of0iuh2dip3VhA_vBmI",
  authDomain: "fir-webapp-f0c8f.firebaseapp.com",
  projectId: "fir-webapp-f0c8f",
  storageBucket: "fir-webapp-f0c8f.appspot.com",
  messagingSenderId: "1018239553336",
  appId: "1:1018239553336:web:949419f796ce99c979fbcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase(app);

let loginDiv = document.getElementById("login");
let pageDiv = document.getElementById("afterLogin");

loginDiv.style.display = "block";
pageDiv.style.display = "none";

let loginButton = document.getElementById("login-form-submit");
let emailField = document.getElementById("username-field");
let pwdField = document.getElementById("password-field");
let numAmb = document.getElementById("num-amb");
let numBed = document.getElementById("num-bed");
let hName = document.getElementById("mname");
let uid;
loginButton.addEventListener("click", function () {
  if (emailField.value == "" || pwdField.value == "") {
    console.log("Empty Input");
  } else {
    signInWithEmailAndPassword(auth, emailField.value, pwdField.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        uid = user.uid;
        //loginDiv.style.visibility = 'hidden'
        //pageDiv.style.display = 'visible'
        loginDiv.style.display = "none";
        pageDiv.style.display = "block";
        let data;
        console.log();
        const hospitalRef = ref(db, "hospitals/mq55jwuMx1d2HpD9ti3cd03Z9wq1");
        onValue(hospitalRef, async (snapshot) => {
          const value = await snapshot.val();
          data = value;
          console.log(data);
          setDetails(data);
        });
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
});

// let bedInput = document.getElementById("num-bedinp");
// let ambInput = document.getElementById("num-ambinp");
// let dataSubmit = document.getElementById("dataSubmit");

// dataSubmit.addEventListener("click", function () {
//   if (bedInput.value == "" || ambInput.value == "") {
//     console.log("Empty Input");
//   } else {
//     update(ref(db, "hospitals/" + uid), {
//       ambulanceStatus: ambInput,
//       bedNum: bedInput,
//     });
//     const hospitalRef = ref(db, "hospitals/mq55jwuMx1d2HpD9ti3cd03Z9wq1");
//     onValue(hospitalRef, async (snapshot) => {
//       const value = await snapshot.val();
//       data = value;
//       console.log(data);
//       setDetails(data);
//     });
//   }
// });

// function setDetails(a) {
//   hName.innerText = a["name"];
//   numBed.innerText = a["bedNum"];
//   numAmb.innerText = a["ambulanceStatus"];
// }
