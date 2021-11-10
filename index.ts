import { promisify } from './utils/promisify.js'
import * as childProcess from 'node:child_process'

const execFile = promisify(childProcess.execFile)

export default async function getRemoteGitTags(repoUrl: string) {
  const { stdout }: any = await execFile('git', ['ls-remote', '--tags', repoUrl])
  const tags = new Map()
  console.log(stdout)
  if (stdout instanceof String) {
    for (const line of stdout.trim().split('\n') as string[]) {
      const [hash, tagReference] = line.split('\t')

      const tagName = tagReference.replace(/^refs\/tags\//, '').replace(/\^{}$/, '')

      tags.set(tagName, hash)
    }
  } else {
    tags.set('err', stdout)
  }

  return tags
}

console.log(getRemoteGitTags('https://github.com/Pineapple0919/study-every-day.git'))