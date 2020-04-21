/**
 * This submodule describes the Factory Methods
 * of the API. You almost will like to use [[composeApi]]
 * rather than using the Factory Methods itself
 *
 * The factory methods are higher-order functions which
 * receives a [[BurstService]] instance in first order, and
 * the payload in second order.
 *
 * `factoryMethod(burstServiceInstance)(methodArgs)`
 *
 * The factory methods are used [[ApiComposer]] and [[composeApi]]
 *
 * @moduledefinition core.api.factories
 *
 * */

export * from './account';
export * from './alias';
export * from './asset';
export * from './block';
export * from './contract';
export * from './network';
export * from './message';
export * from './transaction';
