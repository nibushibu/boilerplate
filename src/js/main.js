import { register, mount } from 'riot'
import App from '../riot/my-app.riot'
import RawHtml from '../riot/raw-html.riot'

register('my-app', App)
mount('#my-app')