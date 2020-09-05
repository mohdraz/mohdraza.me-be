const fetch = require("node-fetch");
const fs = require("fs");

fetch("https://dj-helper-be.herokuapp.com/api/djs")
  .then((res) => res.json())
  .then((data) => {
    const users = JSON.stringify(data, null, 2);
    fs.writeFileSync("userList.json", users, (err) => console.log(err));
  });

fetch("https://dj-helper-be.herokuapp.com/api/events")
  .then((res) => res.json())
  .then((data) => {
    console.log("working2");

    const events = JSON.stringify(data, null, 2);
    fs.writeFileSync("events.json", events, (err) => console.log(err));
  });

fetch("https://dj-helper-be.herokuapp.com/api/playlists")
  .then((res) => res.json())
  .then((data) => {
    console.log("working3");

    const playlists = JSON.stringify(data, null, 2);
    fs.writeFileSync("playlists.json", playlists, (err) => console.log(err));
  });
