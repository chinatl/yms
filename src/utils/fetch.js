import request from './request'
import qs from 'qs';
import config from '@/config'
export function get(url, data) {
	if (!url.includes('http')) {
		url = config + url
	}
	return request({
		url: url,
		method: 'get',
		params: data
	})
};
export function post(url, data, type) {
	var content_type;
	if (type === 'json') {
		content_type = 'application/json;charset=UTF-8';
		data = JSON.stringify(data)
	} else if (type === 'form') {
		content_type = '';
	}
	else {
		content_type = 'application/x-www-form-urlencoded;charset=utf-8';
		data = qs.stringify(data);
	}
	return request.post(config + url, data, {
		headers: {
			'Content-Type': content_type
		}
	})
}
export function update(url, data) {
	return request.update(config + url, data)
}
export function deleteItem(url, data) {
	return request.delete(config + url, data)
}
export function options(url, data) {
	return request.options(config + url)
}