import { Request } from "express";

export function isIntrospectionQuery(request: Request): boolean {
    return request.body['query'].includes("query IntrospectionQuery")

}