import {View,Text} from 'react-native'
import { settingsItem } from '@/data'
import ProfileWrap from '@/components/profilePage/ProfileWrap'
import LogoutPage from '@/components/profilePage/LogoutPage'

const Settings = () => {
  return (
    <ProfileWrap
      textValue='Settings'
      dataHasHref={true}
      dataMap={settingsItem}
    >
      <LogoutPage/> 
      
    </ProfileWrap>
  )
}

export default Settings