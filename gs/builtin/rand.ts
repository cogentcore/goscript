// ChaCha8 generator (https://c2sp.org/chacha8rand) in 32-bit arithmetic, for
// the runtime's random numbers and for internal/chacha8rand.

// chacha8Block computes four interlaced ChaCha8 blocks for seed (eight
// little-endian uint32 key words) and the block counter, and stores them in
// out, 64 uint32 words that read as Go's 32 uint64 outputs on a
// little-endian view: word 4*j+i is word j of block i, so the uint64 at
// index 2*j+m pairs words 4*j+2*m (low) and 4*j+2*m+1 (high).
export function chacha8Block(
  seed: Uint32Array,
  counter: number,
  out: Uint32Array,
): void {
  // Each block starts from the constants, the key and its counter, runs
  // four double rounds, and adds the key back to words 4 to 11.
  for (let i = 0; i < 4; i++) {
    chacha8Column(seed, (counter + i) | 0, out, i)
  }
}

// chacha8Column computes block i of chacha8Block into column i of out.
function chacha8Column(
  seed: Uint32Array,
  counter: number,
  out: Uint32Array,
  i: number,
): void {
  // The state rows: "expand 32-byte k", the key, the counter, zeros.
  let x0 = 0x61707865
  let x1 = 0x3320646e
  let x2 = 0x79622d32
  let x3 = 0x6b206574
  let x4 = seed[0] | 0
  let x5 = seed[1] | 0
  let x6 = seed[2] | 0
  let x7 = seed[3] | 0

  // The rest of the key, the counter and the zero words.
  let x8 = seed[4] | 0
  let x9 = seed[5] | 0
  let x10 = seed[6] | 0
  let x11 = seed[7] | 0
  let x12 = counter
  let x13 = 0
  let x14 = 0
  let x15 = 0

  // Eight rounds are four double rounds of a column and a diagonal round,
  // each of four quarter rounds.
  for (let round = 0; round < 4; round++) {
    // Column quarter round on words 0, 4, 8, 12.
    x0 = (x0 + x4) | 0
    x12 = rotl(x12 ^ x0, 16)
    x8 = (x8 + x12) | 0
    x4 = rotl(x4 ^ x8, 12)
    x0 = (x0 + x4) | 0
    x12 = rotl(x12 ^ x0, 8)
    x8 = (x8 + x12) | 0
    x4 = rotl(x4 ^ x8, 7)

    // Column quarter round on words 1, 5, 9, 13.
    x1 = (x1 + x5) | 0
    x13 = rotl(x13 ^ x1, 16)
    x9 = (x9 + x13) | 0
    x5 = rotl(x5 ^ x9, 12)
    x1 = (x1 + x5) | 0
    x13 = rotl(x13 ^ x1, 8)
    x9 = (x9 + x13) | 0
    x5 = rotl(x5 ^ x9, 7)

    // Column quarter round on words 2, 6, 10, 14.
    x2 = (x2 + x6) | 0
    x14 = rotl(x14 ^ x2, 16)
    x10 = (x10 + x14) | 0
    x6 = rotl(x6 ^ x10, 12)
    x2 = (x2 + x6) | 0
    x14 = rotl(x14 ^ x2, 8)
    x10 = (x10 + x14) | 0
    x6 = rotl(x6 ^ x10, 7)

    // Column quarter round on words 3, 7, 11, 15.
    x3 = (x3 + x7) | 0
    x15 = rotl(x15 ^ x3, 16)
    x11 = (x11 + x15) | 0
    x7 = rotl(x7 ^ x11, 12)
    x3 = (x3 + x7) | 0
    x15 = rotl(x15 ^ x3, 8)
    x11 = (x11 + x15) | 0
    x7 = rotl(x7 ^ x11, 7)

    // Diagonal quarter round on words 0, 5, 10, 15.
    x0 = (x0 + x5) | 0
    x15 = rotl(x15 ^ x0, 16)
    x10 = (x10 + x15) | 0
    x5 = rotl(x5 ^ x10, 12)
    x0 = (x0 + x5) | 0
    x15 = rotl(x15 ^ x0, 8)
    x10 = (x10 + x15) | 0
    x5 = rotl(x5 ^ x10, 7)

    // Diagonal quarter round on words 1, 6, 11, 12.
    x1 = (x1 + x6) | 0
    x12 = rotl(x12 ^ x1, 16)
    x11 = (x11 + x12) | 0
    x6 = rotl(x6 ^ x11, 12)
    x1 = (x1 + x6) | 0
    x12 = rotl(x12 ^ x1, 8)
    x11 = (x11 + x12) | 0
    x6 = rotl(x6 ^ x11, 7)

    // Diagonal quarter round on words 2, 7, 8, 13.
    x2 = (x2 + x7) | 0
    x13 = rotl(x13 ^ x2, 16)
    x8 = (x8 + x13) | 0
    x7 = rotl(x7 ^ x8, 12)
    x2 = (x2 + x7) | 0
    x13 = rotl(x13 ^ x2, 8)
    x8 = (x8 + x13) | 0
    x7 = rotl(x7 ^ x8, 7)

    // Diagonal quarter round on words 3, 4, 9, 14.
    x3 = (x3 + x4) | 0
    x14 = rotl(x14 ^ x3, 16)
    x9 = (x9 + x14) | 0
    x4 = rotl(x4 ^ x9, 12)
    x3 = (x3 + x4) | 0
    x14 = rotl(x14 ^ x3, 8)
    x9 = (x9 + x14) | 0
    x4 = rotl(x4 ^ x9, 7)
  }

  // Words 0 to 3 carry no entropy and are stored as they are.
  out[i] = x0
  out[4 + i] = x1
  out[8 + i] = x2
  out[12 + i] = x3

  // Words 4 to 11 get the key added back, so that the block cannot be
  // inverted to the key.
  out[16 + i] = x4 + seed[0]
  out[20 + i] = x5 + seed[1]
  out[24 + i] = x6 + seed[2]
  out[28 + i] = x7 + seed[3]
  out[32 + i] = x8 + seed[4]
  out[36 + i] = x9 + seed[5]
  out[40 + i] = x10 + seed[6]
  out[44 + i] = x11 + seed[7]

  // Words 12 to 15 are stored as they are, like words 0 to 3.
  out[48 + i] = x12
  out[52 + i] = x13
  out[56 + i] = x14
  out[60 + i] = x15
}

// rotl rotates the 32 bits of x left by n.
function rotl(x: number, n: number): number {
  return (x << n) | (x >>> (32 - n))
}

// The runtime generator follows internal/chacha8rand: it uses 32 uint64s per
// block, reseeds every four blocks from the last four uint64s of the fourth,
// which it does not hand out, and starts from 32 random bytes.
const runtimeSeed = new Uint32Array(8)
const runtimeBuffer = new ArrayBuffer(256)
const runtimeWords = new Uint32Array(runtimeBuffer)
const runtimeWide = new BigUint64Array(runtimeBuffer)

// runtimeNext is the next unused word of runtimeWords, runtimeLimit the end
// of the usable words (0 before the first block), and runtimeCounter the
// counter of the current block.
let runtimeNext = 0
let runtimeLimit = 0
let runtimeCounter = 0

// runtimeRefill computes the next block of the runtime generator, seeding it
// from the host's random source on first use.
function runtimeRefill(): void {
  // The first block uses a random key; later ones advance the counter and
  // take a new key from the unused words of every fourth block.
  if (runtimeLimit === 0) {
    globalThis.crypto.getRandomValues(runtimeSeed)
    runtimeCounter = 0
  } else {
    runtimeCounter += 4
    if (runtimeCounter === 16) {
      runtimeSeed.set(runtimeWords.subarray(56, 64))
      runtimeCounter = 0
    }
  }

  // Compute the block; the fourth block keeps its last four uint64s for
  // the next key.
  chacha8Block(runtimeSeed, runtimeCounter, runtimeWords)
  runtimeNext = 0
  runtimeLimit = runtimeCounter === 12 ? 56 : 64
}

// runtimeRand returns 64 random bits, as Go's runtime.rand does for the
// global sources of math/rand and math/rand/v2 and for hash/maphash seeds.
export function runtimeRand(): bigint {
  // A uint64 is two aligned words, so an odd position after
  // runtimeRandUint32 skips a word.
  let next = (runtimeNext + 1) & ~1
  if (next >= runtimeLimit) {
    runtimeRefill()
    next = 0
  }
  runtimeNext = next + 2
  return runtimeWide[next >> 1]
}

// runtimeRandUint32 returns 32 random bits of the generator of runtimeRand,
// for overrides that build their values from 32-bit words.
export function runtimeRandUint32(): number {
  // Refill when the words of the block are used up.
  if (runtimeNext >= runtimeLimit) {
    runtimeRefill()
  }
  return runtimeWords[runtimeNext++]
}
