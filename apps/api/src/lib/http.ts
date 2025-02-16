import { Response } from "express";
export const httpStatuses = {
    BAD_REQUEST: {
        statusCode: 400,
        error: "Bad Request",
    },
} as const;

type HttpStatus = keyof typeof httpStatuses;

export function sendError(
    res: Response,
    httpStatus: HttpStatus,
    message: string = "Error"
) {
    const statusData = httpStatuses[httpStatus];
    return res.status(statusData.statusCode).json({
        ...statusData,
        message,
    });
}
