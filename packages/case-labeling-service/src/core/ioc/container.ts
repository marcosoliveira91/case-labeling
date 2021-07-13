import { Container, decorate, inject, injectable } from 'inversify';
import { ClassDependencies, Newable } from './types/index';

export class IocContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
  }

  get<T>(cls: { new(...args: any[]): T }): T {
    return this.container.get<T>(cls);
  }

  bindClass(clss: [string, Newable] | Newable): void {
    if (!Array.isArray(clss)) {
      decorate(injectable(), clss);
      this.container.bind(clss).to(clss);
      return;
    }

    const [intf, impl] = clss;

    decorate(injectable(), impl);
    this.container.bind(intf).to(impl);
  }

  bindDependencies(dependencies: ClassDependencies[]): void {
    dependencies.forEach(item => {
      if ('clss' in item) {
        const { clss, dependencies: deps } = item;

        this.bindClass(clss);
        this.bindClassDependencies(clss, deps);
      }
      else {
        const { constant } = item;

        this.bindConstant(constant);
      }
    });
  }

  private bindClassDependencies(clss: [string, Newable] | Newable, clssDependencies?: string[]): void {
    const target = Array.isArray(clss) ? clss[1] : clss;

    clssDependencies?.forEach((dependency, index) => {
      decorate(inject(dependency) as globalThis.ParameterDecorator, target, index);
    });
  }

  private bindConstant([intf, impl]: [string, any]): void {
    this.container.bind(intf).toConstantValue(impl);
  }
}
