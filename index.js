// d8888b. d88888b d8888b. db       .d88b.  db    db        .d888b.  .d88b.  .d888b.   j88D
// 88  `8D 88'     88  `8D 88      .8P  Y8. `8b  d8'        VP  `8D .8P  88. VP  `8D  j8~88
// 88   88 88ooooo 88oodD' 88      88    88  `8bd8'            odD' 88  d'88    odD' j8' 88
// 88   88 88~~~~~ 88~~~   88      88    88    88    C8888D  .88'   88 d' 88  .88'   V88888D
// 88  .8D 88.     88      88booo. `8b  d8'    88           j88.    `88  d8' j88.        88
// Y8888D' Y88888P 88      Y88888P  `Y88P'     YP           888888D  `Y88P'  888888D     VP

// -----------------------------------------------------------------------------------------
// todo-------------------- Refactorizado el 28-03-2025 ------------------------------------

import server from './src/server.js'
import { sequelize, startUp } from './src/database.js'
import fillTables from './src/Controllers/VideoGames/databaseControllers/fillTables.js'
import { appUserTable } from './src/utils/index.js'
import s from './src/envConfig.js'

server.listen(s.Port, async () => {
  try {
    await startUp()
    if (s.Status === 'development') {
      await sequelize.sync({ force:true})
   }
    //await fillTables()
    //await appUserTable()
    console.log(`Server is running on port ${s.Port} ✔️\nServer ${s.Status}`)
  } catch (error) {
    console.error('Could not syncing with database', error)
  }
})
