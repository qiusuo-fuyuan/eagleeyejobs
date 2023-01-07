import { Client } from '@elastic/elasticsearch'
import util  from 'util'
import logger from '../../utils/Logger.js';

export class ElasticClient {
    private static client: Client

    public static getClient() {
        if (this.client != null) {
            return this.client;
        }
        return this.init()
    }

    public static init() : Client {
        if (this.client != null) {
            return this.client;
        }
        const host = process.env.ES_HOST
        const port = process.env.ES_PORT
        const username = process.env.ES_USERNAME
        const password = process.env.ES_PASSWORD
        const db = process.env.MONGO_DATABASE

        logger.info("Start ElasticSearch Client:" + host + ":" + port + " index:" + db)
        
        this.client = new Client({
            node: util.format('%s:%d', host, port),
            auth: {
                username: username,
                password: password
            }
        })
        return this.client
    }

}


