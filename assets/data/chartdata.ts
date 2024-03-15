const ComplianceChartData = {
    "title": "Compliance Activity Status",
    "subTitle": "01/01/2021 - 31/12/2023",
    "xAxisName": "Compliance",
    "yAxisName": " Compliance(Count)",
    "chartData": [
        {
            "label": "COMPLETED",
            "color": "#00FF00",
            "value": 89,
            "link": {
                "dataFilter": null,
                "type": "completed",
                "userFilter": null
            }
        },
        {
            "label": "INITIATED",
            "color": "#FFBF00",
            "value": 1458,
            "link": {
                "dataFilter": null,
                "type": "initiated",
                "userFilter": null
            }
        },
        {
            "label": "NULL",
            "color": null,
            "value": 7,
            "link": {
                "dataFilter": null,
                "type": "null",
                "userFilter": null
            }
        },
        {
            "label": "PENDING",
            "color": "#FF0000",
            "value": 19,
            "link": {
                "dataFilter": null,
                "type": "pending",
                "userFilter": null
            }
        },
        {
            "label": "REJECTED",
            "color": null,
            "value": 5,
            "link": {
                "dataFilter": null,
                "type": "rejected",
                "userFilter": null
            }
        }
    ]
}
export default ComplianceChartData;