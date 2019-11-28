import { App } from './src/App'

const server = new App()

server.start().then(() => server.getServer())
