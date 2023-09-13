import { QueueEvents } from 'bullmq'
import redis from './lib/redis'

const REDIS = redis().getInstance()

export default function EventHandler() {
  const queueEvents = new QueueEvents('test-queue', { connection: REDIS })

  queueEvents.on('added', (args) => {
    console.log(`🏄 Job ${args.jobId} added!`)
  })

  queueEvents.on('waiting', (args) => {
    console.log(`🚦 Job ${args.jobId} is waiting...`)
  })

  queueEvents.on('active', (args) => {
    console.log(`🚜 Processing job ${args.jobId}...`)
  })

  queueEvents.on('completed', (args) => {
    console.log(`✅ Job ${args.jobId} completed!`)
  })

  queueEvents.on('failed', (args) => {
    console.log(`💀 Job ${args.jobId} failed with the following error: ${args.failedReason}`)
  })
}
