import { AiFillSetting } from 'react-icons/ai'
import { FaPaperPlane, FaSearch, FaSignOutAlt } from 'react-icons/fa'

import vite from '/vite.svg'

import Header from '../components/header/JSHeader'
import Input from 'Common/input/Input'

import { requireAuth } from '../utils/auth'

interface ChatUserProps {
  id: number
  name: string
  newChat: string
}

interface MessageProps {
  id: number
  username: string
  content: string
}

Chat.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'JobSeeker')

  return null
}

export default function Chat() {
  const chatUsersElms = chatUsers.map((chatUser) => (
    <ChatUser data={chatUser} />
  ))

  const messagesElms = messages.map((message) => <Message data={message} />)

  return (
    <div className="h-screen">
      <Header />

      <div className="flex h-full pt-20">
        <div className="flex flex-col pt-6 border-r-2 basis-1/4 bg-second-lower">
          <div className="flex items-center justify-between px-6">
            <h4 className="text-2xl font-bold">Chats</h4>
            <div className="flex text-2xl">
              <div className="p-1 rounded-full hover:bg-main-lower">
                <AiFillSetting />
              </div>
              <div className="p-1 ml-4 rounded-full hover:bg-main-lower">
                <FaSignOutAlt />
              </div>
            </div>
          </div>

          <div className="w-full px-6 mt-6">
            <div className="flex items-center w-full px-4 rounded bg-slate-100">
              <div>
                <FaSearch />
              </div>
              <Input
                type="text"
                color="none"
                placeholder="Tên công ty, nhà tuyển dụng..."
                className="w-full h-10 ml-4 outline-none"
              />
            </div>
          </div>

          <div className="px-2 mt-6 space-y-2 overflow-y-auto">
            {chatUsersElms}
          </div>
        </div>

        <div className="flex flex-col h-full grow">
          <div className="flex items-center flex-none h-16 px-6 border-b-2">
            <div>
              <img
                loading="lazy"
                src={vite}
                className="h-10 border-2 rounded-full"
              />
            </div>
            <div className="ml-2">
              <div className="font-bold">Nhà tuyển dụng A</div>
              <div className="text-sm">Đang hoạt động</div>
            </div>
          </div>

          <div className="px-6 mt-2 space-y-1 overflow-y-auto grow">
            {messagesElms}
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center px-4 rounded-full bg-mainLower ">
              <Input
                type="text"
                color="none"
                placeholder="Nhập một tin nhắn..."
                className="h-10 rounded outline-none bg-second-lower grow"
              />

              <div className="p-2 text-xl rounded-full cursor-pointer text-main hover:bg-slate-50">
                <FaPaperPlane />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatUser({ data }: { data: ChatUserProps }): JSX.Element {
  return (
    <div
      key={data.id}
      className="flex px-4 py-2 transition rounded bg-slate-100 hover:bg-main-lower hover:text-slate-100"
    >
      <div className="relative">
        <img loading="lazy" src={vite} className="h-12 border-2 rounded-full" />
        <span className="absolute bottom-0 right-0 flex w-3 h-3">
          <span className="w-full h-full rounded-full bg-main-lower"></span>
        </span>
      </div>
      <div className="flex flex-col justify-between ml-2 grow">
        <div className="font-bold">{data.name}</div>
        <div className="text-sm">{data.newChat}</div>
      </div>
    </div>
  )
}

function Message({ data }: { data: MessageProps }): JSX.Element {
  const isMe = data.username === 'Me' // <== ?

  return isMe ? (
    <div key={data.id} className="flex items-center justify-end">
      <div className="px-4 py-2 text-white rounded-tl-full rounded-bl-full rounded-br-full bg-main-lower">
        {data.content}
      </div>
      <div>
        <img loading="lazy" src={vite} className="h-6 ml-4" />
      </div>
    </div>
  ) : (
    <div key={data.id} className="flex items-center">
      <div>
        <img loading="lazy" src={vite} className="h-6" />
      </div>
      <div className="px-4 py-2 ml-4 rounded-tr-full rounded-bl-full rounded-br-full bg-mainLower">
        {data.content}
      </div>
    </div>
  )
}

const chatUsers: ChatUserProps[] = [
  {
    id: 1,
    name: 'Nhà tuyển dụng A',
    newChat: 'Xin chào!',
  },
  {
    id: 2,
    name: 'Nhà tuyển dụng B',
    newChat: 'Xin chào!',
  },
  {
    id: 3,
    name: 'Nhà tuyển dụng C',
    newChat: 'Xin chào!',
  },
  {
    id: 4,
    name: 'Nhà tuyển dụng D',
    newChat: 'Xin chào!',
  },
  {
    id: 5,
    name: 'Nhà tuyển dụng E',
    newChat: 'Xin chào!',
  },
  {
    id: 1,
    name: 'Nhà tuyển dụng A',
    newChat: 'Xin chào!',
  },
  {
    id: 2,
    name: 'Nhà tuyển dụng B',
    newChat: 'Xin chào!',
  },
  {
    id: 3,
    name: 'Nhà tuyển dụng C',
    newChat: 'Xin chào!',
  },
  {
    id: 4,
    name: 'Nhà tuyển dụng D',
    newChat: 'Xin chào!',
  },
  {
    id: 5,
    name: 'Nhà tuyển dụng E',
    newChat: 'Xin chào!',
  },
]

const messages: MessageProps[] = [
  { id: 1, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 2, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 3, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 4, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 5, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 6, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 7, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 8, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 1, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 2, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 3, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 4, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 5, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 6, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
  { id: 7, username: 'A', content: 'Xin chào, tôi có thể giúp gì cho bạn?' },
  { id: 8, username: 'Me', content: 'Tôi muốn tìm việc làm ở công ty của bạn' },
]
