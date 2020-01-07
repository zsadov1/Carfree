window.addEventListener("load", () => {
 let long;
 let lat;

 let rainChance = document.querySelector('.rain-chance');


    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

           const proxy = `https://cors-anywhere.herokuapp.com/`;
           const api = `${proxy}https://api.darksky.net/forecast/9c3f1b2093600100e3b6d747fa501d3f/${lat},${long}`; 
                
                fetch(api)
                    .then(response => {
                         return response.json()
                 })
                    .then(data => {
                        console.log(data);
                        const {summary} = data.minutely;
                      rainChance.textContent = summary;
                    });

                 });
}
})


