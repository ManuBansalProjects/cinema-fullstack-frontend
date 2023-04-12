interface Cinema {
    id : number,
    name: string,
    contactnumber: string,
    website: string,
    address: string,
    state: { id: number, name: string},
    city: {id: number, name: string},
    isactive: number
}

interface States{
    id: number,
    name: string,
    cities: [{ id: number, name: string }]
}

interface Cities{
    id: number,
    name: string
}

export { Cinema, States, Cities };
