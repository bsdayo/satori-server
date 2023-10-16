import { Context } from 'koishi'
import * as server from '@koishijs/plugin-server'
import fs from 'fs'

interface AppConfig {
  server: Context.Config
  plugins: Record<string, object>
}

const defaultConfig: AppConfig = {
  server: {
    host: '0.0.0.0',
    port: 5500,
  },
  plugins: {},
}

function getConfig(): AppConfig {
  const configPath = 'config.json'
  let config: AppConfig

  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }))
  } else {
    config = defaultConfig
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
  }

  return config
}

async function main() {
  const config = getConfig()
  const app = new Context(config.server)
  app.plugin(server)

  const logger = app.logger('plugins')
  logger.info(`Loading ${Object.keys(config.plugins).length} plugins...`)

  for (const pluginName in config.plugins) {
    const plugin = await import(pluginName)
    app.plugin(
      plugin.default ?? plugin,
      (config.plugins as Record<string, any>)[pluginName]
    )
    logger.info(`Plugin ${pluginName} loaded.`)
  }

  await app.start()
}

main()
