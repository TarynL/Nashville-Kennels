const remoteURL = "http://localhost:5002"

export const getAllEmployees = () => {
    return fetch (`${remoteURL}/employees`)
    .then(result => result.json())
}