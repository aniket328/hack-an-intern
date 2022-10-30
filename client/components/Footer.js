import React from 'react'

const Footer = () => {
  
    const appName1 = String.raw`< Akatsuki >`
    const appName2 = String.raw`</ Akatsuki >`
  
    return (
    <div className='px-48 w-screen h-26 mb-24 space-y-6 flex-col text-[#888] text-center justify-center items-center'>
        <div>{appName1}</div>
        <div className='flex justify-around text-[#555]'>
            <div className='hover:text-[#0c8ce9] transition duration-500'><a target='_blank' href="https://www.linkedin.com/in/ketan-chouhan-6397231ab/">Ketan</a></div>
            <div className='hover:text-[#0c8ce9] transition duration-500'><a target='_blank' href="https://www.linkedin.com/in/hiwatarikai/">Ajay</a></div>
            <div className='hover:text-[#0c8ce9] transition duration-500'><a target='_blank' href="https://www.linkedin.com/in/manishkumardas3581321/">Manish</a></div>
            <div className='hover:text-[#0c8ce9] transition duration-500'><a target='_blank' href="https://www.linkedin.com/in/krishnakant-rawat/">KK</a></div>
            <div className='hover:text-[#0c8ce9] transition duration-500'><a target='_blank' href="https://www.linkedin.com/in/kowshik-vinay-kumar-74b3421ab/">Kowshik</a></div>
        </div>
        <div>{appName2}</div>
    </div>
  )
}

export default Footer