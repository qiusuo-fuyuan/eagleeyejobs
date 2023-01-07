import { ElasticClient } from "../search/es/ElasticClient.js";
import { Client } from '@elastic/elasticsearch'
import logger from "../utils/Logger.js";

export class BaseElasticRepository<T> {
    private elasticClient: Client = ElasticClient.getClient()

    public async search(index: string, queryBody: any): Promise<Array<T>> {
        let response = await this.elasticClient.search<SearchResponse<T>>({
            index: index,
            body: queryBody
        })
        // response body here is `SearchResponse<T>`
        logger.info("es search response hits:", response.body.hits.hits)
        return response.body.hits.hits.map(hit => hit._source);
        // todo
        // return response.body.hits.hits.map(hit => {
        //     hit._source["_id"] = hit["_id"];
        //     return hit._source;
        // })
    }
}


interface ShardsResponse {
    total: number;
    successful: number;
    failed: number;
    skipped: number;
}

interface Explanation {
    value: number;
    description: string;
    details: Explanation[];
}

interface SearchResponse<T> {
    took: number;
    timed_out: boolean;
    _scroll_id?: string;
    _shards: ShardsResponse;
    hits: {
        total: number;
        max_score: number;
        hits: Array<{
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
            _version?: number;
            _explanation?: Explanation;
            fields?: any;
            highlight?: any;
            inner_hits?: any;
            matched_queries?: string[];
            sort?: string[];
        }>;
    };
    aggregations?: any;
}


