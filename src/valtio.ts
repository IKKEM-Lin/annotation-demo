import { proxy } from 'valtio'

interface UserInfo {
    username: string
    role: string
}

export const userinfo = proxy<{ data?: UserInfo }>({
  data: JSON.parse(localStorage.getItem('userinfo') || '{}')
})

export const updateUserInfo = (data: UserInfo) => {
  userinfo.data = data
  localStorage.setItem('userinfo', JSON.stringify(data))
}