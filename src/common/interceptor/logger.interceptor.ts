import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import moment from "moment";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor{

    private readonly logger = new Logger(LoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const start = moment().format('YYYY-MM-DD HH:mm:ss.SSS');

        this.logger.log(`[${start}] | Request: ${request.method} ${request.originalUrl} | ${JSON.stringify(request.body)}`);

        return next.handle().pipe(
            tap(() => {
                const end = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                this.logger.log(`[${end}] | Response: ${response.statusCode} | ${JSON.stringify(response.body)}`);
            })
        );
    }
}


