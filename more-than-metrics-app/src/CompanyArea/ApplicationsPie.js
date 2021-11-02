import React, { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"

const COLORS = ["#FFBB28", "#00C49F", "#DD4444"]
const CHARTWIDTH = 800
const CHARTHEIGHT = 150

function ApplicationsPie(props) {
    const [applications, setApplications] = useState(0)
    const [pending, setPending] = useState(0)
    const [accepted, setAccepted] = useState(0)
    const [rejected, setRejected] = useState(0)
    const [jobs, setJobs] = useState(0)

    useEffect(() => {
        async function getCompanyStats(companyID) {
            const response = await fetch(`http://localhost:8080/company/stats/${companyID}`)
            const json = await response.json()
            console.log(json)
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
        <div>
            <span>Total Applications: {applications} </span>
            <PieChart width={CHARTWIDTH} height={CHARTHEIGHT}>
                {console.log(data)}
                <Pie
                    data={data}
                    cx={CHARTWIDTH / 2.1}
                    cy={CHARTHEIGHT / 1.5}
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
            <span>Total Jobs: {jobs} </span>
        </div>
    )
}

export default ApplicationsPie
