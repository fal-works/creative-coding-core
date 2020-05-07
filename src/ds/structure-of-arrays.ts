export type Data<T> = {
  readonly [K in keyof T]: T[K][];
};

export interface Unit<T> {
  readonly data: Data<T>;
  readonly length: number;
}

export const from = <T>(prototypeStructure: T, length: number): Unit<T> => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const data: any = {};
  for (const key of Object.keys(prototypeStructure))
    data[key] = new Array<typeof key>(length).fill(
      (prototypeStructure as any)[key]
    );
  /* eslint-enable */

  return {
    data,
    length,
  };
};
