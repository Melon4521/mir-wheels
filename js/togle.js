import api from '../api/DataBase.json' assert { type: 'json' };

export function BD (name) {
    return api[name]
}
