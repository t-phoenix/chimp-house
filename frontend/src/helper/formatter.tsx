
export function getLinkedAddress(address: string) {
    return `https://testnet.ftmscan.com/${address}`
}

export function toETHdenomination(number: number){
    return number/10**18
}

export function toWeiDenomination(number: number){
    return number*(10**18)
}