// Selection élements
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const ctx = document.getElementById("axes_line_chart").getContext("2d");

// Initialisation des variables
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];

  let country_code = 'FR';
  let user_country;

function getUserCountry(){// Récupération code pays
  
  console.log('country code: '+country_code);
  country_list.forEach((country) => {
    if (country.code == country_code) {
      user_country = country.name;
    }
  });}



/*                     FETCH API                  */

async function fetchData(country) {
  
  
  user_country = country;
  country_name_element.innerHTML = "Loading...";

  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    
    console.log('api_fetch');
    
    const request = await fetch(  
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed", requestOptions);
      const data = await request.json();

      
      console.log(country_list);
      data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      

    const requestRecovered = await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/recovered", requestOptions);
    const dataRecovered= await requestRecovered.json(); 
    dataRecovered.forEach((entry) => {
        recovered_list.push(entry.Cases);
      });
      

     const requestDead = await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths", requestOptions);
      dataDead= await requestDead.json();
      dataDead.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });

    updateUI();
  };
      

  api_fetch(country);
};


// fetchData(user_country);
async function callFunctions(){
  await initialize();
  getUserCountry();
  await fetchData(user_country);
}
// Mise à jours des données
function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {
  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases =
    total_recovered - recovered_list[recovered_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  country_name_element.textContent = user_country;
  total_cases_element.textContent = total_cases;
  new_cases_element.textContent = `+${new_confirmed_cases}`;
  recovered_element.textContent = total_recovered;
  new_recovered_element.textContent = `+${new_recovered_cases}`;
  deaths_element.textContent = total_deaths;
  new_deaths_element.textContent = `+${new_deaths_cases}`;

  // format dates
  dates.forEach((date) => {
    formatedDates.push(formatDate(date));
  });
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Cas confirmés",
          data: cases_list,
          fill: false,
          borderColor: "#FFF",
          backgroundColor: "#FFF",
          borderWidth: 1,
        },
        {
          label: "Guéris",
          data: recovered_list,
          fill: false,
          borderColor: "#009688",
          backgroundColor: "#009688",
          borderWidth: 1,
          fontColor: 'white'
        },
        {
          label: "Décès",
          data: deaths_list,
          fill: false,
          borderColor: "#f44336",
          backgroundColor: "#f44336",
          borderWidth: 1,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
      
        labels:{
          fontColor:'white'
        }
        
      },
      scales:{
        yAxes: [{
          ticks:{
            fontColor: 'white'
          }
        }],
        xAxes: [{
          ticks:{
           fontColor:'white' 
          }
        }],
      }
    },
  });
}

// Format des mois
const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);

  return `${date.getDate()} ${monthsNames[date.getMonth() - 1]}`;
}
