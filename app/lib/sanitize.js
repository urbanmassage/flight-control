var mongoose = require('mongoose');

function sanitize(body) {
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

  if (Array.isArray(body)) return body.map(sanitize);

	return Object.keys(body).reduce(function(obj, key) {
		key = encodeURIComponent(key).replace(/\./g, '%2E');
		obj[key] = sanitize(body[key]);
		return obj;
	}, {})
}

module.exports = sanitize;
