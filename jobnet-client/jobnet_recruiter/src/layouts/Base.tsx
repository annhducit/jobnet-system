import { Outlet } from 'react-router-dom'

import Footer from 'Common/Footer'
import RHeaderHome from '../components/header/RHeaderHome'
import RHeader from '../components/header/RHeader'
import { useScroll, useSpring, motion } from 'framer-motion'

type HeaderType =  'Recruiter' | 'RecruiterHome'

export default function Base({ type }: { type: HeaderType }): JSX.Element {
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
        {type === 'Recruiter' && <RHeader />}
        {type === 'RecruiterHome' && <RHeaderHome />}
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
