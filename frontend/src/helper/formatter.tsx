
export function getLinkedAddress(address: string) {
    return `https://mumbai.polygonscan.com/address/${address}`
}

export function toETHdenomination(number: number){
    return number/10**18
}

export function toWeiDenomination(number: number){
    return number*(10**18)
}