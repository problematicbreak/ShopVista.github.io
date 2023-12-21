//Unique Firebase Object
const firebaseConfig = {
  apiKey: "AIzaSyCJCSmzV4RZExAzJZjSI4Ad2RPs3JWywtQ",
  authDomain: "ecommerce-124ef.firebaseapp.com",
  projectId: "ecommerce-124ef",
  storageBucket: "ecommerce-124ef.appspot.com",
  messagingSenderId: "210851374522",
  appId: "1:210851374522:web:bdfaf04fb291b62d912983"
};
    
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();
    
    //Variable to access database collection
    const db = firestore.collection("customer_detail");
    
    //Get Submit Form
    let submitButton = document.getElementById("Submit");
    
    //Create Event Listener To Allow Form Submission
    submitButton.addEventListener("click", (e) => {
      //Prevent Default Form Submission Behavior
      e.preventDefault();
    
      //Get Form Values
      let firstName = document.getElementById("fname").value;
      let mobile = document.getElementById("mobile").value;
      let email = document.getElementById("email").value;  //Changed
      let city = document.getElementById("city").value;  //Changed
      let area = document.getElementById("area").value;  //Changed
      let pin = document.getElementById("pin").value;
      let payment = document.getElementById("payment").value;

    
      firestore
        .collection("customer_detail")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const fn = doc.data().fname;
            if (firstName === fn) {
              console.log("Already Exists");
            }
    
            // console.log("data", doc.data().fname);
          });
        });
      //Save Form Data To Firebase
      db.doc()
        .set({
          fname: firstName,
          mobile: mobile,
          email: email,
          city: city,
          area: area,  
          pin: pin,
          payment:payment,                
        })
        .then(() => { })
        .catch((error) => {
          console.log(error);
        });
    
      //alert
      alert("Your Order has been placed!!!");
    
      //clear form after submission
      function clearForm() {
        document.getElementById("clearFrom").reset();
      }
      clearForm()
    });