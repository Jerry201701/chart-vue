<template>
  <div class="chat-container">
    <div class="Chart">
      <h1 style="text-align:center;">Barchart</h1>
      <bar-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Horizontal Barchart</h1>
      <horizontal-bar-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Barchart with reactive mixing for live data</h1>
      <reactive-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Barchart with reactive mixing for live data as props</h1>
      <reactive-prop-example :chart-data="dataPoints"/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Linechart</h1>
      <line-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Doughnutchart</h1>
      <doughnut-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Piechart</h1>
      <pie-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Radarchart</h1>
      <radar-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Polararea</h1>
      <polar-area-example/>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Bubblechart</h1>
      <bubble-example />
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Scatter Chart</h1>
      <scatter-example />
    </div>
    <div class="Chart">
      <h1 style="text-align:center;">Custom Line Chart</h1>
      <custom-line />
    </div>
  </div>
</template>

<script>
  import BarExample from '@/chat/BarExample'
  import LineExample from '@/chat/LineExample'
  import DoughnutExample from '@/chat/DoughnutExample'
  import PieExample from '@/chat/PieExample'
  import RadarExample from '@/chat/RadarExample'
  import PolarAreaExample from '@/chat/PolarAreaExample'
  import BubbleExample from '@/chat/BubbleExample'
  import ReactiveExample from '@/chat/ReactiveExample'
  import ReactivePropExample from '@/chat/ReactivePropExample'
  import ScatterExample from '@/chat/ScatterExample'
  import HorizontalBarExample from '@/chat/HorizontalBarExample'
  import CustomLine from '@/chat/CustomExample'
  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      CustomLine,
      PieExample,
      RadarExample,
      PolarAreaExample,
      BubbleExample,
      ReactiveExample,
      ReactivePropExample,
      ScatterExample,
      HorizontalBarExample
    },
    data () {
      return {
        dataPoints: null,
        height: 20
      }
    },
    mounted () {
      setInterval(() => {
        this.fillData()
      }, 2000)
    },
    methods: {
      increaseHeight () {
        this.height += 10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
    },
    computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    }
  }
</script>

<style>
  .Chart {
    background: #212733;
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
  .chat-container{
    max-width: 800px;
    margin: 0 auto;
   
  }
</style>