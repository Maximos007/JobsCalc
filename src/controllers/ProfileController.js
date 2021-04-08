const Profile = require('../model/Profile');

module.exports = {
	index(req, res) {
		return	res.render('profile', { profile : Profile.get() });
	},

	update(req, res) {
		// req.body para pegar os dados
		const data = req.body;

		// definir quantas semanas tem um ano :52
		const weekPerYear = 52;

		// remover as semanas de férias do ano, 
		const weekPerMonth = (weekPerYear - data['vacation-per-year']) / 12;

		// total de horas trabalhadas na semana
		const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

		// horas trabalhadas no mês
		const monthlyTotalHours = weekTotalHours * weekPerMonth;

		// qual será o valor da minha hora 
		const valueHour = data['monthly-budget'] / monthlyTotalHours;

		// Profile.data = data;
		Profile.update({
			...Profile.get(),
			...req.body,
			'value-hour': valueHour,
		});

		return res.redirect('/profile');
	}
};