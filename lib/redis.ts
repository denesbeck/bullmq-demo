import IORedis, { Redis } from 'ioredis'

export default function redis() {
  let instance: Redis | null = null

  function createNewInstance() {
    return new IORedis('redis://localhost:6379', {
      maxRetriesPerRequest: null,
    })
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createNewInstance()
      }
      return instance
    },
  }
}
