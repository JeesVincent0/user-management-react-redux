export class AppError extends Error {
    private statusCode: number;

    constructor(message: string, statusCode: 400) {
        super(message);
        this.statusCode = statusCode;
    }
};