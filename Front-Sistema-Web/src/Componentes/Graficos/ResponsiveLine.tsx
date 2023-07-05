import { ResponsiveLine } from '@nivo/line'


const mock = [
    {
      "id": "japan",
      "color": "hsl(203, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 173
        },
        {
          "x": "helicopter",
          "y": 118
        },
        {
          "x": "boat",
          "y": 219
        },
        {
          "x": "train",
          "y": 183
        },
        {
          "x": "subway",
          "y": 228
        },
        {
          "x": "bus",
          "y": 200
        },
        {
          "x": "car",
          "y": 55
        },
        {
          "x": "moto",
          "y": 282
        },
        {
          "x": "bicycle",
          "y": 286
        },
        {
          "x": "horse",
          "y": 128
        },
        {
          "x": "skateboard",
          "y": 56
        },
        {
          "x": "others",
          "y": 283
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(57, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 12
        },
        {
          "x": "helicopter",
          "y": 287
        },
        {
          "x": "boat",
          "y": 66
        },
        {
          "x": "train",
          "y": 18
        },
        {
          "x": "subway",
          "y": 198
        },
        {
          "x": "bus",
          "y": 157
        },
        {
          "x": "car",
          "y": 4
        },
        {
          "x": "moto",
          "y": 165
        },
        {
          "x": "bicycle",
          "y": 14
        },
        {
          "x": "horse",
          "y": 189
        },
        {
          "x": "skateboard",
          "y": 280
        },
        {
          "x": "others",
          "y": 178
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(221, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 285
        },
        {
          "x": "helicopter",
          "y": 42
        },
        {
          "x": "boat",
          "y": 106
        },
        {
          "x": "train",
          "y": 223
        },
        {
          "x": "subway",
          "y": 238
        },
        {
          "x": "bus",
          "y": 75
        },
        {
          "x": "car",
          "y": 206
        },
        {
          "x": "moto",
          "y": 66
        },
        {
          "x": "bicycle",
          "y": 173
        },
        {
          "x": "horse",
          "y": 9
        },
        {
          "x": "skateboard",
          "y": 109
        },
        {
          "x": "others",
          "y": 113
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(173, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 246
        },
        {
          "x": "helicopter",
          "y": 99
        },
        {
          "x": "boat",
          "y": 129
        },
        {
          "x": "train",
          "y": 135
        },
        {
          "x": "subway",
          "y": 3
        },
        {
          "x": "bus",
          "y": 159
        },
        {
          "x": "car",
          "y": 78
        },
        {
          "x": "moto",
          "y": 64
        },
        {
          "x": "bicycle",
          "y": 154
        },
        {
          "x": "horse",
          "y": 175
        },
        {
          "x": "skateboard",
          "y": 290
        },
        {
          "x": "others",
          "y": 113
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(335, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 265
        },
        {
          "x": "helicopter",
          "y": 64
        },
        {
          "x": "boat",
          "y": 59
        },
        {
          "x": "train",
          "y": 192
        },
        {
          "x": "subway",
          "y": 172
        },
        {
          "x": "bus",
          "y": 283
        },
        {
          "x": "car",
          "y": 178
        },
        {
          "x": "moto",
          "y": 191
        },
        {
          "x": "bicycle",
          "y": 206
        },
        {
          "x": "horse",
          "y": 98
        },
        {
          "x": "skateboard",
          "y": 69
        },
        {
          "x": "others",
          "y": 9
        }
      ]
    }
  ]


const MyResponsiveLine = () => {

    return (
        <ResponsiveLine
        data={mock}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default MyResponsiveLine