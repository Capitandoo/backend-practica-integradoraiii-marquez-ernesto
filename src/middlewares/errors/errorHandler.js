import { createResponse } from "../../utils/utils.js";
import { HttpResponse } from "../../utils/http.response.js";
import { logger } from "../../utils/logger.js";

const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    logger.error( `error ${error.message}`)
    return httpResponse.NotFound(res, error.message);
    /*const status = error.status || 400
    createResponse(res, status, error.message)*/
}
