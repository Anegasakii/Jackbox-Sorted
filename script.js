let games;
fetch("games.json")
    .then((response) => response.json())
    .then((json) => games = new Object(json));

//things like player count and the types of games I didn't personally know taken from https://jackboxgames.fandom.com/wiki/The_Jackbox_Party_Pack_(series)#Games

let currentSort = "pack";
let ascending = true;

function sort(property) {

    if(currentSort == property) { ascending = !ascending; } else { ascending = true; } //idk how to get that alternating thing to happen nicely lol

    if(typeof(games[0][property]) == "string"){
        if(ascending) { games.sort((a, b) => a[property].localeCompare(b[property])); }
        else { games.reverse((a, b) => a[property].localeCompare(b[property])); }
    } else {
        if(ascending) { games.sort((a, b) => a[property] - b[property]); }
        else { games.reverse((a, b) => a[property] - b[property]); }
    }
    currentSort = property;
    console.log(games);
    update();
}

let blacklist = true;

function update() {

    const packs = 9; const types = ["Writing", "Trivia", "Drawing", "Other"];
    let filteredPacks = []; let filteredTypes = [];
    for(let i = 1; i <= packs; i++){
        if(document.getElementById(`pack${i}`).checked) { filteredPacks.push(i); }
    }
    for(let i = 0; i < types.length; i++) {
        if(document.getElementById(`type${types[i]}`).checked) { filteredTypes.push(types[i]); }
    }
    const minPlayers = document.getElementById("minPlayers").value;

//    console.log(filteredPacks);
//    console.log(filteredTypes);

    let bodyhtml = ``;
    for(let row = 0; row < games.length; row++){
        const current = games[row];
        if(blacklist){
            if(filteredPacks.includes(current.pack)) { continue; }
            if(filteredTypes.includes(current.type)) { continue; }
        } else {
            if(!filteredPacks.includes(current.pack)) { continue; }
            if(!filteredTypes.includes(current.type)) { continue; }
        }
        if(current.max < minPlayers) { continue; }
        bodyhtml +=
`<tr>
        <td>${current.pack}</td>
        <td>${current.name}</td>
        <td>${current.max}</td>
        <td>${current.type}</td>
        <td>${current.summary}</td>
</tr>
`
        console.log(bodyhtml); //so I have to neither make the placeholder manually nor learn how to time things
    }
    document.getElementById("table body").innerHTML = bodyhtml;

}

function toggleList() {
    blacklist = !blacklist;
    let name = document.getElementById("listToggle");
    if(blacklist) { name.innerHTML = "Blacklist"; } else { name.innerHTML = "Whitelist"}
}