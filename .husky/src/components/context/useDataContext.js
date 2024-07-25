import React, { useState } from 'react'


const context = React.createContext()

function handleData() {
    const [num, setNum] = useState(0)

    function handleNum() {
        setNum(num + 1)
    }

    return {
        num,
        handleNum
    }
}

export default context
export {
    handleData
}