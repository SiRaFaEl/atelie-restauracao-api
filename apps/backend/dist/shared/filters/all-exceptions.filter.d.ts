import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private extractResponse;
    catch(exception: unknown, host: ArgumentsHost): void;
}
