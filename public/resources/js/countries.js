// ALL COUNTRY NAMES WITH THEIR ISO CODE
let country_list = [];
async function initialize( ) {
    const firebaseConfig = {
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
    const database = firebase.firestore();
    const snapshot= await database.collection('countries').get();
    country_list=snapshot.docs.map(doc =>doc.data());
    const snap = await database.collection('countries').get();
    console.log('récupération');
    nb_pays = snap.size ;
    console.log('en dehors de la promesse');
    

    //* Selection elements
    const search_country_element = document.querySelector(".search-country");
    const country_list_element = document.querySelector(".country-list");
    const chang_country_btn = document.querySelector(".change-country");
    const close_list_btn = document.querySelector(".close");
    const input = document.getElementById('search-input')

    // Creation liste pays
    function createCountryList() {
        const nb_pays = country_list.length;

        let i = 0, element_liste;

        country_list.forEach((country, index) => {
            if (index % Math.ceil(nb_pays / nb_colonne_liste) == 0) {
                element_liste = `list-${i}`;
                country_list_element.innerHTML += `<ul id='${element_liste}'></ul>`;
                i++;
            }

            document.getElementById(`${element_liste}`).innerHTML += `
                <li onclick="fetchData('${country.name}')" id="${country.name}">
                ${country.name}
                </li>
            `;
        })
    }

    let nb_colonne_liste = 3;
    createCountryList();

    // Afficher liste des pays lors du clic
    chang_country_btn.addEventListener("click", function () {
        input.value = "";
        resetCountryList();
        search_country_element.classList.toggle("hide");
        search_country_element.classList.add("fadeIn");
    });

    // Fermeture fenêtre lors du clic
    close_list_btn.addEventListener("click", function () {
        search_country_element.classList.toggle("hide");
    });

    country_list_element.addEventListener("click", function () {
        search_country_element.classList.toggle("hide");
    });

// Filtre sur pays
// Refresh à chaque lettre tapé
    input.addEventListener("input", function () {
        let value = input.value.toUpperCase();

        country_list.forEach(country => {
            if (country.name.toUpperCase().startsWith(value)) {
                document.getElementById(country.name).classList.remove("hide");
            } else {
                document.getElementById(country.name).classList.add("hide");
            }
        })
    })

// Réinitiliser la liste des pays
    function resetCountryList() {
        country_list.forEach(country => {
            document.getElementById(country.name).classList.remove("hide");
        })
    }
}