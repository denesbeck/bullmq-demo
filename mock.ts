import { Queue } from 'bullmq'
import redis from './lib/redis'

const REDIS = redis().getInstance()
const queue = new Queue('test-queue', { connection: REDIS })

const addJobs = async () => {
  await queue.add('job-v1', { foo: 'test-1' })
  await queue.add('job-v1', { foo: 'test-2' })
  await queue.add('job-v1', { foo: 'test-3' })
  await queue.add('job-v1', { foo: 'test-4' })
  await queue.add('job-v1', { foo: 'test-5' })
  await queue.add('job-v1', { foo: 'test-6' })
  await queue.add('job-v2', { foo: 'test-7' })
  await queue.add('job-v2', { foo: 'test-8' })
  await queue.add('job-v2', { foo: 'test-9' })
}

addJobs().then(() => {
  console.log('💨 Jobs added! Exiting...')
  process.exit(0)
})
