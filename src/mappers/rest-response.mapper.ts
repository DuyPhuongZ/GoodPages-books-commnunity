import { RestResponseDTO } from "../responseDtos/rest-response.dto"
import { RestResponse } from "../type";

const responseMapper = (
    {
        statusCode,
        isSuccess,
        message,
        data,
        error
    }: RestResponse
) => {
    return new RestResponseDTO({
        statusCode,
        isSuccess,
        message,
        data,
        error
    });
}

export {
    responseMapper
}