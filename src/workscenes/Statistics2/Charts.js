import React from 'react'
import { LineChart, XAxis, Grid, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

export class Charts extends React.PureComponent {

    render() {
        const data = [33, 10, 134, 95, 150, 34]
        const contentInset = { top: 10, bottom: 10 }
        return (
            <>
                <View style={{ height: 150, flexDirection: 'row' }}>
                    <YAxis
                        data={data}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={5}
                        formatLabel={(value) => `${value}`}
                        contentInset={{ top: 10, bottom: 10 }}
                        style={{ textAlight: 'center', display: 'flex', justifyContent: "flex-start", alignItems: 'flex-start' }}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 6 }}
                        data={data}
                        svg={{ stroke: '#2A80F1' }}
                        contentInset={contentInset}
                    >
                        <Grid />
                    </LineChart>


                </View>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    numberOfTicks={4}
                    data={data}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 36, right: 20 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </>
        )
    }
}