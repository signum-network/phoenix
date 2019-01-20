export function wait (ms: number = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
