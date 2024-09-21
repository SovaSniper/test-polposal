import { createPublicClient, http, parseEther, Transaction } from "viem";
import { openCampusCodex } from "./chains/open-campus-codex";
import { getChains } from "./chains";

/**
 * Required staking amount is 10 native token
 */
export const STAKING_AMOUNT = parseEther('10')

/**
 * This check if the staking amount is correct
 * @param hash 
 * @returns 
 */
export const isSufficient = (hash: Transaction) =>
    hash.value === STAKING_AMOUNT

/**
 * Staking address
 */
export const STAKING_ADDRESS = (chainId: string) => {
    switch (chainId) {
        case openCampusCodex.id.toString():
            return "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54"
        default:
            return ""
    }
}

/**
 * This checks if the payload staking amount is sent to correct reciepient
 * @param hash 
 * @param chainId 
 * @returns 
 */
export const isCorrectAddress = (hash: Transaction, chainId: string) =>
    hash.to === STAKING_ADDRESS(chainId)


/**
 * Get client for rpc
 * @param testnet 
 * @returns 
 */
export const getClient = (chainId: number = openCampusCodex.id) => {
    const chain = getChains(chainId)
    return createPublicClient({
        chain,
        transport: http(chain.rpcUrls[0])
    })
}