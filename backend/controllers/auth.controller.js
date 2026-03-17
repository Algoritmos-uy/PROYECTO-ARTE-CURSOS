// Controlador básico de autenticación
const login = (req, res) => {
	res.status(200).json({ message: 'Login endpoint stub' });
};

const register = (req, res) => {
	res.status(200).json({ message: 'Register endpoint stub' });
};

module.exports = {
	login,
	register
};
