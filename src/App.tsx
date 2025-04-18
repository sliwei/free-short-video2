/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'
/* Theme variables */
import './theme/variables.css'

import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import eruda from 'eruda'
import { caretForwardCircleSharp, filmSharp, personCircleSharp } from 'ionicons/icons'
import { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

import Tab1 from './pages/Tab1'
import Tab2 from './pages/Tab2'
import Tab3 from './pages/Tab3'

setupIonicReact()

const App: React.FC = () => {
  useEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'live') eruda.init()
  }, [])

  return (
    <IonApp className="app">
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className="tab-bar">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={caretForwardCircleSharp} />
              <IonLabel>Video</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={filmSharp} />
              <IonLabel>More</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={personCircleSharp} />
              <IonLabel>Me</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
