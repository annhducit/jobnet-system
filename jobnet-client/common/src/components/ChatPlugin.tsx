import { useEffect, useRef } from 'react'

export default function ChatPlugin() {
  const chatRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    chatRef.current.setAttribute('page_id', '126048093921204')
    chatRef.current.setAttribute('attribution', 'biz_inbox')

  //review
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       xfbml: true,
  //       version: 'v17.0',
  //     })
  //   }
  //   ;(function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0]
  //     if (d.getElementById(id)) return
  //     js = d.createElement(s)
  //     js.id = id
  //     js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'
  //     fjs.parentNode.insertBefore(js, fjs)
  //   })(document, 'script', 'facebook-jssdk')
  }, [])

  return (
    <>
      <div id="fb-root"></div>
      <div
        ref={chatRef}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </>
  )
}
