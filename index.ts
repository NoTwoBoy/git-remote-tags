import { promisify } from 'node:util'
import * as childProcess from 'node:child_process'

const execFile = promisify(childProcess.execFile)

export default async function getRemoteGitTags(repoUrl: string) {
  const { stdout }: any = await execFile('git', ['ls-remote', '--tags', repoUrl])
  const tags = new Map()

  for (const line of stdout.trim().split('\n') as string[]) {
    const [hash, tagReference] = line.split('\t')

    const tagName = tagReference.replace(/^refs\/tags\//, '').replace(/\^{}$/, '')

    tags.set(tagName, hash)
  }

  return tags
}

console.log(await getRemoteGitTags('https://gitee.com/devui/vue-devui.git'))
// getRemoteGitTags('https://gitee.com/devui/vue-devui.git')