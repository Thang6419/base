import { memo } from 'react'
import { ReactComponent as MenuIcon } from '@/assets/svg/menu.svg'
import { ReactComponent as UsersIcon } from '@/assets/svg/users.svg'
import { ReactComponent as ActiveUsersIcon } from '@/assets/svg/active-users.svg'
import { ReactComponent as PostsIcon } from '@/assets/svg/posts.svg'
import { ReactComponent as SettingsIcon } from '@/assets/svg/settings.svg'
import { ReactComponent as EyeIcon } from '@/assets/svg/eye.svg'
import { ReactComponent as EditIcon } from '@/assets/svg/edit.svg'
import { ReactComponent as TrashIcon } from '@/assets/svg/trash.svg'
import { ReactComponent as PlusIcon } from '@/assets/svg/plus.svg'
import { ReactComponent as SearchIcon } from '@/assets/svg/search.svg'

const icons = {
  menu: MenuIcon,
  users: UsersIcon,
   'active-users': ActiveUsersIcon,
  posts: PostsIcon,
  settings: SettingsIcon,
  eye: EyeIcon,
  edit: EditIcon,
  trash: TrashIcon,
  plus: PlusIcon,
  search: SearchIcon
}

const Icon = memo(({ name, className = '', size = 6, ...props }) => {
  const IconComponent = icons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <div className={`w-${size} h-${size} ${className}`} {...props}>
      <IconComponent />
    </div>
  )
})

Icon.displayName = 'Icon'

export default Icon 