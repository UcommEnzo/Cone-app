import React, {useEffect, useState} from 'react'
import 'antd/dist/antd.css'
import s from "./App.module.css"
import {Input, Button} from 'antd';
import {useHttp} from "./hooks/httpHook";
import Cone from "./components/Cone";

function App() {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({h: '', r1: '', r2: ''})
    const [size, setSize] = useState('')
    const [postDone, setPostDone] = useState('')
    let someValues = {h: size.h, r1: size.r1, r2: size.r2 }


    const changeHandler = (e) => {
        setForm({...form, [e.target.id]: e.target.value})
    }

    const valuesPost = async () => {
        try {
            const data = await request('/api/values', 'POST', {...form})
            console.log('Data', data)
            await setPostDone(data)

        } catch (e) {}
    }

    useEffect(() => {
        const getSize = async () => {
            try {
                const data = await request('/api/values', 'GET')
                setSize(data)
            } catch (e) {}
        }
        getSize()
    },[postDone])

    return <div className={s.container}>
        <div className={s.form}>
            <Input className={s.Input} id={"h"} type={"number"} onChange={changeHandler}/>
            <Input className={s.Input} id={"r1"} type={"number"} onChange={changeHandler}/>
            <Input className={s.Input} id={"r2"} type={"number"} onChange={changeHandler}/>
            <Button className={s.btn} onClick={valuesPost} disabled={loading}>Send</Button>
        </div>
        { size
            ? <Cone {...someValues}/>
            : <div>Loading...</div>
        }
    </div>
}

export default App