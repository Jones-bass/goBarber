import { container } from 'tsyringe'

import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
