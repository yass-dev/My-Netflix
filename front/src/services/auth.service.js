import axios from 'axios'
import AccountStore from '../store/account';

const API_URL = "http://localhost:3000"

function authHeader()
{
	let token = window.localStorage.getItem("access_token");
	return { 'Authorization': 'Bearer ' +  token};
}

export function sign_up(email, password)
{
	return new Promise((resolve, reject) =>
	{
		axios.post(API_URL + '/auth/sign_up', {email: email, password: password})
		.then(res => resolve(res.data))
		.catch(err => reject(err));
	});
}

export async function sign_in(email, password)
{
	return new Promise((resolve, reject) =>
	{
		axios.post(API_URL + '/auth/sign_in', {username: email, password: password})
		.then(res => resolve(res.data))
		.catch(err => reject(err));
	});
}

export async function loadAccount()
{
	return new Promise((resolve, reject) =>
	{
		axios.get(API_URL + '/account', { headers: authHeader() })
		.then(res => resolve(res.data))
		.catch(err => reject(err));
	});
}

export async function active_interceptors()
{
	axios.interceptors.request.use(request =>
	{
		if (request.url.startsWith(API_URL)
			&& AccountStore.state.id != null)
		{
			request.headers.common.Authorization = 'Bearer ' + window.localStorage.getItem("access_token");
		}
	});
}