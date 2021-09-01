import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
// import { getStatistic } from '../../../actions/apiActions';
import { LineChart } from "react-native-chart-kit";
import { defIntensity } from '../../../constants';


export function ChartsIntensity({ data, koe }) {

    const [intensity, setIntensity] = useState([1])

    useEffect(() => {
        const arrIntensity = [];
        data.forEach(item => {
            arrIntensity.push(Math.ceil(item.learned / (koe * defIntensity) * 100))
        })
        setIntensity(arrIntensity.slice(-7))
    }, [])

    return (
        <View >
            <LineChart
                withInnerLines={false}
                data={{
                    datasets: [
                        {
                            data: intensity,
                            strokeWidth: 2 // optional
                        }
                    ],

                }}
                width={Dimensions.get("window").width * 0.85} // from react-native
                height={140}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                style={{
                    marginTop: 8,
                    borderRadius: 16
                }}
            />


        </View>

    )
}

const chartConfig = {
    
    backgroundColor: "transparent",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#2A80F1`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "3",
        strokeWidth: "2",
        stroke: "#2A80F1"
    },
};
