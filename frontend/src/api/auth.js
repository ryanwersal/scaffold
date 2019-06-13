import session from './session'

export default {
  login(email, password) {
    const username = email
    return session.post('/auth/login/', { username, email, password })
      .catch((error) => {
        let errorMessage = 'An error occured while processing your request. Please try again.'
        let resp = error.response.data
        if (resp) {
          if (resp.email) {
            errorMessage = 'A valid email address is required.'
          } else if (resp.password) {
            errorMessage = 'Invalid password.'
          } else if (resp.non_field_errors) {
            if (resp.non_field_errors[0] === 'E-mail is not verified.') {
              errorMessage = 'Account is not yet verified. Please check your email for the verification link.'
            } else {
              errorMessage = 'Invalid login credentials. Please try again.'
            }
          }
        }
        throw errorMessage
      })
  },
  logout() {
    return session.post('/auth/logout/', {})
  },
  createAccount(email, password, confirmPassword) {
    const username = email
    const password1 = password
    const password2 = confirmPassword
    return session.post('/registration/', { username, password1, password2, email })
      .catch((error) => {
        let errorMessage = 'An error occurred while processing your request. Please try again.'
        let resp = error.response.data
        if (resp) {
          if (resp.email) {
            errorMessage = resp.email[0]
          } else if (resp.password1) {
            errorMessage = resp.password1[0]
          }
        }
        throw errorMessage
      })
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/auth/password/reset/', { email })
  },
  resetAccountPassword(uid, token, password, confirmPassword) {
    const new_password1 = password
    const new_password2 = confirmPassword
    return session.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 })
      .catch((error) => {
        let errorMessage = 'An error occurred while processing your request. Please try again.'
        let resp = error.response.data
        if (resp) {
          if (resp.new_password2) {
            errorMessage = resp.new_password2[0]
          }
        }
        throw errorMessage
      })
  },
  activateAccount(key) {
    return session.post('/registration/verify-email/', { key })
      .catch(() => {
        // The endpoint doesn't provide rich errors so we'll just send back a generic one.
        throw 'Unable to confirm account. Please try again or register a new account.'
      })
  },
}
