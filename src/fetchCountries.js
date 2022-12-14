//https://restcountries.com/v3.1/name/{name}
const BASE_URL = 'https://restcountries.com/v3.1/';
function fetchCountries(name) {
    return fetch(`${BASE_URL}name/${name}?fields=name,capital,languages,flags,population`).
        then(response => {
            if (response.ok) {
                return response.json();
            }
            throw Error(response.status);
        });
}
export default { fetchCountries };