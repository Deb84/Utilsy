import { add, exists } from '../services/slashCmdDeclaration/index.ts'
import { getCmdFsUtils } from '../utils/fsUtils/CommandsFsUtils.ts'


export default async () => {
    const cmdFsUtils = getCmdFsUtils()

    const commands = await cmdFsUtils.importAllCommands({noCache: true})
    
    for (const command of commands) {
        const commandData = command.data
        if (!(await exists(commandData))) {
            add(commandData)
        } 
    }
}