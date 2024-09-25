
export type TUser = {
    name : string,
    email : string,
    password : string,
    phone : string,
    role : 'admin' | 'user'
    address : string,
    profileImage : string
}

 const userRole = {
    admin : 'admin',
    user : 'user'
} as const

export type TUserRole = keyof typeof userRole;