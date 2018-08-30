import fetch from 'isomorphic-fetch';

import config from '../config.json';

const apiUrl = config.apiUrl;

export default class ApiManager {
    static getStudents() {
        return fetch(apiUrl, { method: 'GET' })
            .then(response => response.json());
    }

    static getStudent(id) {
        return fetch(`${apiUrl}/${id}`, { method: 'GET' })
            .then(response => response.json());
    }

    static createStudent(parameters) {
        return fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json());
    }

    static deleteStudents() {
        return fetch(apiUrl, { method: 'DELETE' });
    }

    static deleteStudent(id) {
        return fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    }

    static editStudent(id, newParameters) {
        return fetch(`${apiUrl}/edit/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newParameters),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json());
    }
}
