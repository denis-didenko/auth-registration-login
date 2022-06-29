module.exports = class ApiError extends Error {
	status;
	name;
	message;

	constructor(status, name, message) {
		super(message);
		this.status = status;
		this.name = name;
		this.message = message;
	}
};
