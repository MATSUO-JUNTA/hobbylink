'use client'

import ErrorMessage from './components/ErrorMessage'

const Error = () => {
  return (
    <ErrorMessage
      errorCode="500"
      errorMessage={
        <>
          何らかの理由でサーバーが応答していません。
          <br />
          時間をおいて再度アクセスするか、
          サイトの管理者にお問い合わせください。
        </>
      }
    />
  )
}

export default Error
