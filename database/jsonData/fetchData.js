const fetch = require("node-fetch");
const fs = require("fs");

fetch("https://mohdraza-me.herokuapp.com/api/projects")
  .then((res) => res.json())
  .then((data) => {
    console.log("data: ", data);
    const projects = JSON.stringify(data, null, 2);
    fs.writeFileSync("./database/jsonData/projectList.json", projects, (err) =>
      console.log(err)
    );
  });

  fetch("https://mohdraza-me.herokuapp.com/api/logos")
  .then((res) => res.json())
  .then((data) => {
    console.log("data: ", data);
    const logos = JSON.stringify(data, null, 2);
    fs.writeFileSync("./database/jsonData/logoList.json", logos, (err) =>
      console.log(err)
    );
  });

// fetch("https://dj-helper-be.herokuapp.com/api/events")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("working2");

//     const events = JSON.stringify(data, null, 2);
//     fs.writeFileSync("events.json", events, (err) => console.log(err));
//   });

// fetch("https://dj-helper-be.herokuapp.com/api/playlists")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("working3");

//     const playlists = JSON.stringify(data, null, 2);
//     fs.writeFileSync("playlists.json", playlists, (err) => console.log(err));
//   });
