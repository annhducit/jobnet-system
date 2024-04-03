import { Outlet } from 'react-router-dom'
import JSHeader from '../components/header/JSHeader'
import Footer from 'Common/Footer'
import { useScroll, useSpring, motion } from 'framer-motion'

export default function Base(): JSX.Element {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-main origin-top-left"
        style={{ scaleX: scaleX }}
      />
      <div className="w-full">
        <JSHeader />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
