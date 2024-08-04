import { api } from "../utility/requester.js"

const endpoints = {
    baseCatalog: 'http://localhost:3030/data/catalog',
    baseDetails: 'http://localhost:3030/data/catalog/',
    myFurniture: (id) => `http://localhost:3030/data/catalog?where=_ownerId%3D%22${id}%22`
}

async function createFurniture(data) {
    return await api.post(endpoints.baseCatalog, data)
}

async function getAllFurniture() {
    return await api.get(endpoints.baseCatalog)
}

async function getDetailsFurniture(id) {
    return await api.get(endpoints.baseDetails + id)
}

async function updateFurniture(id, data) {
    return await api.put(endpoints.baseDetails + id, data)
}

async function delFurniture(id) {
    return await api.del(endpoints.baseDetails + id)
}

async function getMyFurniture(userId) {
    return await api.get(endpoints.myFurniture(userId))
}

export const dataService = { createFurniture, getAllFurniture, getDetailsFurniture, updateFurniture, delFurniture, getMyFurniture };