import { exec } from 'child_process'
import { ChatInputCommandInteraction, CacheType } from 'discord.js'

export const executeCommand = (command: string, interaction: ChatInputCommandInteraction<CacheType>) => {
  exec(command, (error, stdout) => {
    if (error) {
      console.log(`Error: ${error}`)
      return
    }
    interaction.reply(stdout)
  })
}

export const executeUpdateCommand = (command: string, interaction: ChatInputCommandInteraction<CacheType>) => {
  interaction.reply('Updating application...')
  exec(command, (error) => {
    if (error) {
      console.log(`Error: ${error}`)
      interaction.followUp({ content: 'Error.', allowedMentions: { repliedUser: false } })
      return
    }
    interaction.followUp({ content: 'Update finished.', allowedMentions: { repliedUser: false } })
  })
}

export const isAllowedToUseCommand = async (
  allowedRoleIds: string[],
  interaction: ChatInputCommandInteraction<CacheType>,
): Promise<boolean> => {
  const member = await interaction.guild?.members.fetch(interaction.user.id)
  if (!member) {
    return false
  }
  const hasAllowedRole = member.roles.cache.some((role) => allowedRoleIds.includes(role.id))
  return hasAllowedRole
}
