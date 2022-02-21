const fs = require("fs");

const handleEndPoint = require("./handleEndPoint");
const path = require("path");
// This Function To handle file Read , Used into ./src/router.js

const fileRead = (response, url) => {
	const filePath = path.join(__dirname, "..", url);
	const extension = path.extname(filePath);

	const contentType = {
		".js": "text/javascript",
		".css": "text/css",
		".html": "text/html",
		".jpg": "text/jpg",
		".png": "text/png",
		".json": "application/json",
	};

	fs.readFile(filePath, (error, file) => {
		if (error) {
			handleEndPoint(
				response,
				500,
				`<h1>${error}</h1>`,
				contentType[extension],
			);
		} else {
			handleEndPoint(response, 200, file, contentType[extension]);
		}
	});
};

const fileReadAndWrite = (response, convertedData, url) => {
	const filePath = path.join(__dirname, url);
	const extension = path.extname(filePath);

	const contentType = {
		".js": "text/javascript",
		".css": "text/css",
		".html": "text/html",
		".jpg": "text/jpg",
		".png": "text/png",
		".json": "application/json",
	};

	fs.readFile(filePath, (error, file) => {
		if (error) {
			handleEndPoint(
				response,
				500,
				`<h1>${error}</h1>`,
				contentType[extension],
			);
		} else {
			const object = JSON.parse(file);
			object[Date.now()] = convertedData;

			writeFile(
				response,
				filePath,
				JSON.stringify(object),
				contentType[extension],
			);

			response.writeHead(302, { Location: "/" });
			response.end();
		}
	});
};

const writeFile = (response, filePath, object, contentType) => {
	fs.writeFile(filePath, object, (error) => {
		if (error) {
			handleEndPoint(response, 500, `<h1>${error}</h1>`, contentType);
		}
	});
};

module.exports = { fileRead, writeFile, fileReadAndWrite };
