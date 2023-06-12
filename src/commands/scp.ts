import { ApplicationCommandOptionType } from 'discord.js'

export const scp = {
  name: 'scp',
  description: 'Manages scp server',
  options: [
    {
      name: 'action',
      description: 'The action to perform.',
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'start',
          value: 'start',
        },
        {
          name: 'stop',
          value: 'stop',
        },
        {
          name: 'update',
          value: 'update',
        },
      ],
      required: true,
    },
  ],
}
