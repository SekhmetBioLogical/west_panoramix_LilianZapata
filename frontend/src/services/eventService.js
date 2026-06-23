const BASE_URL = 'http://localhost:5000';

export const getEventos = async () => {
    const res = await fetch(`${BASE_URL}/api/eventos`);
    return { ok: res.ok, data: await res.json() };
};

export const registrarEvento = async (data) => {
    const res = await fetch(`${BASE_URL}/api/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return { ok: res.ok, data: await res.json() };
};