import { Kernel } from '@jupyterlab/services';

export type IDisposable = {
    dispose: () => void;
};

/**
 * Minko Gechev
 * In TypeScript, you can use Readonly<T> to prevent the reassignment of properties of an object. Using conditional types, you can implement your own DeepReadonly<T> with the snippet below!
 */
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type DeepReadonly<T> = T extends (infer R)[]
    ? DeepReadonlyArray<R>
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends Function
    ? T
    : // eslint-disable-next-line @typescript-eslint/ban-types
    T extends object
    ? DeepReadonlyObject<T>
    : T;

export type ReadWrite<T> = {
    -readonly [P in keyof T]: T[P];
};


export type Variable = {
    varName: string;
    varType: 'int';
    varSize: string;
    varShape: string;
    varContent: string;
    isMatrix: boolean;
    isWidget: boolean;
};
export type IKernel = Pick<
    Kernel.IKernel,
    'isReady' | 'ready' | 'requestExecute' | 'iopubMessage' | 'status' | 'statusChanged'
>;

