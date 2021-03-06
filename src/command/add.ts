import { _, localConfigPath, urlResolve, prompt, getTemplate, showTemplate, writeTemplate, io, consoleColor } from '../lib'
/**
 * 是否操作项目自身配置
 */
let isSelf = false
export default {
    /**
     * 新增
     */
    async start(data) {
        isSelf = data.self
        await showTemplate(isSelf)
        let { templateName, gitUrl, branch, description } = await this.inputParams(data)
        let config: any = await getTemplate(isSelf)
        if (!config.template[templateName]) {
            const url = urlResolve(gitUrl)
            config.template[templateName] = { description, branch, url }
        } else {
            consoleColor.red('模板已存在!', false)
            return
        }
        await writeTemplate(config, isSelf)

        consoleColor.green('模板添加成功!')
        consoleColor.white('当前模板配置:')
        await showTemplate(isSelf)
        console.log('\n')
    },
    async inputParams({ templateName, gitUrl, branch, description }) {
        console.log(`$> init:templateName:${templateName},gitUrl:${gitUrl},branch:${branch},description:${description}`)
        !templateName && (templateName = await prompt('模板名称: '))
        if (!templateName) {
            consoleColor.red('请输入模板名称!', false)
            return await this.inputParams({ templateName, gitUrl, branch, description })
        }
        !gitUrl && (gitUrl = await prompt('Git地址: '))
        if (!gitUrl) {
            consoleColor.red('请输入Git地址 [最好是http(s)]!', false)
            return await this.inputParams({ templateName, gitUrl, branch, description })
        }
        !branch && (branch = await prompt('Git分支: '))
        if (!branch) {
            consoleColor.red('请输入分支名　比如:master', false)
            return await this.inputParams({ templateName, gitUrl, branch, description })
        }
        !description && (description = await prompt('描述: '))
        if (!description) {
            consoleColor.red('请输入模板说明，方便理解项目用途', false)
            return await this.inputParams({ templateName, gitUrl, branch, description })
        }
        console.log(`$> now:templateName:${templateName},gitUrl:${gitUrl},branch:${branch},description:${description}`)
        return { templateName, gitUrl, branch, description }
    },
    command: ['add', '添加配置', {
        self: {
            describe: '配置文件保存到项目里面,这会随着重装而消失，仅供作者使用用来发布代码',
            default: false,
            boolean: true,
            alias: ['s']
        },
        template: {
            alias: ['t', 'templateName'],
            default: '',
            string: true,
            describe: '模板'
        },
        url: {
            alias: ['u', 'gitUrl'],
            default: '',
            string: true,
            describe: 'git地址'
        },
        branch: {
            alias: ['b'],
            default: '',
            string: true,
            describe: 'git分支'
        },
        description: {
            alias: ['d'],
            default: '',
            string: true,
            describe: '模板说明'
        }
    }]
}