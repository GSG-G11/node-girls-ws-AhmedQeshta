const path = require("path");
const querystring = require("querystring");
const { fileRead, fileReadAndWrite } = require("./fileRead");
const handleEndPoint = require("./handleEndPoint");

// This Function To handle the router , Used into ./src/server.js
const router = (request, response) => {
	const endpoint = request.url;
	const method = request.method;

	switch (endpoint) {
		case "/":
			fileRead(response, "public/index.html");
			break;

		case "/public/main.css":
			fileRead(response, endpoint);
			break;

		case "/public/img/image.jpg":
		case "/public/img/image.jpg":
		case "/public/img/logo1.png":
		case "/public/img/logo2.png":
		case "/public/script.js":
			fileRead(response, endpoint);
			break;

		case "/posts":
			fileRead(response, "src/posts.json");
			break;

		case "/create-post":
			if (method === "POST") {
				let allTheData = "";
				request.on("data", (chunkOfData) => {
					allTheData += chunkOfData;
				});

				request.on("end", () => {
					const convertedData = querystring.parse(allTheData);

					fileReadAndWrite(
						response,
						convertedData.post,
						"posts.json",
					);
				});
			} else {
				handleEndPoint(
					response,
					404,
					`<h1>Page Not Found!   <code> &#188; </code> </h1>`,
					"text/html",
				);
			}
			break;

		case "/node":
			handleEndPoint(
				response,
				200,
				`<h1>node: I am so happy to be part of the Node Girls workshop!</h1>`,
				"text/html",
			);
			break;

		case "/girls":
			handleEndPoint(
				response,
				200,
				`<h1>girls: I am so happy to be part of the Node Girls workshop!</h1>`,
				"text/html",
			);
			break;

		default:
			handleEndPoint(
				response,
				404,
				`<h1>Page Not Found!   <code> &#188; </code> </h1>`,
				"text/html",
			);
			break;
	}
};

module.exports = router;
