import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import * as moment from 'moment';
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{

    private readonly logger = new Logger(LoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const startTime = moment().format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`[${startTime}] | Request: ${request.method} ${request.originalUrl} | Body: ${JSON.stringify(request.body)}`);

        return next.handle().pipe(
            tap(() => {
                const endTime = moment().format('YYYY-MM-DD HH:mm:ss');
                this.logger.log(`[${endTime}] | Response: ${response.statusCode} | Body: ${JSON.stringify(response.body)}`);
            })
        );
    }
}


