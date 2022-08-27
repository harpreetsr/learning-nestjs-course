"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
const operators_1 = require("rxjs/operators");
class SerializeInterceptor {
    intercept(context, handler) {
        console.log('I am running before the handler!', context);
        return handler.handle().pipe((0, operators_1.map)((data) => {
            console.log('I am running before the response is sent out', data);
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize.interceptors.js.map