import {Line} from 'vue-chartjs'
const axios = require('axios');

export default {
  extends: Line,
  mounted() {

    let config = {
      headers: {
        Authorization: window.localStorage.getItem('access_token'),
      }
    };

    axios.get('https://insta.brian.place/api/admin/tasksday', config).then((response) => {
      this.renderChart({
        labels: response.data.labels,
        datasets: [
          {
            label: 'Tarefas feitas',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#ed0f51',
            borderColor: '#ed0f51',
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ed0f51',
            pointBackgroundColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: '#ed0f51',
            pointHoverBorderColor: '#ed0f51',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: response.data.data
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    });



  },
  methods: {

  }
}
