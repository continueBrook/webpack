import React, { useContext } from 'react'
import context from '../context/useDataContext'


function Detail() {
    const res = useContext(context);
    let html = `<img src="empty.png" onerror ="alert('xss')">`

    function handleCheck() {
        res.handleNum()
    }

    return <div>
        num: {res.num}
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        <button onClick={handleCheck}>click me</button>
    </div>
}

export default Detail