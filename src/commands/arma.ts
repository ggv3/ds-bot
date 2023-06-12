import { ApplicationCommandOptionType } from 'discord.js'

export const arma = {
  name: 'arma',
  description: 'Manages arma server',
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
