var mongoose = require('mongoose');
var util = require('util');

function desanitize(body) {
	if (
    typeof body !== 'object' ||
    !body ||
    body instanceof Date
  ) {
		return body;
	}

  if (body instanceof mongoose.Types.ObjectId) {
    return '' + body;
  }

  if (body.toObject) {
		body = body.toObject();
	}

  if (Array.isArray(body)) return body.map(desanitize);

	return Object.keys(body).reduce(function(obj, key) {
		key = decodeURIComponent(key);
		obj[key] = desanitize(body[key]);
		return obj;
	}, {})
}

module.exports = desanitize;
