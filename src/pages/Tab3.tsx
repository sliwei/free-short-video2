import './Tab3.css'

import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { listCircle } from 'ionicons/icons'

import useObjAtom from '@/hooks/useObjAtom'
import { urlState } from '@/store/global'

const Tab3: React.FC = () => {
  const url = useObjAtom(urlState)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Me</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonList inset={true}>
          <IonItem button={true} onClick={() => url.set('')}>
            <IonIcon color="danger" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>URL</IonLabel>
            <IonNote slot="end"></IonNote>
          </IonItem>
          <IonItem button={true}>
            <IonIcon color="tertiary" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>Shopping</IonLabel>
            <IonNote slot="end"></IonNote>
          </IonItem>
          <IonItem button={true}>
            <IonIcon color="success" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>Cleaning</IonLabel>
            <IonNote slot="end"></IonNote>
          </IonItem>
          <IonItem button={true}>
            <IonIcon color="warning" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>Reminders</IonLabel>
            <IonNote slot="end"></IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Tab3
