const express = require('express');
const routes = express.Router();

// const basePath = __dirname + '/views';
const views = __dirname + '/views/';

const profile = {
	name: 'Wasley',
	avatar: 'https://avatars.githubusercontent.com/u/18080063?v=4',
	'monthly-budget': 3000,
	'days-per-week': 5,
	'hours-per-day': 5,
	'vacation-per-year': 4,
	'value-hour': 75
};

const Job = {
	data: [
		{
			id: 1,
			name: 'Pizzaria Guloso', 
			'daily-hours': 2, 
			'total-hours': 1,
			createdAt: Date.now(),// atribuindo uma nova data
	
		},
		{
			id: 1,
			name: 'OneTwo Project', 
			'daily-hours': 3, 
			'total-hours': 47,
			createdAt: Date.now(), // atribuindo uma nova data
		}
	],

	controllers: {
		index(req, res) {
			const updatedJobs = Job.data.map((job) => {
				// Ajustes no job
				const remaining = Job.services.remainingDays(job);
				const status = remaining <=0 ? 'done' : 'in progress';
			
				return {
					...job,
					remaining,
					status,
					budget: profile['value-hour'] * job['total-hours']
				};
			});
			
			return res.render(views + 'index', { jobs : updatedJobs });
		},

		create(req, res) {
			return res.render(views + 'job');
		},

		save(req, res) {
			// req.body = { name: 'nodeJS', 'daily-hours': '3.1', 'total-hours': '3'}
			const lastId = Job.data[Job.data.length - 1]?.id || 1;

			jobs.push({
				id: lastId + 1,
				name: req.body.name, 
				'daily-hours': req.body['daily-hours'], 
				'total-hours': req.body['total-hours'],
				createdAt: Date.now() // atribuindo uma nova data 
			});
			return res.redirect('/');
		}
	},

	services: {
		remainingDays(job) {
			const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed();
		
			const createDate = new Date(job.createdAt);
			const dueDay = createDate.getDate() + Number(remainingDays);
			const  dueDateInMs = createDate.setDate(dueDay);
		
			const timeDiffInMs = dueDateInMs - Date.now();
			// Transformar milli em dias 
			const dayInMs = 1000 * 60 * 60 * 24;
			const dayDiff = Math.floor(timeDiffInMs / dayInMs);
		
			//restam x dias 
			return dayDiff;
		}
	}
};

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save); // rota do formulário 
routes.get('/job/edit', (req, res) => res.render(views + 'job-edit'));
routes.get('/profile', (req, res) => res.render(views + 'profile', { profile}));


module.exports = routes;