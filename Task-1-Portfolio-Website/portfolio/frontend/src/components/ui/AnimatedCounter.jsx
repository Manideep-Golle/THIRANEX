import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

function AnimatedCounter({ end, suffix = '', prefix = '', label, duration = 2.5 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 font-mono">
        {inView ? (
          <CountUp
            start={0}
            end={end}
            duration={duration}
            prefix={prefix}
            suffix={suffix}
            decimals={suffix === '' && end < 10 ? 1 : 0}
          />
        ) : (
          '0'
        )}
      </div>
      <p className="text-dark-400 text-sm md:text-base">{label}</p>
    </motion.div>
  )
}

export default AnimatedCounter
