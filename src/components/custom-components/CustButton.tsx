import './index.css'
import React from 'react'

interface CustButtonProps {
    label: string;
}

const CustButton:React.FC<CustButtonProps> = ({label}) => {
    return (
        <>
            <button className="btn" type="button">{label}</button>
        </>
    )
}

export default CustButton;

