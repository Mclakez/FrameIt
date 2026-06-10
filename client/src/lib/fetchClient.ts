export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default async function fetchWithAuth(url:string, options:RequestInit={}) {
    return fetch(`${BASE_URL}${url}`, {
        ...options,
        credentials: 'include',
    })
}