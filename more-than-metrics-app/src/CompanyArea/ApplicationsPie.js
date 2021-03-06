import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { Chip } from "@mui/material"

const COLORS = ["#FFBB28", "#53A659", "#FF4E58"]
const CHARTWIDTH = 400
const CHARTHEIGHT = 180

function ApplicationsPie(props) {
    const [applications, setApplications] = useState(0)
    const [pending, setPending] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [rejected, setRejected] = useState(0)
    const [jobs, setJobs] = useState(0)

    useEffect(() => {
        async function getCompanyStats(companyID) {
            const response = await fetch(process.env.REACT_APP_API_URL + `/company/stats/${companyID}`)
            const json = await response.json()
            setApplications(json.company_applications)
            setPending(json.company_pending)
            setAccepted(json.company_accepted)
            setRejected(json.company_rejected)
            setJobs(json.company_jobs)
        }
        getCompanyStats(1)
    }, [])
    const data = [
        { name: "Pending", value: pending },
        { name: "Accepted", value: accepted },
        { name: "Rejected", value: rejected },
    ]
    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "15rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "16px", fontFamily: "Lato", color: "black" }}>TOTAL LISTINGS</span>
                <Chip
                    label={jobs}
                    style={{
                        textAlign: "center",
                        fontFamily: "Lato",
                        fontSize: "28px",
                        backgroundColor: "#ffeab9",
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "50%",
                    }}
                />
            </div>
            <PieChart width={CHARTWIDTH} height={CHARTHEIGHT}>
                <Pie
                    data={data}
                    cx={CHARTWIDTH / 2.1}
                    cy={CHARTHEIGHT / 1.5}
                    isAnimationActive={false}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                    label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
            <div style={{ width: "15rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "16px", fontFamily: "Lato", color: "black" }}>TOTAL APPLICATIONS</span>
                <Chip
                    label={applications}
                    style={{
                        textAlign: "center",
                        fontFamily: "Lato",
                        fontSize: "28px",
                        backgroundColor: "#ffeab9",
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "50%",
                    }}
                />
            </div>
        </div>
    )
}

export default ApplicationsPie
