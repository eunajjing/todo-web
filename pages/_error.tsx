import React from 'react'
import Router from 'next/router'

function Error() {
  return (
    <div>
      Error Page
      <button onClick={() => Router.back()}>돌아가기</button>
    </div>
  )
}

export default Error
