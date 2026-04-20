const SESSION_KEY = 'gyeongpil_session'

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export async function signIn(email, password) {
  if (!email || !password) throw new Error('이메일과 비밀번호를 입력하세요.')
  const session = { email, name: email.split('@')[0] }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function signOut() {
  localStorage.removeItem(SESSION_KEY)
}
