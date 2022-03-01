async function GetBreweries(param) {
    const data = await fetch(`https://api.openbrewerydb.org/${param}`);
    return await data.json();
}

async function GetBrewery(brewery) {
    const data = await fetch(`https://api.openbrewerydb.org/breweries/${brewery}`);
    return await data.json();
}

export default ({
    GetBreweries,
    GetBrewery
});