import { Request } from "express";

export function isIntrospectionQuery(request: Request): boolean {
    return request.body['query'].includes("query IntrospectionQuery")

}

/**
 * Copy the attributes of source object to target object. We mainly use
 * this to update the mongodb database models
 */
export function copyMatchingKeyValues(source: any, target: any) {
    return Object.keys(source).forEach(key => {
        if(source[key] !== undefined) {
            target[key] = source[key]
        }
    })
}