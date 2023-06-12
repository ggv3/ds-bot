import { Client, Events, GatewayIntentBits, Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
import 'dotenv/config'
import { scp } from './commands/scp'
import { arma } from './commands/arma'
import {
  ARMA_INSTALL_DIR,
  ARMA_SCRIPT_NAME,
  ARMA_SERVICE_NAME,
  ARMA_STEAM_ID,
  SCP_INSTALL_DIR,
  SCP_SCRIPT_NAME,
  SCP_SERVICE_NAME,
  SCP_STEAM_ID,
  START_APP_PATH,
  STEAM_LOGIN_PASSWORD,
  STEAM_LOGIN_USERNAME,
  STOP_APP_PATH,
  UPDATE_APP_PATH,
} from './constants'
import { executeCommand, executeUpdateCommand, isAllowedToUseCommand } from './utils'

const TOKEN = process.env.TOKEN || ''
const APPLICATION_ID = process.env.APPLICATION_ID || ''
const GUILD_ID = process.env.GUILD_ID || ''
const ALLOWED_ROLE_IDS = process.env.ALLOWED_ROLE_IDS.split(',') || []

const rest = new REST({ version: '10' }).setToken(TOKEN)
const commands = [scp, arma]

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, async (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
  try {
    console.log('Registering slash commands...')
    await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), { body: commands })
    console.log('Slash commands were registered successfully!')
  } catch (error) {
    console.log(`There was an error: ${error}`)
  }
})

client.login(TOKEN)

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const isAllowed = await isAllowedToUseCommand(ALLOWED_ROLE_IDS, interaction)
  const { commandName } = interaction
  const { value } = interaction.options.get('action') || {}
  if (!isAllowed) {
    interaction.reply({ content: 'You are not allowed to use this command.' })
    return
  }
  if (commandName === 'scp') {
    if (value === 'start') {
      executeCommand(`${START_APP_PATH} ${SCP_SERVICE_NAME} ${SCP_SCRIPT_NAME}`, interaction)
    } else if (value === 'stop') {
      executeCommand(`${STOP_APP_PATH} ${SCP_SERVICE_NAME}`, interaction)
    } else if (value === 'update') {
      executeUpdateCommand(`${UPDATE_APP_PATH} ${SCP_INSTALL_DIR} "" "" ${SCP_STEAM_ID}`, interaction)
    }
  } else if (commandName === 'arma') {
    if (value === 'start') {
      executeCommand(`${START_APP_PATH} ${ARMA_SERVICE_NAME} ${ARMA_SCRIPT_NAME}`, interaction)
    } else if (value === 'stop') {
      executeCommand(`${STOP_APP_PATH} ${ARMA_SERVICE_NAME}`, interaction)
    } else if (value === 'update') {
      executeUpdateCommand(
        `${UPDATE_APP_PATH} ${ARMA_INSTALL_DIR} ${STEAM_LOGIN_USERNAME} ${STEAM_LOGIN_PASSWORD} ${ARMA_STEAM_ID}`,
        interaction,
      )
    }
  }
})
