import { Job, Worker } from 'bullmq'
import { testV1Processor, testV2Processor } from './processors'
import redis from './lib/redis'

const REDIS = redis().getInstance()
const CONCURRENCY = parseInt(process.env.CONCURRENCY) || 3

export default function WorkerNode() {
  console.log(`🚀 Starting worker with concurrency ${CONCURRENCY}...`)

  const worker: Worker = new Worker(
    'test-queue',
    async (job: Job) => {
      switch (job.name) {
        case 'job-v1':
          await testV1Processor()
          break
        case 'job-v2':
          await testV2Processor()
          break
        default:
          break
      }
    },
    {
      connection: REDIS,
      concurrency: CONCURRENCY,
      removeOnComplete: {
        age: 3600,
        count: 100,
      },
      removeOnFail: {
        age: 3600,
        count: 100,
      },
    }
  )

  worker.on('error', (error: Error) => {
    console.error(error)
  })
}
