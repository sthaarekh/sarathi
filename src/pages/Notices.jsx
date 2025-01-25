import React from 'react'
import { motion } from "framer-motion";

const Notices = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
    <div>
      
    </div>
    </motion.div>
  )
}

export default Notices
