
function initialize() {
    var firebaseConfig = {
        apiKey: "AIzaSyD2uEODgvt4HrkOOjdqXoHAQDMDN1x_L8M",
        authDomain: "resto-67dd2.firebaseapp.com",
        databaseURL: "https://resto-67dd2.firebaseio.com",
        projectId: "resto-67dd2",
        storageBucket: "resto-67dd2.appspot.com",
        messagingSenderId: "368135048175",
        appId: "1:368135048175:web:25bd1cac17653598e6841a",
        measurementId: "G-45ZZW8PEF9"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

};

