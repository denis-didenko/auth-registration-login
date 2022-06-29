module.exports = class UserDto {
	id;
	firstName;
	lastName;
	email;

	constructor(model) {
		this.id = model._id;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
		this.email = model.email;
	}
};
