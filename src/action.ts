import { GridElement } from "./App";

export async function getColors() {
    try {
        return fetch('http://localhost:8000', {
            headers: {
                Accept: 'application/json',
            },
            method: 'GET',
        }).then(res => res.json());
    } catch(e) {
        console.error(e);
    }
}

export async function updateColor(data:GridElement) {
    return fetch('http://localhost:8000', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
    }).catch(e => console.error(e));
}