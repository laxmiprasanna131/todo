const http = require("http");
const fs = require("fs");
const url = require("url");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

let homeContent = "";
let projectContent = "";
let registrationContent = "";

try {
  homeContent = fs.readFileSync("home.html", "utf8");
} catch (err) {
  console.error("Error reading home.html:", err);
  homeContent = "Error loading home page.";
}

try {
  projectContent = fs.readFileSync("project.html", "utf8");
} catch (err) {
  console.error("Error reading project.html:", err);
  projectContent = "Error loading project page.";
}

try {
  registrationContent = fs.readFileSync("registration.html", "utf8");
} catch (err) {
  console.error("Error reading registration.html:", err);
  registrationContent = "Error loading registration page.";
}

http
  .createServer((request, response) => {
    let urlPath = url.parse(request.url).pathname;

    response.writeHead(200, { "Content-Type": "text/html" });

    switch (urlPath) {
      case "/project":
        response.write(projectContent);
        break;
      case "/registration":
        response.write(registrationContent);
        break;
      default:
        response.write(homeContent);
        break;
    }

    response.end();
  })
  .listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
