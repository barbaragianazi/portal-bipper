(function () {
  'use strict';

  var page = document.getElementById('hubOverviewPage');
  if (!page) return;

  page.dataset.ready = 'true';

  page.querySelectorAll('.hub-action-btn, .btn, .open-link, .hub-recent__action').forEach(function (node) {
    node.addEventListener('click', function (event) {
      if (node.tagName === 'A') return;
      event.preventDefault();
    });
  });

  var chartCanvas = document.getElementById('hubDistributionChart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    // Cria o gráfico só depois de um frame de layout estável: se o canvas
    // ainda está sendo redimensionado pelo grid/fontes, o Chart.js dispara
    // um resize imediato que corta a animação de entrada antes de tocar.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        new Chart(chartCanvas, {
          type: 'line',
          data: {
            labels: ['01', '04', '07', '10', '13', '16', '19', '22', '25', '28', '30'],
            datasets: [
              {
                label: 'Visualizações',
                data: [1.8, 2.3, 2.1, 2.8, 2.6, 3.2, 3.0, 3.6, 3.4, 4.0, 4.3],
                borderColor: '#2563eb',
                backgroundColor: '#2563eb',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                tension: 0.35
              },
              {
                label: 'Downloads',
                data: [1.4, 1.7, 1.7, 2.1, 2.0, 2.3, 2.2, 2.6, 2.8, 3.2, 3.6],
                borderColor: '#00a7b5',
                backgroundColor: '#00a7b5',
                pointBackgroundColor: '#00a7b5',
                pointBorderColor: '#fff',
                tension: 0.35
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 200,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' mil';
                  }
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#64748b' } },
              y: {
                grid: { color: 'rgba(226, 232, 240, 0.8)' },
                border: { display: false },
                ticks: { color: '#64748b', callback: function (value) { return value + ' mil'; } }
              }
            }
          }
        });
      });
    });
  }

  var downloadsCanvas = document.getElementById('hubDownloadsChart');
  if (downloadsCanvas && typeof Chart !== 'undefined') {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        new Chart(downloadsCanvas, {
          type: 'bar',
          plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : [],
          data: {
            labels: ['Clientes', 'Revendas', 'Representantes', 'Equipes internas', 'Parceiros'],
            datasets: [
              {
                label: 'Downloads',
                data: [5820, 4840, 6710, 4030, 2240],
                backgroundColor: function (context) {
                  var chart = context.chart;
                  var chartArea = chart.chartArea;
                  if (!chartArea) return '#2563eb';
                  var gradient = chart.ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                  gradient.addColorStop(0, '#2563eb');
                  gradient.addColorStop(1, '#00a7b5');
                  return gradient;
                },
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 56
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 200,
            layout: { padding: { top: 24 } },
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.parsed.y.toLocaleString('pt-BR') + ' downloads';
                  }
                }
              },
              datalabels: {
                display: true,
                anchor: 'end',
                align: 'end',
                offset: 4,
                color: '#0f172a',
                font: { weight: '700', size: 12 },
                formatter: function (value) {
                  return value.toLocaleString('pt-BR');
                }
              }
            },
            scales: {
              x: { stacked: true, grid: { display: false }, ticks: { color: '#64748b' } },
              y: {
                stacked: true,
                beginAtZero: true,
                grid: { color: 'rgba(226, 232, 240, 0.8)' },
                border: { display: false },
                ticks: { color: '#64748b' }
              }
            }
          }
        });
      });
    });
  }
})();
