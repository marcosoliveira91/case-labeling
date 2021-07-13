import { IocContainer } from '../ioc/container';
import dependencies from '../ioc/dependencies';

export class DI {
  static bootstrap(container: IocContainer): void {
    container.bindDependencies(dependencies);
  }
}
