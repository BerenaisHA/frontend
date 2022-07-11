<template>
    <div>
        <v-row>
            <v-spacer/>
            <v-col>
                <v-switch 
                v-model="led" 
                @change="changeLed" 
                :label="`Estado: ${led ? 'Encendido':'Apagado'}`" />
            </v-col>
            <v-spacer/>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Temperatura</v-card-title>
                    <v-card-text>
                        <div class="chart" id="temperature"></div>
                    </v-card-text>
                </v-card>                
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Luz</v-card-title>
                    <v-card-text>
                        <div class="chart" id="light"></div>
                    </v-card-text>
                </v-card>                
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Temperatura</v-card-title>
                    <v-card-text>
                        <div class="chart" id="temperature_two"></div>
                    </v-card-text>
                </v-card>                
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Luz</v-card-title>
                    <v-card-text>
                        <div class="chart" id="light_two"></div>
                    </v-card-text>
                </v-card>                
            </v-col>
        </v-row> 
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"; 
import * as am4charts from "@amcharts/amcharts4/charts"; 
import am4themes_dark from "@amcharts/amcharts4/themes/dark"; 
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; // Se puede quitar
import { io } from 'socket.io-client'
//io(`http://localhost:${process.env.VUE_APP_WEBSOCKET_PORT}`);
// Si no funciona con localhost, poner la IP explicita del Backend
//`http://localhost:${process.env.VUE_APP_WEBSOCKET_PORT}`,
const socket = io(
    `http://192.168.0.193:${process.env.VUE_APP_WEBSOCKET_PORT}`, 
    {
        autoConnect: false,
    }
);

am4core.useTheme(am4themes_dark); 
am4core.useTheme(am4themes_animated);

/*
socket.on("connect", () => {
    socket.on('mensaje2', (data) => {
        console.log(data);
    });

    // Recibir Temperatura de BackEnd
    socket.on('temperature', ({temperature}) => {
        console.log(temperature);
    });

    // Recibir Luz de BackEnd
    socket.on('luz', ({light}) => {
        console.log(light);
    });
});
*/

export default {
    data(){
        return { led: 0 };
    },
    methods: {
        initTemperature(){
            const chart = am4core.create("temperature", am4charts.XYChart);
            chart.data = [{x: new Date(), y: 0}];

            const xAxis = chart.xAxes.push(new am4charts.DateAxis());
            xAxis.title.text = "Fecha / Hora";
            xAxis.dateInterval = {timeUnit: "second", count: 1};

            const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
            yAxis.title.text = "Temperatura";
            
            const series = chart.series.push(new am4charts.LineSeries());
            series.bullets.push(new am4charts.CircleBullet());
            series.dataFields.dateX = "x";
            series.dataFields.valueY = "y";
            series.tooltipText = "{dateX.dateFormat('h-m')}: {valueY}";
            
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.snapToSeries = series;
            chart.cursor.behavior = "none";

            // Recibir Temperatura de BackEnd
            socket.on('temperatura', ({temperature: y}) => {
                console.log(y);
                chart.addData({x: new Date(), y});
            });

        },
        initLight(){
            const chart = am4core.create("light", am4charts.GaugeChart);
            chart.hiddenState.properties.opacity = 0;
            chart.innerRadius = -25;

            const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
            xAxis.min = 0;
            xAxis.max = 1023;
            xAxis.strictMinMax = true;

            const gauge = chart.hands.push(new am4charts.ClockHand());
            //gauge.showValue(200);
            
            // Recibir Luz de BackEnd
            socket.on('luz', ({light}) => {
                console.log(light);
                gauge.showValue(light);
            });
        },
        changeLed(){
            socket.emit("led", this.led);
        },
    },
    beforeMount(){
        socket.connect();
        //socket.emit('message', 'HOLA VUE <-- FrontEnd');
        socket.on('connect', () => {
            socket.emit('init', this.$route.params.key);
        });
    },
    mounted(){
        this.initTemperature();
        this.initLight();
    },
};
</script>

<style scoped>
.chart {
    width: 100%;
    height: 33vh; /* chart, viene de arriba, de la etiqueta  template*/

}
</style>
