const remoteURL = "http://localhost:5002"

export const getAllCustomers = () => {
    return fetch (`${remoteURL}/customers`)
    .then(result => result.json())
}