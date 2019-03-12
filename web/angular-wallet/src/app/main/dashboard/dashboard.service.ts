import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService implements Resolve<any> {

    widgets: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) { }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getWidgets()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get widgets
     *
     * @returns {Promise<any>}
     */
    getWidgets(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const widgets = {
                widget1: {
                    chartType: 'line',
                    datasets : {
                        '2016': [
                            {
                                label: 'Sales',
                                data : [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
                                fill : 'start'

                            }
                        ],
                        '2017': [
                            {
                                label: 'Sales',
                                data : [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
                                fill : 'start'

                            }
                        ],
                        '2018': [
                            {
                                label: 'Sales',
                                data : [3.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
                                fill : 'start'

                            }
                        ]

                    },
                    labels   : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    colors   : [
                        {
                            borderColor              : '#42a5f5',
                            backgroundColor          : '#42a5f5',
                            pointBackgroundColor     : '#1e88e5',
                            pointHoverBackgroundColor: '#1e88e5',
                            pointBorderColor         : '#ffffff',
                            pointHoverBorderColor    : '#ffffff'
                        }
                    ],
                    options  : {
                        spanGaps           : false,
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        layout             : {
                            padding: {
                                top  : 32,
                                left : 32,
                                right: 32
                            }
                        },
                        elements           : {
                            point: {
                                radius          : 4,
                                borderWidth     : 2,
                                hoverRadius     : 4,
                                hoverBorderWidth: 2
                            },
                            line : {
                                tension: 0
                            }
                        },
                        scales             : {
                            xAxes: [
                                {
                                    gridLines: {
                                        display       : false,
                                        drawBorder    : false,
                                        tickMarkLength: 18
                                    },
                                    ticks    : {
                                        fontColor: '#ffffff'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    display: false,
                                    ticks  : {
                                        min     : 1.5,
                                        max     : 5,
                                        stepSize: 0.5
                                    }
                                }
                            ]
                        },
                        plugins            : {
                            filler      : {
                                propagate: false
                            },
                            xLabelsOnTop: {
                                active: true
                            }
                        }
                    }
                },
                widget2: {
                    conversion: {
                        value   : 492,
                        ofTarget: 13
                    },
                    chartType : 'bar',
                    datasets  : [
                        {
                            label: 'Conversion',
                            data : [221, 428, 492, 471, 413, 344, 294]
                        }
                    ],
                    labels    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    colors    : [
                        {
                            borderColor    : '#42a5f5',
                            backgroundColor: '#42a5f5'
                        }
                    ],
                    options   : {
                        spanGaps           : false,
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        layout             : {
                            padding: {
                                top   : 24,
                                left  : 16,
                                right : 16,
                                bottom: 16
                            }
                        },
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false,
                                    ticks  : {
                                        min: 100,
                                        max: 500
                                    }
                                }
                            ]
                        }
                    }
                },
                widget3: {
                    impressions: {
                        value   : '87k',
                        ofTarget: 12
                    },
                    chartType  : 'line',
                    datasets   : [
                        {
                            label: 'Impression',
                            data : [67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000, 110000, 149000, 98000],
                            fill : false
                        }
                    ],
                    labels     : ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15'],
                    colors     : [
                        {
                            borderColor: '#5c84f1'
                        }
                    ],
                    options    : {
                        spanGaps           : false,
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        elements           : {
                            point: {
                                radius          : 2,
                                borderWidth     : 1,
                                hoverRadius     : 2,
                                hoverBorderWidth: 1
                            },
                            line : {
                                tension: 0
                            }
                        },
                        layout             : {
                            padding: {
                                top   : 24,
                                left  : 16,
                                right : 16,
                                bottom: 16
                            }
                        },
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false,
                                    ticks  : {
                                        // min: 100,
                                        // max: 500
                                    }
                                }
                            ]
                        }
                    }
                },
                widget4: {
                    visits   : {
                        value   : 882,
                        ofTarget: -9
                    },
                    chartType: 'bar',
                    datasets : [
                        {
                            label: 'Visits',
                            data : [432, 428, 327, 363, 456, 267, 231]
                        }
                    ],
                    labels   : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    colors   : [
                        {
                            borderColor    : '#f44336',
                            backgroundColor: '#f44336'
                        }
                    ],
                    options  : {
                        spanGaps           : false,
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        layout             : {
                            padding: {
                                top   : 24,
                                left  : 16,
                                right : 16,
                                bottom: 16
                            }
                        },
                        scales             : {
                            xAxes: [
                                {
                                    display: false
                                }
                            ],
                            yAxes: [
                                {
                                    display: false,
                                    ticks  : {
                                        min: 150,
                                        max: 500
                                    }
                                }
                            ]
                        }
                    }
                },
                widget5: {
                    chartType: 'line',
                    datasets : {
                        'yesterday': [
                            {
                                label: 'Visitors',
                                data : [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
                                fill : 'start'

                            },
                            {
                                label: 'Page views',
                                data : [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
                                fill : 'start'
                            }
                        ],
                        'today'    : [
                            {
                                label: 'Visitors',
                                data : [410, 380, 320, 290, 190, 390, 250, 380, 300, 340, 220, 290],
                                fill : 'start'
                            },
                            {
                                label: 'Page Views',
                                data : [3000, 3400, 4100, 3800, 2200, 3200, 2900, 1900, 2900, 3900, 2500, 3800],
                                fill : 'start'

                            }
                        ]
                    },
                    labels   : ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'],
                    colors   : [
                        {
                            borderColor              : '#3949ab',
                            backgroundColor          : '#3949ab',
                            pointBackgroundColor     : '#3949ab',
                            pointHoverBackgroundColor: '#3949ab',
                            pointBorderColor         : '#ffffff',
                            pointHoverBorderColor    : '#ffffff'
                        },
                        {
                            borderColor              : 'rgba(30, 136, 229, 0.87)',
                            backgroundColor          : 'rgba(30, 136, 229, 0.87)',
                            pointBackgroundColor     : 'rgba(30, 136, 229, 0.87)',
                            pointHoverBackgroundColor: 'rgba(30, 136, 229, 0.87)',
                            pointBorderColor         : '#ffffff',
                            pointHoverBorderColor    : '#ffffff'
                        }
                    ],
                    options  : {
                        spanGaps           : false,
                        legend             : {
                            display: false
                        },
                        maintainAspectRatio: false,
                        tooltips           : {
                            position : 'nearest',
                            mode     : 'index',
                            intersect: false
                        },
                        layout             : {
                            padding: {
                                left : 24,
                                right: 32
                            }
                        },
                        elements           : {
                            point: {
                                radius          : 4,
                                borderWidth     : 2,
                                hoverRadius     : 4,
                                hoverBorderWidth: 2
                            }
                        },
                        scales             : {
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    },
                                    ticks    : {
                                        fontColor: 'rgba(0,0,0,0.54)'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    gridLines: {
                                        tickMarkLength: 16
                                    },
                                    ticks    : {
                                        stepSize: 1000
                                    }
                                }
                            ]
                        },
                        plugins            : {
                            filler: {
                                propagate: false
                            }
                        }
                    }
                },
                widget6: {
                    markers: [
                        {
                            lat  : 52,
                            lng  : -73,
                            label: '120'
                        },
                        {
                            lat  : 37,
                            lng  : -104,
                            label: '498'
                        },
                        {
                            lat  : 21,
                            lng  : -7,
                            label: '443'
                        },
                        {
                            lat  : 55,
                            lng  : 75,
                            label: '332'
                        },
                        {
                            lat  : 51,
                            lng  : 7,
                            label: '50'
                        },
                        {
                            lat  : 31,
                            lng  : 12,
                            label: '221'
                        },
                        {
                            lat  : 45,
                            lng  : 44,
                            label: '455'
                        },
                        {
                            lat  : -26,
                            lng  : 134,
                            label: '231'
                        },
                        {
                            lat  : -9,
                            lng  : -60,
                            label: '67'
                        },
                        {
                            lat  : 33,
                            lng  : 104,
                            label: '665'
                        }
                    ],
                    styles : [
                        {
                            'featureType': 'administrative',
                            'elementType': 'labels.text.fill',
                            'stylers'    : [
                                {
                                    'color': '#444444'
                                }
                            ]
                        },
                        {
                            'featureType': 'landscape',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'color': '#f2f2f2'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'road',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'saturation': -100
                                },
                                {
                                    'lightness': 45
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'visibility': 'simplified'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.arterial',
                            'elementType': 'labels.icon',
                            'stylers'    : [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'transit',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers'    : [
                                {
                                    'color': '#039be5'
                                },
                                {
                                    'visibility': 'on'
                                }
                            ]
                        }
                    ]
                },
                widget7: {
                    scheme : {
                        domain: ['#4867d2', '#5c84f1', '#89a9f4']
                    },
                    devices: [
                        {
                            name  : 'Desktop',
                            value : 92.8,
                            change: -0.6
                        },
                        {
                            name  : 'Mobile',
                            value : 6.1,
                            change: 0.7
                        },
                        {
                            name  : 'Tablet',
                            value : 1.1,
                            change: 0.1
                        }
                    ]
                },
                widget8: {
                    scheme : {
                        domain: ['#5c84f1']
                    },
                    today  : '12,540',
                    change : {
                        value     : 321,
                        percentage: 2.05
                    },
                    data   : [
                        {
                            name  : 'Sales',
                            series: [
                                {
                                    name : 'Jan 1',
                                    value: 540
                                },
                                {
                                    name : 'Jan 2',
                                    value: 539
                                },
                                {
                                    name : 'Jan 3',
                                    value: 538
                                },
                                {
                                    name : 'Jan 4',
                                    value: 539
                                },
                                {
                                    name : 'Jan 5',
                                    value: 540
                                },
                                {
                                    name : 'Jan 6',
                                    value: 539
                                },
                                {
                                    name : 'Jan 7',
                                    value: 540
                                }
                            ]
                        }
                    ],
                    dataMin: 538,
                    dataMax: 541
                },
                widget9: {
                    rows: [
                        {
                            title     : 'Holiday Travel',
                            clicks    : 3621,
                            conversion: 90
                        },
                        {
                            title     : 'Get Away Deals',
                            clicks    : 703,
                            conversion: 7
                        },
                        {
                            title     : 'Airfare',
                            clicks    : 532,
                            conversion: 0
                        },
                        {
                            title     : 'Vacation',
                            clicks    : 201,
                            conversion: 8
                        },
                        {
                            title     : 'Hotels',
                            clicks    : 94,
                            conversion: 4
                        }
                    ]
                }
            };

            this.widgets = widgets;
            resolve(widgets);

            // this._httpClient.get('api/dashboard-dashboard-widgets')
            //     .subscribe((response: any) => {
            //         this.widgets = response;
            //         resolve(response);
            //     }, reject);
        });
    }

    public getBalanceInfo() {
      return this._httpClient.get('https://poloniex.com/public?command=returnTicker');
    }
}
