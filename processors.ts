export const testV1Processor = async () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({ ok: true })
    }, 5000)
  })
}

export const testV2Processor = async () => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject({ ok: false })
    }, 5000)
  })
}
