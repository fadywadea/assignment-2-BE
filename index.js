// Include necessary modules
const myHttp = require("http");

// User data in JSON format
const users = [
  { id: 1, name: "fady", email: "fady@gmail.com", age: 10 },
  { id: 2, name: "nourhan", email: "nourhan@gmail.com", age: 20 },
  { id: 3, name: "mahmoud", email: "mahmoud@gmail.com", age: 30 },
  { id: 4, name: "ahmed", email: "ahmed@gmail.com", age: 40 },
];

// Post data in JSON format
const posts = [
  { id: 1, title: "mobile", price: "1000EGP", model: "Iphone" },
  { id: 2, title: "mobile", price: "2000EGP", model: "samsung" },
  { id: 3, title: "mobile", price: "3000EGP", model: "HTC" },
  { id: 4, title: "mobile", price: "4000EGP", model: "ReadMi" },
];

// Function to handle requests and responses
const server = myHttp.createServer((req, res) => {
  // End point server running...
  if (req.url == "/" && req.method == "GET") {
    res.end(console.log("server running..."));
  }
  // End point show All users
  else if (req.url == "/users" && req.method == "GET") {
    res.end(JSON.stringify(users));
  }
  // End point Add User
  else if (req.url == "/addUser" && req.method == "POST") {
    req.on("data", (chunk) => {
      users.push(JSON.parse(chunk));
      res.end("added successfully");
    });
  }
  // End point Sort users
  else if (req.url == "/sorted-user-by-alphabetically" && req.method == "GET") {
    res.end(JSON.stringify(users.sort((a, b) => a.name.localeCompare(b.name))));
  }
  // End point Delete user
  else if (req.url == "/users" && req.method == "DELETE") {
    users.splice(0, 1);
    res.end("User has been deleted");
  }
  // End point Update user
  else if (req.url == "/user" && req.method == "PATCH") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      if (data.id) {
        const updateData = users.find((user) => user.id == data.id);
        updateData.name = data.name;
        updateData.email = data.email;
        updateData.age = data.age;
        res.end(JSON.stringify(data));
      }
    });
  }
  // End point Search user by id
  else if (req.url == "/user" && req.method == "GET") {
    let userId = "";
    req.on("data", (chunk) => {
      userId += chunk;
      // console.log(userId);
    });
    req.on("end", () => {
      const dataUser = JSON.parse(userId);
      JSON.stringify(dataUser);
      const findUser = users.find((user) => user.id == dataUser.id);
      res.end(JSON.stringify(findUser));
    });
  }
  // End point All posts
  else if (req.url == "/posts" && req.method == "GET") {
    res.end(JSON.stringify(posts));
  }
  // End point Add post
  else if (req.url == "/addPost" && req.method == "POST") {
    req.on("data", (chunk) => {
      posts.push(JSON.parse(chunk));
      res.end("added successfully");
    });
  }
  // End point Delete post
  else if (req.url == "/posts" && req.method == "DELETE") {
    posts.splice(0, 1);
    res.end("deleted successfully");
  }
  // End point Update post
  else if (req.url == "/post" && req.method == "PATCH") {
    let dataPost = "";
    req.on("data", (chunk) => {
      dataPost += chunk;
    });
    req.on("end", () => {
      const newData = JSON.parse(dataPost);
      if (newData.id) {
        const updatePost = posts.find((post) => post.id == newData.id);
        updatePost.title = newData.title;
        updatePost.price = newData.price;
        updatePost.model = newData.model;
        res.end(JSON.stringify(newData));
      }
    });
  }
  // End point search  post by id
  else if (req.url == "/post" && req.method == "GET") {
    let postID = "";
    req.on("data", (chunk) => {
      postID += chunk;
    });
    req.on("end", () => {
      const dataPost = JSON.parse(postID);
      JSON.stringify(dataPost);
      const FindPost = posts.find((post) => post.id == dataPost.id);
      res.end(JSON.stringify(FindPost));
    });
  }
  // Not found page
  else {
    res.end("404 not found page");
  }
});

server.listen(3000, () => console.log("welcome to server"));
