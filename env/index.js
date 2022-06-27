var http = require("http");
var fs = require("fs");

const port = process.env.PORT || 3001;

const server = http.createServer(async (request, response) => {
  // var filePath = "./books" + request.url;
  // if (filePath == "./books/") {
  //   filePath = "./data.json";
  // }

  // usage example:
  // var a = ["a", 1, "a", 2, "1"];
  // var unique = a.filter(onlyUnique);

  let content = require("./data.json");

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const contentType = "application/json";
  let currentId = content.length;
  let authorArray = [];
  authorArrayCount = authorArray.length;
  content.forEach((book) => authorArray.push(book.author));
  authorArray = authorArray.filter(onlyUnique);
  authorArray = authorArray.map((author, index) => {
    index: author;
  });

  let buffers = [];
  let data;
  if (request.url === "/" || request.url.match(/books\/(\d+)*/)) {
    switch (request.method) {
      case "GET":
        //return one
        if (request.url.match(/books\/(\d+)/)) {
          const id = request.url.split("/")[2];
          let getIndex = content.findIndex((book) => book.id === Number(id));

          response.writeHead(200, { "Content-Type": contentType });
          response.end(JSON.stringify(content[getIndex]), "utf-8");
        } else {
          //return all
          response.writeHead(200, { "Content-Type": contentType });
          response.end(JSON.stringify(content), "utf-8");
        }
        break;
      case "POST":
        for await (const chunk of request) {
          buffers.push(chunk);
        }

        data = Buffer.concat(buffers).toString();

        const newAuthor = JSON.parse(data);

        content.push({ id: currentId, ...newAuthor });
        currentId++;
        response.end(JSON.stringify(content));
        break;
      case "PUT":
        for await (const chunk of request) {
          buffers.push(chunk);
        }

        data = Buffer.concat(buffers).toString();

        const bookToUpdate = JSON.parse(data);

        let index = content.findIndex((book) => book.id === bookToUpdate.id);

        content[index] = { ...bookToUpdate };
        response.end(JSON.stringify(content));
        break;
      case "DELETE":
        for await (const chunk of request) {
          buffers.push(chunk);
        }
        data = Buffer.concat(buffers).toString();

        const bookToDelete = JSON.parse(data);

        let indexToDelete = content.findIndex(
          (book) => book.id === bookToDelete.id
        );

        content.splice(indexToDelete, 1);
        response.end(JSON.stringify(content));
        break;
    }
  } else if (request.url.match(/authors\/(\d+)*/)) {
    switch (request.method) {
      case "GET":
        if (request.url.match(/authors\/(\d+)/)) {
          //return one
          const id = request.url.split("/")[2];

          response.writeHead(200, { "Content-Type": contentType });

          let index = authorArray.findIndex(
            (author) => author.id === Number(id)
          );

          response.end(JSON.stringify(authorArray[index]), "utf-8");
        } else {
          //return all
          response.writeHead(200, { "Content-Type": contentType });
          response.end(JSON.stringify(authorArray), "utf-8");
        }
        break;
      case "POST":
        for await (const chunk of request) {
          buffers.push(chunk);
        }

        data = Buffer.concat(buffers).toString();

        const newAuthor = JSON.parse(data);

        content.push({ id: currentId, ...newAuthor });
        currentId++;
        response.end(JSON.stringify(content));
        break;
      case "PUT":
        for await (const chunk of request) {
          buffers.push(chunk);
        }

        data = Buffer.concat(buffers).toString();

        const bookToUpdate = JSON.parse(data);

        let index = content.findIndex((book) => book.id === bookToUpdate.id);

        content[index] = { ...bookToUpdate };
        response.end(JSON.stringify(content));
        break;
      case "DELETE":
        for await (const chunk of request) {
          buffers.push(chunk);
        }

        data = Buffer.concat(buffers).toString();

        const bookToDelete = JSON.parse(data);

        let indexToDelete = content.findIndex(
          (book) => book.id === bookToDelete.id
        );

        content.splice(indexToDelete, 1);
        response.end(JSON.stringify(content));
        break;
    }
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running at port http://127.0.0.1:${port}`);
});

// response.statusCode = 200;
// response.setHeader("Content-Type", "application/json");
// response.setHeader("Access-Control-Allow-Origin", "*");
// response.setHeader("Access-Control-Request-Method","*");
// response.setHeader("Access-Control")
