import * as $ from '@goscript/builtin/index.js'
import { FS } from './fs.js'

import * as io from '@goscript/io/index.js'

export type ReadFileFS =
  | null
  | ({
      // ReadFile reads the named file and returns its contents.
      // A successful call returns a nil error, not io.EOF.
      // (Because ReadFile reads the whole file, the expected EOF
      // from the final Read is not treated as an error to be reported.)
      //
      // The caller is permitted to modify the returned byte slice.
      // This method should return a copy of the underlying data.
      ReadFile(
        name: string,
      ): [$.Bytes, $.GoError] | Promise<[$.Bytes, $.GoError]>
    } & FS)

$.registerInterfaceType(
  'fs.ReadFileFS',
  null, // Zero value for interface is null
  [
    {
      name: 'ReadFile',
      args: [
        { name: 'name', type: { kind: $.TypeKind.Basic, name: 'string' } },
      ],
      returns: [
        {
          type: {
            kind: $.TypeKind.Slice,
            elemType: { kind: $.TypeKind.Basic, name: 'number' },
          },
        },
        {
          type: {
            kind: $.TypeKind.Interface,
            name: 'GoError',
            methods: [
              {
                name: 'Error',
                args: [],
                returns: [{ type: { kind: $.TypeKind.Basic, name: 'string' } }],
              },
            ],
          },
        },
      ],
    },
  ],
)

// ReadFile reads the named file from the file system fs and returns its contents.
// A successful call returns a nil error, not [io.EOF].
// (Because ReadFile reads the whole file, the expected EOF
// from the final Read is not treated as an error to be reported.)
//
// If fs implements [ReadFileFS], ReadFile calls fs.ReadFile.
// Otherwise ReadFile calls fs.Open and uses Read and Close
// on the returned [File].
export async function ReadFile(
  fsys: FS,
  name: string,
): Promise<[$.Bytes, $.GoError]> {
  {
    let { value: fsysTyped, ok: ok } = $.typeAssert<ReadFileFS>(
      fsys,
      'fs.ReadFileFS',
    )
    if (ok) {
      return await fsysTyped!.ReadFile(name)
    }
  }

  let [file, err] = await fsys!.Open(name)
  if (err != null) {
    return [null, err]
  }

  const chunks: Uint8Array[] = []
  let size = 0
  try {
    for (;;) {
      const chunk = new Uint8Array(Math.max(512, size))
      let [n, rerr] = await file!.Read(chunk)
      if (n > 0) {
        chunks.push(chunk.subarray(0, n))
        size += n
      }
      if (rerr != null) {
        if (rerr == io.EOF) {
          rerr = null
        }
        const data = new Uint8Array(size)
        let offset = 0
        for (const c of chunks) {
          data.set(c, offset)
          offset += c.length
        }
        return [data, rerr]
      }
    }
  } finally {
    await file!.Close()
  }
}
