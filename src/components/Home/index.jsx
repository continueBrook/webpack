import React, { useState, useEffect } from 'react'
import context, { handleData } from '../context/useDataContext'
import Detail from '../Detail'
import './index.css'

function Index() {
    const data = handleData()

    return <context.Provider value={data}>
        <Detail />
    </context.Provider>
}

export default Index