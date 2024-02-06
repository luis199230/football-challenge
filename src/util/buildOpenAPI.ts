import * as path from "path";

import { HttpClient, generate } from "openapi-typescript-codegen";

(async () => {
    await generate({
        input: path.resolve('openapi.json'),
        output: path.resolve('src/generated/openAPI'),
        httpClient: HttpClient.AXIOS,
        useOptions: true,
        useUnionTypes: false,
    });

    console.log(`✔ Finished build service`);
})();
