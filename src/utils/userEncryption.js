import { JSEncrypt } from 'jsencrypt'

const PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChqImB8Pz4nTh3UBbA5m9zb+YCIwvop1Zxr8Bii6xoEt6+znWy/2WVXMV/NH28Yq34cH68VdcKSikEQlGnAqhci+9rrjVo0/vS2/D6RJcihXqfST9ZOMFsRJgxAQWyIbjL/Gf7HD5NrCM54TE+YOk/P6eI5Nc8lbkxXEavrLDtOwIDAQAB'

/**
 * @returns {Object}
 * @param obj
 */
export const userEncryption = obj => {
  // 使用公钥加密
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  const loginName = encrypt.encrypt(obj.loginName)
  const password = encrypt.encrypt(obj.password)
  return {
    ...obj,
    loginName,
    password
  }
}

/**
 * @returns String
 * @param pwd
 */
export const passwordEncryption = pwd => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBLIC_KEY)
  return encrypt.encrypt(pwd)
}
