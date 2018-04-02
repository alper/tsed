import {Store} from "@tsed/core";
import {SocketProviderTypes} from "../interfaces/ISocketProviderMetadata";
import {registerSocketService} from "../registries/SocketServiceRegistry";

/**
 * The decorators `@SocketService()` declare a new socket service (and service) can be injected in other service or controller on there `constructor`.
 * All services annotated with `@SocketService()` are constructed one time.
 *
 * > `@SocketService()` use the `reflect-metadata` to collect and inject service on controllers or other services.
 *
 * @param {string} namespace
 * @returns {Function}
 * @decorator
 */
export function SocketService(namespace = "/") {
    return Store.decorate((store: Store, parameters) => {
        store.merge("socketIO", {namespace, type: SocketProviderTypes.SERVICE});

        registerSocketService(parameters[0]);
    });
}