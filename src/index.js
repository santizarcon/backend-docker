import app from "./app.js";

app.listen(app.get("port"), () => {
  console.log("BACKEND Server in the port: ", app.get("port"));
});
