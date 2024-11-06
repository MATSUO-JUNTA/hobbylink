import ErrorMessage from './ErrorMessage'

const Error = () => {
  return (
    <ErrorMessage
      errorCode="通信エラー"
      errorMessage="データの取得に失敗しました。後ほど再試行してください。"
    />
  )
}

export default Error
