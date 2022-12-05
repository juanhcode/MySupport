/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */

const getTicketsPorArea = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("https://mysupport-production.up.railway.app/v1/admin/get/ticketsPorEmpresa",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tickets = await response.json();
  return tickets;
}
const savedData = async () => {
  const response = await getTicketsPorArea();
  console.log(response);
  localStorage.setItem('area1',JSON.stringify(response.result[0]));
  localStorage.setItem('area2',JSON.stringify(response.result[1]));
}
savedData();

const area = JSON.parse(localStorage.getItem('area1'));
console.log(area);
const area2 = JSON.parse(localStorage.getItem('area2'));

const lineConfig = {
  type: 'line',
  data: {
    labels: ['Tickets','','','','Tickets'],
    datasets: [
      {
        label: 'Desarrolladores Java',
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        data: [1,2],
        fill: false,
      },
      {
        label: 'Recursos Humanos',
        fill: false,
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2',
        data: [1,2,3,4,5],
      },
    ],
  },
  options: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month',
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value',
        },
      },
    },
  },
}

// change this to the id of your chart element in HMTL
const lineCtx = document.getElementById('line')
window.myLine = new Chart(lineCtx, lineConfig)
