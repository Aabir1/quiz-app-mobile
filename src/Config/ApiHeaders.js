import configurations from "./env";

const ApiHeaders = {
    headers: {
        'application-token': configurations.APPLICATION_TOKEN
    }
}

export default ApiHeaders;