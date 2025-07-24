import type { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

interface ChartsProps {
    variant: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'polarArea' | 'radar';
    series?: any[];
    labels?: string[];
    colors?: string[];
}

const Charts: React.FC<ChartsProps> = ({ variant, series, labels, colors }) => {

    const chartOptions: Record<string, { series: any[]; options: ApexOptions }> = {
        line: {
            series: [
                {
                    name: 'Visitor',
                    data: [45, 55, 75, 25, 45, 110],
                },
            ],
            options: {
                chart: {
                    height: 300,
                    type: 'line',
                    toolbar: { show: false },
                },
                colors: ['#0F0'],
                tooltip: {
                    marker: { show: false },
                    y: {
                        formatter(number: number) {
                            return '' + number;
                        },
                    },
                    theme: 'dark',
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
                    labels: {
                        style: {
                            colors: '#00FF00',
                        },
                    },
                    axisBorder: {
                        color: '#00FF00',
                    },
                },
                yaxis: {
                    opposite: false,
                    labels: {
                        offsetX: 0,
                        style: {
                            colors: '#00FF00',
                        },
                    },
                },
                grid: {
                    borderColor: '#00FF00',
                    xaxis: {
                        lines: {
                            show: false,
                        },
                    },
                },
            },
        },
        area: {
            series: [
                {
                    name: 'Visitor',
                    data: [148, 168, 155, 178, 155],
                },
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 300,
                    zoom: { enabled: false },
                    toolbar: { show: false },
                },
                colors: ['#0F0'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
                xaxis: {
                    axisBorder: {
                        color: '#00FF00',
                    },
                    labels: {
                        style: {
                            colors: '#00FF00',
                        },
                    },
                },
                yaxis: {
                    opposite: false,
                    labels: {
                        offsetX: 0,
                        style: {
                            colors: '#00FF00',
                        },
                    },
                },
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                legend: {
                    horizontalAlign: 'left',
                },
                grid: {
                    borderColor: '#00FF00',
                    xaxis: {
                        lines: {
                            show: false,
                        },
                    },
                },
                tooltip: {
                    theme: 'dark',
                },
            },
        },
        bar: {
            series:
                series
                ??
                [
                    {
                        name: 'Net Profit',
                        data: [44, 55, 57, 56, 61, 58],
                    },
                    {
                        name: 'Revenue',
                        data: [76, 85, 101, 98, 87, 105],
                    },
                ],
            options: {
                chart: {
                    height: 300,
                    type: 'bar',
                    zoom: { enabled: false },
                    toolbar: { show: false },
                },
                colors: colors ?? ['#0F0', '#0000FF'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                    },
                },
                grid: {
                    borderColor: '#FFF',
                    xaxis: {
                        lines: {
                            show: false,
                        },
                    },
                },
                xaxis: {
                    categories: labels ?? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    axisBorder: {
                        color: '#FFF',
                    },
                    labels: {
                        style: {
                            colors: '#FFF',
                        },
                    },
                },
                yaxis: {
                    opposite: false,
                    labels: {
                        offsetX: 0,
                        style: {
                            colors: '#FFF',
                        },
                    },
                },
                tooltip: {
                    theme: 'dark',
                    y: {
                        formatter(val: any) {
                            return val;
                        },
                    },
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: "text-white",
                    },
                },
            },
        },
        pie: {
            series: [44, 55, 13, 22],
            options: {
                chart: {
                    height: 300,
                    type: 'pie',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D'],
                colors: ['#0F0', '#FF0000', '#FFFF00', '#0000FF'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                        },
                    },
                ],
                stroke: {
                    show: false,
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: "text-white",
                    },
                },
            },
        },
        donut: {
            series: series ?? [44, 55, 13],
            options: {
                chart: {
                    height: 300,
                    type: 'donut',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                stroke: {
                    show: false,
                },
                labels: labels ?? ['Team A', 'Team B', 'Team C'],
                colors: colors ?? ['#9B30FF', '#0F0', '#FFFF00'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                        },
                    },
                ],
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: "text-white",
                    },
                },
            },
        },
        radialBar: {
            series: [44, 55, 41],
            options: {
                chart: {
                    height: 300,
                    type: 'radialBar',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#0F0', '#9B30FF', '#FFFF00'],
                grid: {
                    borderColor: '#00FF00',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                fontSize: '22px',
                            },
                            value: {
                                fontSize: '16px',
                                color: '#FFF'
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#FFF',
                                formatter: function () {
                                    return String(249);
                                },
                            },
                        },
                    },
                },
                labels: ['Apples', 'Oranges', 'Bananas'],
                fill: {
                    opacity: 0.85,
                },
            },
        },
        polarArea: {
            series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
            options: {
                chart: {
                    height: 300,
                    type: 'polarArea',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#0F0', '#FF0000', '#FFFF00', '#0000FF', '#BEBEBE', '#9B30FF'],
                stroke: {
                    show: false,
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#FFF',
                        },
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                        },
                    },
                ],
                plotOptions: {
                    polarArea: {
                        rings: {
                            strokeColor: '#FFF',
                        },
                        spokes: {
                            connectorColors: '#FFF',
                        },
                    },
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: "text-white",
                    },
                },
                fill: {
                    opacity: 0.85,
                },
                labels: ['Apples', 'Oranges', 'Bananas', 'Grapes', 'Pineapples', 'Mangoes', 'Peaches', 'Cherries', 'Strawberries'],
            },
        },
        radar: {
            series: [
                {
                    name: 'Visitor',
                    data: [80, 50, 30, 40, 100, 20],
                },
            ],
            options: {
                chart: {
                    height: 300,
                    type: 'radar',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#0F0'],
                xaxis: {
                    categories: ['January', 'February', 'March', 'April', 'May', 'June'],
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: '#FFF',
                        },
                    },
                },
                plotOptions: {
                    radar: {
                        polygons: {
                            strokeColors: '#FFF',
                            connectorColors: '#FFF',
                        },
                    },
                },
                tooltip: {
                    theme: 'dark',
                },
            },
        },
    };

    const chartData = chartOptions[variant];

    return <Chart options={chartData.options} series={chartData.series} type={variant} height={300} />;
};

export default Charts;
