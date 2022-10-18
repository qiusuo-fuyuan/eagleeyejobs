import { gql } from "apollo-server-express";

import fs  from 'fs';
import path from 'path';

export getAbsolutePath = ()

export const gqlWrapper = (file: string) => {
    let graphqlSchema: string = fs.readFileSync(file,"utf-8");
    return gql`${graphqlSchema}`;
}