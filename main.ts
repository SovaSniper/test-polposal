import * as dotenv from 'dotenv';

import {
    getClient,
    isCorrectAddress,
    isSufficient
} from './lib/utils';
import { openCampusCodex } from './lib/chains/open-campus-codex';

dotenv.config();
const chain = openCampusCodex.id;

const hash = process.argv[2] as `0x${string}`;
// const hash = '0x262ec99b269235fbae0450aab044d57caec49e1714c42e903031faafe49b2aa6';
console.log("Hash: ", hash);

(async () => {
    try {
        const client = getClient(chain);

        const chainId = await client.getChainId();
        console.log("Chain: ", chainId);

        const transaction = await client.getTransaction({ hash });
        console.log("Block Number: ", transaction.blockNumber);

        if (!isSufficient(transaction)) {
            console.error("Invalid staking amount");
            process.exit(1); // Exit with code 1 to indicate failure
        }

        if (!isCorrectAddress(transaction, chainId.toString())) {
            console.error("Invalid staking address");
            process.exit(1); // Exit with code 1 to indicate failure
        }

        // If all validations pass
        console.log("Validation successful!");
        process.exit(0); // Exit with code 0 to indicate success

    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1); // Exit with code 1 to indicate failure
    }
})()