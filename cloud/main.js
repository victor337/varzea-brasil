
Parse.Cloud.define("login", async (request) => {
	if (request.params.email == null || request.params.password == null) {
		throw 'Parametros inválido';
	}

	const user = new Parse.User();

	user.set('username', request.params.email);
	user.set('password', request.params.password);


	var savedUser = await user.logIn(user.username, user.password);

	savedUser = savedUser.toJSON();
	return {
		"name": savedUser.name,
		"email": savedUser.email,
		"token": savedUser.sessionToken
	}
});


Parse.Cloud.define("signup", async (request) => {
	if (request.params.email == null ||
		request.params.password == null ||
		request.params.name == null) {
		throw 'Parametros inválido';
	}

	const user = new Parse.User();

	user.set('username', request.params.email);
	user.set('password', request.params.password);
	user.set('email', request.params.email);
	user.set('name', request.params.name);


	let savedUser = await user.signUp(null, { useMasterKey: true });

	savedUser.toJSON();
	return {
		"name": savedUser.name,
		"email": savedUser.email,
		"token": savedUser.sessionToken
	}
});
