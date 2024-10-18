import ErrorMessage from './components/ErrorMessage'

const NotFound = () => {
  return (
    <ErrorMessage
      errorCode="404"
      errorMessage={
        <>
          お探しのページは存在しません。
          <br />
          一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。
        </>
      }
    />
  )
}

export default NotFound
