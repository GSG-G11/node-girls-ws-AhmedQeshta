// This Function To handle the request , Used into ./src/fileReader.js
//  and Used into ./src/router.js

const handleEndPoint = (response, statusCode, message, contentType) => {
	response.writeHead(statusCode, { "Content-Type": contentType });
	response.end(message);
};

module.exports = handleEndPoint;
