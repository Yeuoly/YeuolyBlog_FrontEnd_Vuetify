export const api_avatar = {
    act : 3,
    route : 'v1/account/ordinary/action'
}

export const api_public_post = {
    act : 4,
    route : 'v1/post/public/action'
}

export const api_status = {
    route : 'v1/state/api'
}

export const api_user = {
    act : 0,
    route : 'v1/account/ordinary/action'
}

export const api_follow = {
    act : 4,
    route : 'v1/account/online/action'
}

export const api_upload_img = {
    route : 'v1/upload/img'
}

export const api_change_avatar = {
    act : 0,
    route : 'v1/account/online/action'
}

export const api_logout = {
    act : 3,
    route : 'v1/account/online/action'
}

export const api_save_post = {
    act : exist => exist ? 2 : 1,
    route : 'v1/post/private/action'
}

export const api_private_post = {
    act : 4,
    route : 'v1/post/private/action'
}

export const api_private_del_post = {
    act : 3,
    route : 'v1/post/private/action'
}

export const api_get_recent = {
    act : 0,
    route : home => `v1/post/${ home ? 'private' : 'public' }/action`
}

export const api_get_space_info = {
    act : 5,
    route : 'v1/account/ordinary/action'
}

export const api_login = {
    act : 2,
    route : 'v1/account/ordinary/action'
}

export const api_search = {
    route : type => `v1/search/${type}`
}

export const api_signin = {
    act : 1,
    route : 'v1/account/ordinary/action'
}

export const api_create_captcha = {
    route : 'v1/tool/verify/create/captcha'
}

export const api_verify_create_email = {
    route : 'v1/tool/verify/create/email'
}

export const api_change_nickname = {
    act : 5,
    route : 'v1/account/online/action'
}

export const api_get_privacy_settings = {
    act : 1,
    route : 'v1/account/online/action'
}

export const api_change_privacy_settings = {
    act : 2,
    route : 'v1/account/online/action'
}